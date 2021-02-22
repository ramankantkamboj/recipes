import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles from '../../Utility/GlobalStyles';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center'
  },
  photo: {
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60
  },
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
  wishlist: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.white,
  },
});

export default styles;
