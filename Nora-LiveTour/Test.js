import React, { PureComponent as Component } from 'react';

import {
  asset,
  View,
  Animated,
  AnimatedImage,
} from 'react-vr';

export default Test extends React.Component {
  static defaultProps = {
    op: 1, // opacity of hero picture
    width: 1, // width of hero picture
    height: 1, // height of hero picture
    rotateY: 0, // position
    src: null, // file name
  };

  constructor(props) {
    super();
    this.state = {
      rotAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(
      this.state.rotAnim,
      {
        toValue: 360,
        duration: 3000,
      }
    )
    .start(() => {
      // Restart at end
      this.state.rotAnim.setValue(0);
      this.startAnimation();
    });
  }

  render() {
    return (
      <Animated.Image
        style={{
          position:'absolute',
          layoutOrigin: [0.5, 0.5, 0],
          width: this.props.width,
          height: this.props.height,
          transform: [
            {rotateY: this.props.rotateY},
            {translateZ: -3},
            {rotateY: this.state.rotAnim},
            {translateX: 0.5}
          ],
          opacity: this.props.op,
        }}
        source={ asset(this.props.src) }
      />
    );
  }
}
