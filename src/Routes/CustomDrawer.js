import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import GlobalStyles from '../Utility/GlobalStyles';
import ImagePath from '../Utility/ImagePath';
import CustomImage from '../ReusableComponents/CustomImage';
import CustomButton from '../ReusableComponents/CustomButton';
import CustomText from '../ReusableComponents/CustomText';
import {SCREENS} from '../Utility/Constants';
import {inject, observer} from 'mobx-react';
@inject('LoginStore')
@observer
class CustomDrawer extends Component {
  nav = this.props.navigation;
  drawerData = [
    {
      title: 'Home',
      public: false,
      icon: ImagePath.HOME,
      onPress: () => this.nav.navigate(SCREENS.HOME),
    },
    {
      title: 'Home',
      public: false,
      icon: ImagePath.HOME,
      onPress: () => this.nav.navigate(SCREENS.MYPLAN),
    },
   
    {
      title: 'Home',
      public: false,
      icon: ImagePath.NOTIFICATION,
      onPress: () => this.nav.navigate(SCREENS.NOTIFICATION),
    },
    {
      title: 'Home',
      public: false,
      icon: ImagePath.REFER_ICON,
      onPress: () => this.nav.navigate(SCREENS.HOME),
    }
    
  ];
  userDetails = () => {
    const {userDetails, firstName, lastName} = this.props.LoginStore;
    let name = `${firstName} ${lastName}`;
    let picture = ImagePath.USER;
    let userEmail = '';
    if (userDetails) {
      picture = userDetails.profile_picture && {
        uri: userDetails.profile_picture,
      };
      userEmail = userDetails.email && userDetails.email;
    }
    return (
      <CustomButton
        onPress={() => this.nav.navigate(SCREENS.PROFILE)}
        style={styles.userDetailsView}>
        <CustomImage
          resizeMode={'cover'}
          style={styles.userImg}
          source={picture}
        />
        <View style={styles.textView}>
          <CustomText style={styles.name}>{name}</CustomText>
          <CustomText style={styles.email}>{userEmail}</CustomText>
        </View>
      </CustomButton>
    );
  };
  drawerDataView = (item, index) => {
    //const {userToken} = this.props.LoginStore;
    const userToken = true;
    return (
      <CustomButton
        key={item + index}
        onPress={() => {
          if (item.public) {
            item.onPress();
          } else {
            userToken ? item.onPress() : this.nav.navigate(SCREENS.PROFILE);
          }
        }}
        style={styles.drawerDataView}>
        <CustomImage
          resizeMode={'contain'}
          style={styles.icon}
          source={item.icon}
        />
        <CustomText style={styles.title}>{item.title}</CustomText>
        <View style={styles.rightArrowView}>
          <CustomImage
            resizeMode={'contain'}
            style={styles.rightArrow}
            source={ImagePath.RIGHT_ARROW}
            tintColor={GlobalStyles.colorCodes.darkGrey}
          />
        </View>
      </CustomButton>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.userDetails()}
        {this.drawerData.map((item, index) => {
          return this.drawerDataView(item, index);
        })}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 23,
  },
  drawerDataView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 26,
  },
  textView: {
    marginLeft: 12,
    flex: 1,
  },
  userImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: GlobalStyles.colorCodes.veryLightGrey,
  },
  name: {
    fontSize: 18,
    color: GlobalStyles.colorCodes.black,
  },
  email: {
    fontSize: 12,
    color: GlobalStyles.colorCodes.charcoalGrey,
    marginTop: 3,
  },
  rightArrow: {
    height: 15,
    width: 8,
  },
  icon: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.slate,
    marginLeft: 25,
  },
  rightArrowView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default CustomDrawer;
