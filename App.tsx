import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
