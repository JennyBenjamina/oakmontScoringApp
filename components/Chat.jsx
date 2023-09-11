import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Modal from './Modal';
import ChatComponent from './ChatComponent';
import { styles } from '../utils/styles';

// import socket from '../utils/socket';

const Chat = ({ socket }) => {
  const [visible, setVisible] = useState(false);

  const [rooms, setRooms] = useState([]);

  //👇🏻 Runs when the component mounts
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch('http://localhost:4000') // change this!!!!!!!!
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    // fetchGroups();
  }, []);

  // 👇🏻 Runs whenever there is new trigger from the backend
  // useEffect(() => {
  //   socket.on('roomsList', (rooms) => {
  //     console.log('rooms ' + rooms);
  //     setRooms(rooms);
  //   });
  // }, [socket]);

  // check how to render this
  useEffect(() => {
    // this runs only after clicking create a new game
    socket.on('roomsList', (room) => {
      setRooms(room);
    });

    if (rooms !== null) {
      // console.log(rooms.length);
      // console.log(rooms);
    }
  }, [rooms]);

  return (
    <SafeAreaView>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Click to Create a New Game</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => setVisible(true)}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <ChatComponent item={item} socket={socket} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} socket={socket} /> : ''}
    </SafeAreaView>
  );
};

export default Chat;
