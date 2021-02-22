import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {getIngredientName, getAllIngredients} from '../../data/MockDataAPI';
import CustomText from '../../ReusableComponents/CustomText';
import CustomButton from '../../ReusableComponents/CustomButton';
import CustomImage from '../../ReusableComponents/CustomImage';
import ImagePath from '../../Utility/ImagePath';
import GlobalStyles from '../../Utility/GlobalStyles';
export default class IngredientsDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: this.props.route.params.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    };
  };

  constructor(props) {
    super(props);
  }

  onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    this.props.navigation.navigate('IngredientScreen', {ingredient, name});
  };

  renderIngredient = ({item}) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this.onPressIngredient(item[0])}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item[0].photo_url}} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{color: 'grey'}}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

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
          <CustomText style={styles.wishlist}>
            {this.props.route.params.title}
          </CustomText>
        </View>
        <View style={styles.emptyView} />
      </SafeAreaView>
    );
  };

  render() {
    const {navigation} = this.props;
    const item = this.props.route.params.ingredients;
    const ingredientsArray = getAllIngredients(item);

    return (
      <View>
        {this.header()}
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={ingredientsArray}
          renderItem={this.renderIngredient}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
