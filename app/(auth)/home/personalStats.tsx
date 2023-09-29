import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';

const personalStats = () => {
  const { user } = useUser();

  // ping the back end to retrieve user's personal stats
  // wins and losses and handicaps

  return (
    <View>
      <Text>personalStats</Text>
    </View>
  );
};

export default personalStats;

const styles = StyleSheet.create({});
