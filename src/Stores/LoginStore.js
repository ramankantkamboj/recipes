/**
 * Login Mobx Store Component
 * @author Raman Kant
 * @description Login store of the applicaion
 * @flow
 */

import {observable, action, computed, autorun} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
const COUNTRY_MASTER = require('../assets//Locales/countries.json');
class LoginStore {
  @observable userToken = '';
  @observable userDetails = null;
  @observable showLoader = false;
  @observable name = 'NAME SURNAME';
  @observable firstName = 'NAME';
  @observable lastName = 'नाम';
  @observable profileImg = '';
  @observable userName = '';
  @observable mobileNumber = '';
  @observable isCountryUpdate = false;
  @observable country = {
    Name: 'India',
    Unicode: '🇮🇳',
    Dial: '+91',
  };
  @observable customer_id = '';

  @action setFirstName(text) {
    if (text) {
      this.firstName = text;
      setAsync(ASYNC_KEYS.GUEST_USER_FIRSTNAME, this.firstName);
    } else {
      this.firstName = '';
    }
  }

  @action setLastName(text) {
    if (text) {
      this.lastName = text;
      setAsync(ASYNC_KEYS.GUEST_USER_LASTNAME, this.lastName);
    } else {
      this.lastName = '';
    }
  }

  reaction = autorun(() => {
    var name = '';
    if (this.firstName) {
      name = this.firstName;
    } else if (this.firstName) {
      name = this.firstName;
    }
    this.name = name;
  });

  @computed get selectedCountry() {
    return this.country;
  }

  @action updateCountry(value) {
    this.isCountryUpdate = true;
    this.country = value;
  }

  @action setInitialCounty(countryCode) {
    const initialCountry = COUNTRY_MASTER.find(
      (item) => item.Dial === countryCode,
    );
    var country = {
      Name: initialCountry.Name,
      Unicode: initialCountry.Unicode,
      Dial: initialCountry.Dial,
    };
    this.country = country;
    console.warn(this.country);
  }

  @action resetStore = () => {
    this.userToken = '';
  };

  @action setUserToken(token) {
    this.userToken = token;
  }
 
  @action setDevicesToken(deviceToken) {
    this.deviceToken = deviceToken;
  }

  async authFunction(customertoken, number) {
    await setAsync(ASYNC_KEYS.ACCESS_TOKEN, customertoken);
    await setAsync(ASYNC_KEYS.RANDOM_NUMBER, number);
    await this.getUserDetails(customertoken);
    this.userToken = customertoken;
  }

  async updateUserData(data) {
    this.userDetails = data;
    this.firstName = data.firstName;
    this.lastName = data.firstName_hindi;
    this.mobileNumber = data.mobileNo;
    this.userName = `${this.firstName}`;
    this.customer_id = data.memberId;
    this.profileImg = data.profileImage;
    setAsync(ASYNC_KEYS.USER_DETAILS, data);
  }
}

export default new LoginStore();
