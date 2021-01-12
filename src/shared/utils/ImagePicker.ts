import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../../shared/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';

const uri = 'https://dev-api.lvld.app/graphql';
const apolloFetch = createApolloFetch({ uri });

const UPDATE_PIC_MUTATION = `
    mutation updateProfilePicture($image: String!){
        updateProfilePicture(
                input: {
                image: $image
            }
        ) {
            message
            url
        }
    }
`

export const handleChoosePhoto =  (setModalVisible, setImageResponse) => {
    const options = {
      noData: false
    };
    launchImageLibrary(options,  (response) => { 
      if(response.didCancel){
        setModalVisible(false);
      } else {
        convertPic(response, setImageResponse);
        setModalVisible(false);
      }        
    });
};

export const handleCameraCapture =  (setModalVisible, setImageResponse) => {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    launchCamera(options, response => {
      if(response.didCancel){
        setModalVisible(false);
      } else {
        convertPic(response, setImageResponse);
        setModalVisible(false);
      }
    });
}

export const convertPic = (response, setImageResponse) => {
    ImgToBase64.getBase64String(response.uri)
        .then(base64String =>  !setImageResponse ? storePic(base64String) : setImageResponse({ response, base64String }) )
        .catch(err => console.log ('convertPic err ', err) );
    }

export const storePic = async (image) => {
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
            console.log('storePic res ',res.data.updateProfilePicture.url);
    } catch (e) {
        console.log('storePic err ', e);
    }
}

  
