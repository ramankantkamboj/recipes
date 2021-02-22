/**
 * Custom Text Input
 * @author Raman Kant
 * @description Custom Custom TextInput Functional Component;
 * @flow
 */

import React from 'react';
import {TextInput} from 'react-native';
import GlobalStyles from '../Utility/GlobalStyles';

function CustomTextInput(props, ref) {
  const textStyle = 'left';
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={props.maxLength ? props.maxLength : 40}
      style={[{textAlign: textStyle}, props.style]}
      placeholderTextColor={GlobalStyles.colorCodes.white}
      ref={ref}
    />
  );
}
export default React.forwardRef(CustomTextInput);
