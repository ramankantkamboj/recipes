import React from 'react';
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomText from '../../ReusableComponents/CustomText';
import CustomButton from '../../ReusableComponents/CustomButton';
import CustomImage from '../../ReusableComponents/CustomImage';
import ImagePath from '../../Utility/ImagePath';
import GlobalStyles from '../../Utility/GlobalStyles';
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const {width: viewportWidth} = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      wishlist: false,
    };
  }
  onWishlistAction = (item) => {
    this.setState({wishlist: item});
  };

  renderImage = ({item}) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item}} />
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
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('IngredientScreen', {ingredient, name});
  };

  header = () => {
    return (
      <SafeAreaView style={[styles.header, styles.shadow]}>
        <CustomButton
          style={styles.backView}
          onPress={() => this.props.navigation.goBack()}>
          <CustomImage
            resizeMode={'contain'}
            style={styles.back}
            source={ImagePath.BACK_ARROW}
            tintColor={GlobalStyles.colorCodes.white}
          />
        </CustomButton>
        <View style={styles.headerTextView}>
          <CustomText style={styles.wishlist}>{'Recipe Details'}</CustomText>
        </View>
        <View style={styles.emptyView} />
      </SafeAreaView>
    );
  };

  render() {
    const {activeSlide} = this.state;
    const {navigation} = this.props;
    const {item} = this.props.route.params;
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        {this.header()}
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={(c) => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({activeSlide: index})}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('RecipesList', {category, title})
              }>
              <Text style={styles.category}>
                {getCategoryName(item.categoryId).toUpperCase()}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require('../../../assets/icons/time.png')}
            />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('IngredientsDetailsScreen', {
                  ingredients,
                  title,
                });
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
