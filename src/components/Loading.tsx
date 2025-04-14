import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

//implementation depands on the UI
const Loading = (props: {text: string}) => {
  const {text} = props;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
      <Text>{text || 'Loading'}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
