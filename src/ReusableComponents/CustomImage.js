/**
 * Custom Image Component
 * @author Raman Kant Kamboj
 * @description Custom Image Component of the Application
 * @flow
 */

import React, {Component} from 'react';
import {I18nManager} from 'react-native';
import FastImage from 'react-native-fast-image';

class CustomImage extends Component {
  render() {
    return (
      <FastImage
        {...this.props}
        prior
        resizeMode={FastImage.resizeMode[this.props.resizeMode]}
        style={[
          this.props.disableRtl
            ? {}
            : {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
          this.props.style,
        ]}>
        {this.props.children}
      </FastImage>
    );
  }
}

export default CustomImage;
