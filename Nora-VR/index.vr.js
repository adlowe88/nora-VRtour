import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

//max possible for rendering in web pages
const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 720;

// pixels = degrees/360 * density, negative to rotate in expected direction.
const degreesToPixels = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH;
// PPM = 1/(2*PI*Radius) * density. Radius of cylinder is 3 meters.
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH;

export default class Nora_VR extends React.Component {
  //for underfined props (but not null)
  static defaultProps = {
    src: 'equi1.jpg',
  };

  constructor (props) {
    super(props);
    this.state = {
      data: null,
      locationId: null,
      nextLocationId: null,
      rotation: null,
    };
  }

  //invoked immediately after component mount
  //Starting AJAX calls to load in data for your component.
  //load data from remoate endpoint, can't guarentee AJAX requests will resolve
  //before component mounts; guarentee that component is up to date before trying to setState
  componentDidMount() {
    fetch(asset(this.props.src).uri)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
      })
      .done();
  }

  //Initialize the tour with the data config file
  init(config) {
    this.setState({
      data: config,
      locationId: null,
      nextLocationId: config.firstPhotoId,
      rotation: config.firstPhotoRotation +
        ( config.photos[config.firstPhotoId].rotationOffSet || 0 ),
    });
  }

  render() {
    if(!this.state.data) {
      return null;
    }
    //Set start scene
    const locationId = this.state.locationId;
    //image info for starting scene
    const photoData = (locationId && this.state.data.photos[locationId]) || null;
    //nav buttons, tooltips
    const tooltips = (photoData && photoData.tooltips) || null;
    const rotation =
      this.state.data.firstPhotoRotation +
        ((photoData && photoData.rotationOffset) || 0);
    //need to load next scene?
    const isLoading = this.state.nextLocationId !== this.state.locationId;

    return (
      <View>
        <View style={{transform: [{rotateY: rotation}]}}>
          <Pano
            //absoulte to overcome re-positioning within the flexbox style layout
            style={{
              position: 'absolute',
              tintColor: isLoading ? 'grey' : 'white',
            }}
            onLoad={() => {
              const data = this.state.data;
              this.setState({
                //update locationId
                locationId: this.state.nextLocationId,
              });
            }}
            //set the source of the new scene
            source={asset(this.state.data.photos[this.state.nextLocationId].uri)}
          />
          //To draw the child components to the inner surface of a cylinder
          //rendering flat 2d content in a 3d space
          <CylindricalPanel
            layer={{
              width: MAX_TEXTURE_WIDTH,
              height: MAX_TEXTURE_HEIGHT,
              density: MAX_TEXTURE_WIDTH,
            }}
            style={{position: 'absolute'}}>
            <View
              style={{
                // View covering the cyldiner. Center so contents appear in middle of cylinder.
                alignItems: 'center',
                justifyContent: 'center',
                width: MAX_TEXTURE_WIDTH,
                height: MAX_TEXTURE_HEIGHT,
              }}>
              {/* Need container view, else using absolute position on buttons removes them from cylinder */}
              <View>
                {tooltips &&
                  tooltips.map((tooltip, index) => {
                    // Iterate through items related to this location, creating  nav buttons which
                    // change the current location in the tour.
                    return (
                      <NavButton
                        key={tooltip.linkedPhotoId}
                        isLoading={isLoading}
                        onInput={() => {
                          // Update nextLocationId, not locationId, so tooltips match
                          // the currently visible pano; pano will update locationId
                          // after loading the new image.
                          this.setState({
                            nextLocationId: tooltip.linkedPhotoId,
                          });
                        }}
                        pixelsPerMeter={PPM}
                        source={asset(this.state.data.nav_icon)}
                        textLabel={tooltip.text}
                        translateX={degreesToPixels(tooltip.rotationY)}
                      />
                    );
                  })}
                {locationId == null &&
                  // Show a spinner while first pano is loading.
                  <LoadingSpinner
                    style={{layoutOrigin: [0.5, 0.5]}}
                    pixelsPerMeter={PPM}
                    // Undo the rotation so spinner is centered
                    translateX={degreesToPixels(rotation) * -1}
                  />}
              </View>
            </View>
          </CylindricalPanel>
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('Nora_VR', () => Nora_VR);
