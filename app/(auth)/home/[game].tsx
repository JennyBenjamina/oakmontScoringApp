import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import Game from '../../../components/Game';

const game = () => {
  const { game } = useLocalSearchParams();
  return (
    <View>
      {game === 'newgame' ? (
        <>
          <Stack.Screen options={{ headerTitle: `New Game` }} />
          <Game />
        </>
      ) : (
        <Stack.Screen options={{ headerTitle: `Current Game` }} />
      )}
    </View>
  );
};

export default game;

const styles = StyleSheet.create({});
