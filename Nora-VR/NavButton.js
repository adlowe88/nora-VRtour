import React, { PureComponent as Component } from 'react';
import { Animated, Image, Text, View, VrButton } from 'react-vr';

const Easing = require('Easing');

class NavButton extends Component {
  static defaultProps = {
    delay: 2000,
    height: 0.3,
    innerWidth: 0.3,
    isLoading: false,
    outerWidth: 0.5,
    onInput: null,
    pixelsPerMeter: 1,
    rotateY: 0,
    scaleFactor: 1.3,
    textLabel: 'Next Room',
    translateX: 0,
    translateZ: 0,
  };

  constructor (props) {
    super();
    const PPM = props.pixelsPerMeter;
  }

}
module.exports = NavButton;
