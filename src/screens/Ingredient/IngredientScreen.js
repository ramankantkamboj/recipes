import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from '../../data/MockDataAPI';
import CustomText from '../../ReusableComponents/CustomText';
import CustomButton from '../../ReusableComponents/CustomButton';

export default class IngredientScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: this.props.route.params.name,
    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = (item) => {
    this.props.navigation.navigate('RecipeScreen', {item});
  };

  renderRecipes = ({item}) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this.onPressRecipe(item)}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => this.onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{uri: item.photo_url}} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  );

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <CustomButton style={styles.backView}></CustomButton>
        <View style={styles.headerTextView}>
          <CustomText style={styles.exercisesheaderText}>{'Recipe Details'}</CustomText>
        </View>
        <View style={styles.emptyView} />
      </View>
    );
  };

  render() {

    const {navigation} = this.props;
    const ingredientId = this.props.route.params.ingredient;
    const ingredientUrl = getIngredientUrl(ingredientId);
    const ingredientName = this.props.route.params.name;
    return (
      <ScrollView style={styles.mainContainer}>
         {this.header()}
        <View
          style={{
            borderBottomWidth: 0.4,
            marginBottom: 10,
            borderBottomColor: 'grey',
          }}>
          <Image
            style={styles.photoIngredient}
            source={{uri: '' + ingredientUrl}}
          />
        </View>
        <Text style={styles.ingredientInfo}>
          Recipes with {ingredientName}:
        </Text>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={getRecipesByIngredient(ingredientId)}
            renderItem={this.renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        </View>
      </ScrollView>
    );
  }
}
