import {useNavigation} from '@react-navigation/native';

const useBackHandler = () => {
  const navigation = useNavigation();

  function getBackToThePreviousScreen() {
    navigation.goBack();
  }

  return {getBackToThePreviousScreen};
};

export default useBackHandler;
