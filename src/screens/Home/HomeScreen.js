import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';
import {recipes} from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import ImagePath from '../../Utility/ImagePath';
import {getCategoryName} from '../../data/MockDataAPI';
import CustomText from '../../ReusableComponents/CustomText';
import CustomButton from '../../ReusableComponents/CustomButton';
import CustomImage from '../../ReusableComponents/CustomImage';
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: false,
    };
  }
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerLeft: () => (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
  });

  onPressRecipe = (item) => {
    this.props.navigation.navigate('RecipeScreen', {item});
  };

  onWishlistAction = (item) => {
    this.setState({wishlist: item});
  };

  renderRecipes = ({item}) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <CustomButton
          style={styles.imagebannerContainer}
          onPress={() => {
            this.state.wishlist
              ? this.onWishlistAction(false)
              : this.onWishlistAction(true);
          }}>
          <CustomImage
            source={
              this.state.wishlist
                ? ImagePath.ADD_WISHLIST
                : ImagePath.REMOVE_WISHLIST
            }
            style={styles.wishlistbannerImage}
            resizeMode="contain"
          />
        </CustomButton>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <CustomButton style={styles.backView}></CustomButton>
        <View style={styles.headerTextView}>
          <CustomText style={styles.exercisesheaderText}>{'Home'}</CustomText>
        </View>
        <View style={styles.emptyView} />
      </View>
    );
  };
  render() {
    return (
      <View>
        {this.header()}
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </View>
    );
  }
}
