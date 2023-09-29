import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Link, Stack } from 'expo-router';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import golf from '../../assets/golf.jpg';

const home = () => {
  const { user } = useUser();

  const startNewGame = () => {};

  return (
    <View style={styles.container}>
      <Header />
      <ImageBackground
        source={golf}
        imageStyle={{ borderRadius: 20 }}
        style={styles.imageHome}
        resizeMode="cover"
      >
        <Text style={styles.welcome}>
          Welcome, {user?.emailAddresses[0].emailAddress}
        </Text>
        {/* <Button title="Start a New Game" onPress={startNewGame} />
      <Button title="Find a Current Game" /> */}
        <Link href="/home/newgame" asChild>
          <Pressable style={styles.button}>
            <View>
              <Text style={styles.nameText}>Click to Start a New Game</Text>
            </View>
          </Pressable>
        </Link>
        {/* <Link href="/home/currentgame" asChild>
          <Pressable>
            <Text>Click to Resume a Game</Text>
          </Pressable>
        </Link> */}
      </ImageBackground>
      <View style={styles.containerExtra}>
        <View style={styles.containerExtra1}>
          <Link href="/home/archives" asChild>
            <Pressable style={styles.textContainer2}>
              <View>
                <Text style={styles.nameText}>Archives</Text>
              </View>
            </Pressable>
          </Link>
        </View>

        <View style={styles.containerExtra1}>
          <Link href="/home/personalStats" asChild>
            <Pressable style={styles.textContainer2}>
              <View>
                <Text style={styles.nameText}>Personal Stats</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4B3' },

  imageHome: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 3,
    marginBottom: 10,
    marginTop: 50,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcome: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginTop: 10,
    color: '#BDB541',
  },
  containerExtra: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 100,
  },
  containerExtra1: {
    flex: 1,
    backgroundColor: '#FFF4B3',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#FFEA74',
    marginTop: 160,
  },
  textContainer2: {
    // marginLeft: 16,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
