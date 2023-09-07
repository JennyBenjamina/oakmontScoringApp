import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Link, Stack } from 'expo-router';

const home = () => {
  const { user } = useUser();

  const startNewGame = () => {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text>
      <Button title="Start a New Game" onPress={startNewGame} />
      <Button title="Find a Current Game" /> */}
      <Link href="/home/newgame" asChild>
        <Pressable>
          <Text>Click to Start a New Game</Text>
        </Pressable>
      </Link>
      <Link href="/home/currentgame" asChild>
        <Pressable>
          <Text>Click to Resume a Game</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
