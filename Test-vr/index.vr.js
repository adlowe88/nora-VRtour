import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';

export default class Test_vr extends React.Component {
  constructor () {
    super();
    this.state = {
      src: "test1.jpg"
    }
  }

  render() {
    return (
      <View>
        <Canvas
           src={this.state.src}
         />
      </View>
    );
  }
};

AppRegistry.registerComponent('Test_vr', () => Test_vr);
