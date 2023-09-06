import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
