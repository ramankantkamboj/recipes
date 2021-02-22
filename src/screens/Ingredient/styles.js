import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import GlobalStyles from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
  titleIngredient: {
    fontWeight: 'bold',
    fontSize: 20
  },
  photoIngredient: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  ingredientInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  emptyView: {
    width: 58,
  },
  backView: {
    flex: 0.1,
    paddingVertical: 14,
    paddingLeft: 16,
  },
  headerTextView: {
    flex: 0.9,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    backgroundColor: GlobalStyles.colorCodes.red,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colorCodes.veryLightGrey,
  },

  back: {
    width: 25,
    height: 15,
  },
  exercisesheaderText: {
    fontSize: 20,
    color: GlobalStyles.colorCodes.white,
  },
  shadow: {
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 1000,
  },
});

export default styles;
