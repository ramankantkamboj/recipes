/**
 * Global Styles File
 * @author Raman Kant Kamboj
 * @description Global Styles of the applicaion.
 * @flow
 */

import {initialWindowSafeAreaInsets} from 'react-native-safe-area-context';
const {bottom, top} = initialWindowSafeAreaInsets;
var GlobalStyles = {
  colorCodes: {
    white: '#fff',
    whiteFour: '#fafafa',
    whiteTwo: '#ffffff',
    whiteThree1: '#fbfbfb',
    whiteSix: '#e2e2e2',
    black: '#000',
    transparent: 'transparent',
    lightYellow: '#fef600',
    clearBlack: 'rgba(0, 0, 0, 0.7)',
    clearLightBlack: 'rgba(0, 0, 0, 0.3)',
    clearLightBlack2: 'rgba(0, 0, 0, 0.2)',
    clearLightBlack1: 'rgba(0, 0, 0, 0.1)',
    clearLightBlack4: 'rgba(0, 0, 0, 0.4)',
    black2: '#020202',
    dullBlack: '#353535',
    red: '#f00',
    dullRed: '#e60601',
    coral: '#ff4545',
    veryLightPink: '#ededed',
    clearBlue: '#219eff',
    bluish: '#2c7dbc',
    lightBlue: '#3d92a0',
    iceBlue2: '#f1f4ff',
    iceBlue: '#f5fbff',
    charcoalGrey: '#384652',
    blueGrey: '#87939d',
    paleGrey: '#f0f4fa',
    paleGrey2: '#f5f6fa',
    pinkishGreyFour: '#bcbcbc',
    grey: '#f5f5f5',
    lightGrey: '#7d8aa0',
    darkGrey: '#515c6f',
    veryLightGrey: '#efefef',
    slate: '#515c6f',
    dark: '#29303c',
  },
  defaultBtn: {
    height: 50,
    backgroundColor: '#fe0000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    flexDirection: 'row',
  },
  buttonTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  listFooter: {
    height: 20,
  },
};

export default GlobalStyles;
