/**
 * Custom Image Component
 * @author Raman Kant Kamboj
 * @description Custom Image Component of the Application
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

class CustomImage extends Component {
  render() {
    return (
      <CachedImage activityIndicator={<ActivityIndicator />} {...this.props}>
        {this.props.children}
      </CachedImage>
    );
  }
}

export default CustomImage;
