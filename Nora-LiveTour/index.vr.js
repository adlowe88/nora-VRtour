// import React from 'react';
// import {
//   AppRegistry,
//   asset,
//   Pano,
//   Text,
//   View,
// } from 'react-vr';
//
// export default class Nora_LiveTour extends React.Component {
//   render() {
//     return (
//       <View>
//         <Pano source={asset('IMG_0440.JPG')}/>
//         <Text
//           style={{
//             backgroundColor: '#777879',
//             fontSize: 0.8,
//             fontWeight: '400',
//             layoutOrigin: [0.5, 0.5],
//             paddingLeft: 0.2,
//             paddingRight: 0.2,
//             textAlign: 'center',
//             textAlignVertical: 'center',
//             transform: [{translate: [0, 0, -3]}],
//           }}>
//           Good Morning Ezra!
//         </Text>
//       </View>
//       <Test />
//     );
//   }
// };
//
// AppRegistry.registerComponent('Nora_LiveTour', () => Nora_LiveTour);

import React from 'react';
import { AppRegistry } from 'react-vr';
import { LiveTour } from 'live-tour-lab';
import Test from './Test';

export default class MyLiveTour extends React.Component {
  render() {
    return (
      <LiveTour entries="test" tourURI="Text.json"/>
    );
  }
};

AppRegistry.registerComponent('MyLiveTour', () => MyLiveTour);
