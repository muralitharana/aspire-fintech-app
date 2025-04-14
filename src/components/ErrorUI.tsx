import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// implementation depends on the UI
const ErrorUI = ({text}: {text: string}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{text}</Text>
    </View>
  );
};

export default ErrorUI;

const styles = StyleSheet.create({});
