/**
 * Country Picker Custom Component
 * @author Raman Kant Kamboj
 * @description Country Picker Custom Component
 * @example
 * <CountryPicker
 *  showPicker={true/false}
 *  value={Default Value}
 *  onSelectCountry={item => console.log(item)}
 *  onPressBack={}
 * />
 * @flow
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CustomButton from '../ReusableComponents/CustomButton';
import GlobalStyles from './GlobalStyles';
import ImagePath from './ImagePath';
import CustomImage from '../ReusableComponents/CustomImage';
import CustomTextInput from '../ReusableComponents/CustomTextInput';
const COUNTRY_MASTER = require('../assets/Locales/countries.json');
const sortedCountry = COUNTRY_MASTER.sort((a, b) =>
  a.Name.localeCompare(b.Name),
);
function CountryPicker(props) {
  const [country, setCountry] = useState(COUNTRY_MASTER);
  const searchInput = useRef(null);

  const onPressClear = () => {
    searchInput.current.clear();
    setCountry(COUNTRY_MASTER);
  };

  const onPressCountryCard = item => {
    onPressClear();
    props.onSelectCountry(item);
    props.onPressBack();
  };

  const filterSearch = text => {
    setCountry(
      COUNTRY_MASTER.filter(item =>
        item.Name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={[styles.headerBar, styles.rowView]}>
        <CustomButton
          onPress={() => props.onPressBack()}
          style={styles.backButton}>
          <CustomImage
            resizeMode={'contain'}
            style={styles.backImg}
            source={ImagePath.BACK_ARROW}
          />
        </CustomButton>
        <CustomTextInput
          ref={searchInput}
          style={styles.searchBar}
          autoFocus={true}
          underlineColorAndroid={GlobalStyles.colorCodes.transparent}
          placeholder={'SEARCH FOR COUNTRY'}
          placeholderTextColor={GlobalStyles.colorCodes.lightGrey}
          onChangeText={text => filterSearch(text)}
        />
        <CustomButton onPress={() => onPressClear()} style={styles.backButton}>
          <CustomImage
            resizeMode={'contain'}
            style={styles.crossImg}
            source={ImagePath.MAP_CROSS}
          />
        </CustomButton>
      </View>
    );
  };

  const countryCard = (item, isHeader) => {
    return (
      <CustomButton
        onPress={() => onPressCountryCard(item)}
        style={[
          styles.addressCard,
          styles.rowView,
          isHeader ? styles.headerCard : null,
        ]}>
        <View style={styles.rowView}>
          <Text style={styles.countryName}>{item.Unicode}</Text>
          <Text style={styles.countryName}> {item.Name}</Text>
        </View>
        <Text style={styles.dialCode}>{item.Dial}</Text>
      </CustomButton>
    );
  };

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      transparent={true}
      visible={props.showPicker}>
      <SafeAreaView />
      <View style={styles.modalContainer}>
        {renderSearchBar()}
        <FlatList
          initialNumToRender={15}
          style={styles.flatList}
          keyboardShouldPersistTaps={'always'}
          data={country}
          extraData={country}
          ListHeaderComponent={() => countryCard(props.value, true)}
          renderItem={({item}) => countryCard(item, false)}
          keyExtractor={item => item.Dial + item.Name}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: GlobalStyles.colorCodes.white,
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
  },
  flatList: {
    marginTop: -5,
    paddingTop: 20,
  },
  addressCard: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colorCodes.veryLightGrey,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  headerCard: {
    borderBottomColor: GlobalStyles.colorCodes.bluish,
  },
  countryName: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.black,
    marginRight: 2,
  },
  dialCode: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.black,
  },
  headerBar: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 15,
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
    zIndex: 100,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colorCodes.white,
    alignContent: 'center',
  },
  searchBar: {
    color: GlobalStyles.colorCodes.black,
    fontSize: 18,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  footer: {
    height: 140,
  },
  backButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backImg: {
    height: 14,
    width: 18,
  },
  crossImg: {
    height: 30,
    width: 30,
  },
});
export default CountryPicker;
