import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const Game = () => {
  return (
    <View>
      <TextInput placeholder="Score" style={styles.textInput} />
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
