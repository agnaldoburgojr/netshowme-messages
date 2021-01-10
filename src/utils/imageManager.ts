import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

type ImageResponse = {
  uri: string,
  isError: boolean,
}

const validateFormat = (uri: string ): Boolean => {
  const fileExtension = uri.substr(-3)
  return fileExtension === 'jpg' || fileExtension === 'png'
}

const getImage = async (): Promise<ImageResponse> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const isValidateFormat = validateFormat(result.uri)
    if(!isValidateFormat) return { isError: true, uri: '' }
    return { isError: false, uri: result.uri }
  }
  return { isError: false, uri: '' }
};

const saveImage = async (uri: string): Promise<string> => {
  const imageResized = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: {width: 500, height: 500} }]
  );

  const asset = await MediaLibrary.createAssetAsync(imageResized.uri)
  return asset.uri
}

export {
  getImage, saveImage
}