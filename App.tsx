import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
