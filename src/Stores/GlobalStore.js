/**
 * Global Mobx Store Component
 * @author Raman Kant Kamboj
 * @description Global store of the applicaion
 * @flow
 */

import {observable, action} from 'mobx';

class GlobalStore {
  locationFunction = null;
  @observable title = 'Mobx Store Connecting...';
  @observable location = {
    address: 'Address',
    locality: 'Searching...',
    lat: 0.0,
    lng: 0.0,
  };
  @observable userName = '';
  @observable loginData = {};


  @action setLocation(location) {
    //FOR STORING LOCATION IN STORE
    this.location = location;
  }

  setLocationFunction(locationFunction) {
    this.locationFunction = locationFunction;
  }

 
}

export default new GlobalStore();
