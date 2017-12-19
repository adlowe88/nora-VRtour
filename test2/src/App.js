import React from 'react';
import { asset, Pano, Text, View, AmbientLight, VrButton } from 'react-vr';
import Penholder from './Penholder';
import Primitives from './Primitives';


export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      background: 'background.jpeg',
      visible: true,
    };
  }

  changeScene() {
    console.log('clicked');
    this.setState = ({
      background: 'outside.jpeg',
      visible: false
    });
  }

  renderItems() {
    if ( this.state.visible === true ) {
      return <Penholder />
    }
  }

  render() {
    return (
      <View>
        <AmbientLight intensity={ 2.5 }/>
        <Pano source={asset(this.state.background)}/>
        <VrButton onClick={this.changeScene.bind(this)}>
          <Text
            style={{
              backgroundColor: '#777879',
              fontSize: 0.8,
              fontWeight: '400',
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 2, -8]}],
            }}>
            My Office
          </Text>
        </VrButton>
        { this.renderItems() }
        <Primitives />
      </View>
    );
  }
};
