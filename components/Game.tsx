import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Modal from './Modal';
import GameComponent from './GameComponent';
import { styles } from '../utils/styles';

import socket from '../utils/socket';
import { Link } from 'expo-router';

const Game = () => {
  const [visible, setVisible] = useState(false);

  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch('http://192.168.1.69:4000/api/games')
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on('roomsList', (rooms: any) => {
      setRooms(rooms);
    });
  }, [socket]);

  return (
    // <SafeAreaView>
    //   <View style={styles.chattopContainer}>
    //     <View style={styles.chatheader}>
    //       <Text style={styles.chatheading}>Click to Create a New Game</Text>

    //       <Pressable onPress={() => setVisible(true)}>
    //         <Feather name="edit" size={24} color="green" />
    //       </Pressable>
    //     </View>
    //   </View>

    //   <View>
    //     {rooms.length > 0 ? (
    //       <FlatList
    //         data={rooms}
    //         renderItem={({ item }) => (
    //           <GameComponent item={item} socket={socket} />
    //         )}
    //       />
    //     ) : (
    //       <View style={styles.chatemptyContainer}>
    //         <Text style={styles.chatemptyText}>No rooms created!</Text>
    //         <Text>Click the icon above to create a Golf Game room</Text>
    //       </View>
    //     )}
    //   </View>
    //   {visible ? <Modal setVisible={setVisible} socket={socket} /> : ''}
    // </SafeAreaView>
    <SafeAreaView>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Click to Create a New Game</Text>

          <Link href="/home/newGameSetup" asChild>
            <Pressable>
              <Feather name="edit" size={24} color="green" />
            </Pressable>
          </Link>
        </View>
      </View>

      <View>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <GameComponent item={item} socket={socket} />
            )}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Golf Game room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} socket={socket} /> : ''}
    </SafeAreaView>
  );
};

export default Game;
