import React, { PureComponent as Component } from 'react';
import {AppRegistry, asset, Image, Pano, Text, Sound, View} from 'react-vr';

import InfoButton from './InfoButton';
import NavButton from './NavButton';

import CylindricalPanel from 'CylindricalPanel';

// Web VR is only able to support a maxiumum texture resolution of 4096 px
const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 720;

// Cylinder is a 2D surface a fixed distance from the camera.
// It uses pixes instead of meters for positioning components.
// pixels = degrees/360 * density, negative to rotate in expected direction.
const degreesToPixels = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH;

// PPM = 1/(2*PI*Radius) * density where r = 3
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH;

class Nora_VR extends Component {
  static defaultProps = {
    tourSource: 'noraTour.json',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      locationId: null,
      nextLocationId: null,
      rotation: null,
    };
  }


  //Call to get data from json file AFTER the initial render ie. client side
  componentDidMount() {
    fetch(asset(this.props.tourSource).uri)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
      })
      .done();
  }

  // Initialize the tour based on data file.
  init(tourConfig) {
    this.setState({
      data: tourConfig,
      locationId: null,
      nextLocationId: tourConfig.firstPhotoId,
      rotation: tourConfig.firstPhotoRotation +
        (tourConfig.photos[tourConfig.firstPhotoId].rotationOffset || 0),
    });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    const locationId = this.state.locationId;
    const photoData = (locationId && this.state.data.photos[locationId]) || null;
    const tooltips = (photoData && photoData.tooltips) || null;
    const rotation =
      this.state.data.firstPhotoRotation + ((photoData && photoData.rotationOffset) || 0);
    const isLoading = this.state.nextLocationId !== this.state.locationId;

    return (
      <View>
        <View style={{transform: [{rotateY: rotation}]}}>
          <Pano
            // Absolute positioning as to not affect other elements
            // NB REACT VR USES FLEXBOX STYLE LAYOUT (everything needs abosolute positioning)
            style={{
              position: 'absolute',
              tintColor: isLoading ? 'grey' : 'white',
            }}

            onLoad={() => {
              const data = this.state.data;
              this.setState({
                // Now that ths new photo is loaded, update the locationId.
                locationId: this.state.nextLocationId,
              });
            }}
            source={asset(this.state.data.photos[this.state.nextLocationId].uri)}
          />

          <CylindricalPanel
            // Component to draw children to the inner surface of a cylinder
            // for rendering 2D content in a 3D environment
            layer={{
              width: MAX_TEXTURE_WIDTH,
              height: MAX_TEXTURE_HEIGHT,
              density: MAX_TEXTURE_WIDTH,
            }}
            style={{position: 'absolute'}}>
            <View
              style={{
                // View covering the cyldiner
                alignItems: 'center',
                justifyContent: 'center',
                width: MAX_TEXTURE_WIDTH,
                height: MAX_TEXTURE_HEIGHT,
              }}>
              <View>
                {tooltips &&
                  tooltips.map((tooltip, index) => {
                    //Need a container view otherwise absolute positioning displaces them from cylinder
                    // Iterate through photos/tooltips related to this location, creating nav buttons
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
              </View>
            </View>
          </CylindricalPanel>
        </View>
      </View>
    );
  }
}

// Name used to create module, via reactNativeContext.createRootView('TourSample')
AppRegistry.registerComponent('Nora_VR', () => Nora_VR);
module.exports = Nora_VR;
