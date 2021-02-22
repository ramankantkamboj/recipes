/**
 * Login Component
 * @author Raman Kant
 * @description Login Component of the Application
 * @flow
 */

import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import GlobalStyles from '../../Utility/GlobalStyles';
import CustomText from '../../ReusableComponents/CustomText';
import ImagePath from '../../Utility/ImagePath';
import CustomImage from '../../ReusableComponents/CustomImage';
import CustomButton from '../../ReusableComponents/CustomButton';
import {observer, inject} from 'mobx-react';
import {TextField} from 'react-native-material-textfield';
import CountryPicker from '../../Utility/CountryPicker';
import {observable} from 'mobx';
import {initialWindowSafeAreaInsets} from 'react-native-safe-area-context';
let {width} = Dimensions.get('window');
const TOP_IMAGE_WIDTH = width * 0.4;

const customFieldViaMobile = [
  {
    name: 'PhoneNumber',
    secureTextEntry: false,
    clearTextOnFocus: false,
    keyboardType: 'numeric',
    returnKeyType: 'next',
    label: 'Mobile Number',
    renderRightAccessory: 'renderCountryPicker',
    error: 'PhoneNumber',
    maxLength: 10,
    onChangeText: 'handlePhoneNumberChange',
    autoFocus: false,
  },
  {
    name: 'Password',
    secureTextEntry: true,
    clearTextOnFocus: true,
    keyboardType: 'ascii-capable',
    returnKeyType: 'done',
    label: 'Password',
    renderRightAccessory: 'renderPasswordAccessory',
    error: 'Password',
    maxLength: 100,
    onChangeText: 'handlePasswordChange',
    autoFocus: false,
  },
];
@inject('LoginStore', 'GlobalStore')
@observer
class Login extends Component {
  @observable Email = '';
  @observable Password = '';
  @observable PhoneNumber = '';
  @observable showCountryPicker = false;
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
    };
  }

  //handle email text input change
  handleEmailChange = (email) => {
    this.Email = email;
  };

  //handle Phone Number text input change
  handlePhoneNumberChange = (phoneNumber) => {
    this.PhoneNumber = phoneNumber;
  };

  //handle password text input change
  handlePasswordChange = (password) => {
    this.Password = password;
  };

  renderCountryPicker = () => {
    const {selectedCountry} = this.props.LoginStore;
    return (
      <CustomButton
        onPress={() => (this.showCountryPicker = true)}
        style={styles.countryPicker}>
        <CustomText style={styles.flag}>{selectedCountry.Unicode}</CustomText>
      </CustomButton>
    );
  };

  onSubmitLogin = () => {};

  async loginApi() {
    this.props.navigation.navigate('');
  }

  onAccessoryPress = () => {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  };

  gotoSignUpScreen = () => {
    this.props.navigation.navigate('');
  };

  gotoForgotPasswordScreen = () => {
    this.props.navigation.navigate('');
  };

  renderPasswordAccessory = () => {
    let {secureTextEntry} = this.state;
    let name = secureTextEntry ? ImagePath.EYE_CLOSE : ImagePath.EYE_OPEN;
    return (
      <CustomButton
        onPress={() => {
          this.onAccessoryPress();
        }}>
        <CustomImage
          resizeMode={'contain'}
          style={styles.eyeIcon}
          source={name}
        />
      </CustomButton>
    );
  };

  renderInputFieldList() {

    let customField = customFieldViaMobile;
    let {errors = {}, secureTextEntry} = this.state;
    return customField.map((item, index) => {
      return (
        <TextField
          key={index}
          secureTextEntry={item.secureTextEntry ? secureTextEntry : false}
          keyboardType={item.keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={item.clearTextOnFocus}
          autoFocus={item.autoFocus}
          onChangeText={(text) => {
            this[item.onChangeText](text);
          }}
          returnKeyType={item.returnKeyType}
          label={item.label}
          renderRightAccessory={this[item.renderRightAccessory]}
          error={errors[item.error]}
          maxLength={item.maxLength}
          labelFontSize={14}
          fontSize={18}
          textColor={GlobalStyles.colorCodes.black}
          // baseColor={GlobalStyles.colorCodes.black}
          tintColor={GlobalStyles.colorCodes.black}
        />
      );
    });
  }

  render() {
    const {LoginStore} = this.props;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="handled">
            <CustomText style={styles.title}>{'Login'}</CustomText>
            <CustomText style={styles.subtitle}>
              {'Create a Login Process'}
            </CustomText>

            <View style={styles.containerInputField}>
              {this.renderInputFieldList()}
            </View>
            <View style={styles.bottomlink}>
              <CustomButton />
              <CustomButton
                onPress={() => {
                  this.gotoForgotPasswordScreen();
                }}>
                <CustomText style={styles.forgotTitle}>
                  {'Forgot Password ?'}
                </CustomText>
              </CustomButton>
            </View>
            <View style={styles.loginBtn}>
              <CustomButton
                onPress={this.onSubmitLogin}
                style={GlobalStyles.defaultBtn}>
                <CustomText style={GlobalStyles.buttonTitle}>
                  {'Log in'}
                </CustomText>
              </CustomButton>
            </View>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText style={styles.signupTitle}>
                {'------ OR ------'}
              </CustomText>
            </View>
            <View style={styles.titleSocal}>
              <View style={{flex: 0.5}}>
                <CustomImage
                  resizeMode={'contain'}
                  style={styles.facelogo}
                  source={ImagePath.FACEBOOK}
                />
              </View>
              <View style={{flex: 0.5}}>
                <CustomImage
                  resizeMode={'contain'}
                  style={styles.facelogo}
                  source={ImagePath.GOOGLE}
                />
              </View>
            </View>
            <View style={styles.titleBar}>
              <CustomText style={styles.notyetmemberTitle}>
                {'allready login ?'}
              </CustomText>
              <CustomButton
                onPress={() => {
                  this.gotoSignUpScreen();
                }}>
                <CustomText style={styles.signupTitle}>{'Sign Up'}</CustomText>
              </CustomButton>
            </View>

            <View style={GlobalStyles.listFooter} />
          </ScrollView>
        </KeyboardAvoidingView>
        <CountryPicker
          showPicker={this.showCountryPicker}
          onSelectCountry={(item) => {
            LoginStore.updateCountry(item);
          }}
          value={LoginStore.selectedCountry}
          onPressBack={() => (this.showCountryPicker = false)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
    paddingTop: initialWindowSafeAreaInsets.top,
  },
  title: {
    marginTop: 50,
    fontSize: 22,
    color: GlobalStyles.colorCodes.black,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: GlobalStyles.colorCodes.orginalgrey,
    textAlign: 'center',
  },
  forgotTitle: {
    flex: 0.5,
    fontSize: 16,
    color: GlobalStyles.colorCodes.orginalgrey,
    textAlign: 'right',
    marginRight: 27,
  },
  buttonTitle: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  bgImage: {
    alignSelf: 'center',
    height: TOP_IMAGE_WIDTH,
    width: TOP_IMAGE_WIDTH,
  },
  containerInputField: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: Platform.select({ios: 6, android: 25}),
    flex: 1,
  },
  scroll: {
    backgroundColor: 'transparent',
  },
  loginBtn: {
    marginTop: 83,
    marginLeft: 48,
    marginRight: 48,
  },
  titleBar: {
    //marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSocal: {
    flex: 1,
    // marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notyetmemberTitle: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.blueGrey,
  },
  signupTitle: {
    flex: 0.5,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colorCodes.themeColor,
  },
  eyeIcon: {
    height: 25,
    width: 25,
  },
  backView: {
    height: 25,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryPicker: {
    height: 30,
    width: 40,
  },
  flag: {
    fontSize: 28,
    textAlign: 'right',
  },
  bottomlink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  facelogo: {
    width: 200,
    height: 80,
  },
});

export default Login;
