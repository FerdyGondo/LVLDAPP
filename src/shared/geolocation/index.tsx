import Geolocation from '@react-native-community/geolocation';
import { storeAuthData }   from '../utils';

export const getGeoPermission = async () => {
  Geolocation.requestAuthorization();
} 

const getStates = async (data) => {
  try {
    let response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.latitude}&longitude=${data.longitude}&localityLanguage=en`);
    let json = await response.json();
    let principalSubdivisionCode = json.principalSubdivisionCode;
    return principalSubdivisionCode;
  } catch (error) {
    console.error('getStates error ', error);
  }
};

export const geolocation = async (setStateregion) => {
  try{
      var obj = new Object;
      Geolocation.getCurrentPosition( async position => {
          let temp =  await getStates(position.coords);
          storeAuthData('states',await getStates(position.coords));
          setStateregion(temp);
          obj.state = temp;
        },
        error => console.log('Geolocation error ', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
  } catch (e) {
      console.log('Geolocation err ', e);
  }
  return obj;
}
