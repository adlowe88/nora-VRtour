import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import App from './src/App';

export default class test2 extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     data: null,
     locationId: null,
     nextLocationId: null,
     rotation: null,
   };
 }

  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
};

class Tour extends React.Component {
  Static defaultProps = {
    tourSrc: "data.json",
  }
}

AppRegistry.registerComponent('test2', () => test2);
