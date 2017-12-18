import React, { PureComponent as Component } from 'react';

import {
  asset,
  Image,
  View,
  VrButton,
}, from 'react-vr';


//<Image> Props to add our asset images sto each button (<VrButton> has no default style),
//<VrButton> makes use of the event listener onClick
class Button extends Component {
  render () {
    return (
      <View
        style = {{
        }}
      >
        <VrButton
          onClick = { this.onButtonClick }
        >
          <Image
            style = {{
              width: 1,
              height: 1,
            }}
            source = { asset( this.props.src ) }
          >
          </Image>
        </VrButton>
      </View>
    );
  }
}

export default Button;
