import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import GlobalStyles from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
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
  imagebannerContainer: {
    position: 'absolute',
    top: 9,
    right: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  wishlistbannerImage: {
    width: 18,
    height: 18,
  },
});

export default styles;
