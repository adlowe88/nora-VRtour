import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';
import UI from './components/UI';

//Config object defining the relation between the epuirectangular images,
// the button image, and the actual buttons
const Config = [
  {
    key: 0,
    imageSrc: 'test1.JPG',
    buttonImageSrc: 'button-00.png',
  },
  {
    key: 1,
    imageSrc: 'room.jpeg',
    buttonImageSrc: 'button-01.png',
  },
  {
    key: 2,
    imageSrc: 'room2.jpeg',
    buttonImageSrc: 'button-02.png',
  },
  {
    key: 3,
    imageSrc: 'chess-world.jpg',
    buttonImageSrc: 'button-03.png',
  }
];


export default class Test_vr extends React.Component {
  constructor () {
    super();
    this.state = {
      src: "equi1.jpg"
    }
  }

  render() {
    return (
      <View>

        <Canvas
           src={this.state.src}
         />

         <UI
          buttonConfig = { Config }
          onClick = { ( key ) => {
            this.setState ({ src: Config[key].imageSrc });
          }}
         />

      </View>
    );
  }
};

AppRegistry.registerComponent('Test_vr', () => Test_vr);
