/**
  Raman Kant
 */

import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Provider, observer} from 'mobx-react';
import AppRouter from './src/Routes/Routes';
import NetInfo from '@react-native-community/netinfo';
import stores from './src/Stores/Stores';
import {getAsync} from './src/Utility/AsyncStorageUtil';
import {ASYNC_KEYS} from './src/Utility/Constants';
import LoginStore from './src/Stores/LoginStore';
import SplashScreen from 'react-native-splash-screen';
import GlobalStyles from './src/Utility/GlobalStyles';
const {top} = initialWindowSafeAreaInsets;
let {width} = Dimensions.get('window');
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launched: null,
      isConnected: true,
    };
  }

  getFirstLaunch = async (launched) => {
    this.setState({
      launched: !launched,
    });
  };
  setStoreFomStorage = async () => {
    let launched = await getAsync(ASYNC_KEYS.LAUNCHED);
    const token = await getAsync(ASYNC_KEYS.ACCESS_TOKEN);
    LoginStore.userDetails = await getAsync(ASYNC_KEYS.USER_DETAILS, true);
    token && LoginStore.setUserToken(token);
    this.getFirstLaunch(launched);
  };
  async componentDidMount() {
    await this.setStoreFomStorage();
    this.internetCheck = NetInfo.addEventListener((state) => {
      this.setState({isConnected: state.isConnected});
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.internetCheck();
  }

  render() {
    const {launched, isConnected} = this.state;
    return (
      <Provider {...stores}>
        <StatusBar
          backgroundColor={GlobalStyles.colorCodes.white}
          barStyle={'dark-content'}
        />
        <SafeAreaProvider>
          <NavigationContainer>
            {launched !== null && <AppRouter launched={launched} />}
          </NavigationContainer>
          {!isConnected && (
            <SafeAreaView style={styles.connectionView}>
              <Text style={styles.connectionText}>
                {'Please check internet connection'}
              </Text>
            </SafeAreaView>
          )}
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  connectionView: {
    height: 40,
    width: width,
    backgroundColor: GlobalStyles.colorCodes.bluish,
    position: 'absolute',
    top: top,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 12,
    color: GlobalStyles.colorCodes.white,
  },
});

export default App;
