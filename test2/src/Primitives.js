import React from 'react';
import { View, Box, Cylinder, Sphere, StyleSheet } from 'react-vr';


class Primitives extends React.Component {
  render() {
    return (
      <View>
      <Box
        dimWidth={2}
        dimDepth={2}
        dimHeight={1}
        style={{
          transform: [{translate: [2, 0, -3]}],
        }}
      />

      <Sphere
        radius={0.5}
        widthSegments={20}
        heightSegments={12}
        style={{
          transform: [{translate: [-3, 0, -2]}],
          color: 'red'
        }}
      />

      <Cylinder
        radiusTop={0}
        radiusBottom={1}
        dimHeight={1}
        segments={6}
        style={{
          transform: [{translate: [0, 0, 0]}],
        }}
      />

      </View>
    );
  }
};

export default Primitives;
