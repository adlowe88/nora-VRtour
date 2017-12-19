import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import App from './src/App';

export default class test2 extends React.Component {
  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
};

AppRegistry.registerComponent('test2', () => test2);
