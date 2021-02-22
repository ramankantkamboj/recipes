/**
 * Custom Buttons Wrapper
 * @author Raman Kant Kamboj
 * @description Custom Buttons Wrapper over Touchable Opacity;
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity accessible activeOpacity={0.6} {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
export default CustomButton;
