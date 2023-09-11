import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Score = () => {
  return (
    <View>
      <Text>Chat Screen</Text>
      <View>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View>
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default Score;
