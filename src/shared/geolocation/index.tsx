import RNLocation from 'react-native-location';

const getStates = async (data) => {
  try {
    let response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.latitude}&longitude=${data.longitude}&localityLanguage=en`);
    let json = await response.json();
    let principalSubdivisionCode = json.principalSubdivisionCode;
    return principalSubdivisionCode;
  } catch (error) {
    console.error(error);
  }
};

export  const geolocation = async () => {
    try {
        let coor = new Object;
        var obj = new Object;
        await RNLocation.configure({
            allowsBackgroundLocationUpdates: true,
            distanceFilter: 5.0
        })

        await RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse", // or 'fine'
            rationale: {
              title: "LVLD need to access your location",
              message: "LVLD use your location to know where you are",
              buttonPositive: "OK",
              buttonNegative: "Cancel"
            }
          }
        })
        .then( async granted => {
            if (granted) {
              await RNLocation.subscribeToLocationUpdates(async locations => {
                  coor.latitude = locations[0].latitude;
                  coor.longitude = locations[0].longitude;
                  let temp =  await getStates(coor);
                   obj.state = temp;
                })
            } 
          })
            return obj;
} catch(err) {
    console.log("geolocation error " , err);
  }
}
