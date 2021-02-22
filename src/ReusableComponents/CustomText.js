/**
 * Custom Buttons Wrapper
 * @author Raman Kant Kamboj
 * @description Custom Buttons Wrapper over Touchable Opacity;
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

@observer
class CustomText extends Component {
  render() {
    return (
      <Text {...this.props} style={[styles.leftAlign, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export default CustomText;

const styles = StyleSheet.create({
  leftAlign: {
    textAlign: 'left',
  },
});
