import Config from 'react-native-config'
import ImgToBase64 from 'react-native-image-base64';
import { createApolloFetch } from 'apollo-fetch';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { getAuthData, storeAuthData }   from '../../shared/utils';
import { UPDATE_PIC_MUTATION } from '../../graphql/mutation'

const uri = Config.APOLLO_GRAPHQL_URI;
const apolloFetch = createApolloFetch({ uri });

export const handleChoosePhoto = async (setModalVisible, setPhoto, setErr,setImageResponse) => {
    const options = {
      noData: false
    };
    launchImageLibrary(options, async (response) => { 
      if(response.didCancel){
        setModalVisible(false);
      } else {
        convertPic(response, setModalVisible, setPhoto, setErr, setImageResponse);
      }        
    });
};

export const handleCameraCapture = async (setModalVisible, setPhoto, setErr, setImageResponse) => {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    launchCamera(options, async response => {
      if(response.didCancel){
        setModalVisible(false);
      } else {
        convertPic(response, setModalVisible, setPhoto, setErr, setImageResponse);
      }
    });
}

export const convertPic = async (response, setModalVisible, setPhoto, setErr, setImageResponse) => {
    ImgToBase64.getBase64String(response.uri)
        .then(base64String =>  !setImageResponse ? storePic(base64String, setModalVisible, setPhoto, setErr) : setImageResponse({ response, base64String }) )
        .catch(err => console.log ('convertPic err ', err) );
    }

export const storePic = async (image, setModalVisible, setPhoto, setErr) => {
    const token = await getAuthData('token');
    apolloFetch.use(({ request, options }, next) => {
        options.headers = {
          "Authorization": token
        };
        next();
      });

    try{
        image = 'data:image/jpeg;base64,' + image;
        let res =  await apolloFetch({ query : UPDATE_PIC_MUTATION, 
            variables: { 
                    image : image, 
                }
            })
            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            } else {
              setPhoto(res.data.updateProfilePicture.url);
              storeAuthData('photo',res.data.updateProfilePicture.url);
            }
            setModalVisible(false);
    } catch (err) {
        setErr('Upload image failed');
        setTimeout( () => {
          setModalVisible(false);
          setErr('');
        }, 2000);
    }
}

  
