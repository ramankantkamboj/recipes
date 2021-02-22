import React, {useState, useEffect} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GlobalStyles from '../Utility/GlobalStyles';
import CustomImage from '../ReusableComponents/CustomImage';
// STORE IMPORTED
import ImagePath from '../Utility/ImagePath';
import GlobalStore from '../Stores/GlobalStore';
// COMPONENTS IMPORTED
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import LoginScreen from '../screens/Login/Login';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const hideTab = ['LoginScreen'];

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
  if (hideTab.includes(routeName)) {
    return false;
  }
  return true;
};

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'LoginScreen'}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'LoginScreen'}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'CategoriesScreen'}
        component={CategoriesScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'RecipeScreen'}
        component={RecipeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'RecipesListScreen'}
        component={RecipesListScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'IngredientScreen'}
        component={IngredientScreen}
      />

      <Stack.Screen
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
        name={'SearchScreen'}
        component={SearchScreen}
      />
      <Stack.Screen
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
        name={'IngredientsDetailsScreen'}
        component={IngredientsDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const DrawerScreen = () => {
  const [initRender, setInitRender] = useState(true);
  useEffect(() => {
    setInitRender(false);
  }, [initRender]);
  const drawerWidth = initRender ? null : 0.77 * width;
  return (
    <Drawer.Navigator
      drawerStyle={[styles.drawer, {width: drawerWidth}]}
      drawerContent={({navigation}) => (
        <CustomDrawer navigation={navigation} />
      )}>
      <Drawer.Screen
        options={{swipeEnabled: false}}
        name={'TabScreen'}
        component={TabScreen}
      />
    </Drawer.Navigator>
  );
};
const TabScreen = () => {
  const insets = useSafeArea();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const Color = focused
            ? GlobalStyles.colorCodes.red
            : GlobalStyles.colorCodes.black;
          let iconName;
          let name;
          if (route.name === 'HomeScreen') {
            iconName = ImagePath.GREY_HOME;
            name = 'Home';
          } else if (route.name === 'CategoriesScreen') {
            iconName = ImagePath.NOTIFICATION;
            name = 'Notifcation';
          } else if (route.name === 'Profile') {
            iconName = ImagePath.PROFILE;
            name = 'Profile';
          }
          const setWidth = route.name === 'Home' ? 40 : 20;
          const setHeight = route.name === 'Home' ? 25 : 20;
          return (
            <View
              style={[
                styles.tabBarStyle,
                focused ? styles.tabBarFocused : null,
              ]}>
              <CustomImage
                resizeMode={'contain'}
                style={{width: setWidth, height: setHeight}}
                source={iconName}
                tintColor={Color}
              />
              <Text
                numberOfLines={1}
                style={[styles.routeName, {color: Color}]}>
                {name}
              </Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: GlobalStyles.colorCodes.white,
          height: 70 + insets.bottom,
        },
      }}>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={'CategoriesScreen'}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />

      <Tab.Screen
        name={'Profile'}
        component={ProfileStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = (props) => {
  const [location, setLocation] = useState();
  GlobalStore.setLocationFunction(setLocation);
  if (props.launched) {
    return location ? <DrawerScreen /> : <DrawerScreen />;
  } else {
    return <DrawerScreen />;
  }
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBarImg: {
    width: 20,
    height: 20,
  },
  routeName: {
    fontSize: 12,
    marginTop: 5,
  },
  imageBack: {
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
  },
  lottieImg: {
    height: 65,
    width: 65,
  },
  tabBarStyle: {
    alignItems: 'center',
  },
  tabBarFocused: {
    //backgroundColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  drawer: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
