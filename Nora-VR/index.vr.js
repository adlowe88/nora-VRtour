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

    return (
      <View>

      </View>
    );
  }
};

AppRegistry.registerComponent('Nora_VR', () => Nora_VR);
