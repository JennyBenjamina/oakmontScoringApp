import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';

const archives = () => {
  const { user } = useUser();

  // ping the backend to retrieve the user's game history

  return (
    <View>
      <Text>{user?.id}</Text>
    </View>
  );
};

export default archives;

const styles = StyleSheet.create({});
