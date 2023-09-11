import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, Pressable } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../../../components/MessageComponent';
import { styles } from '../../../utils/styles';

import { useLocalSearchParams } from 'expo-router';

import { useUser } from '@clerk/clerk-expo';

import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://192.168.1.69:4000');

const Messaging = () => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [username, setUsername] = useState('');

  const local = useLocalSearchParams();

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      text: 'Hello guys, welcome!',
      time: '07:50',
      user: 'Tomer',
    },
    {
      id: '2',
      text: 'Hi Tomer, thank you! 😇',
      time: '08:50',
      user: 'David',
    },
  ]);

  useLayoutEffect(() => {
    if (local && local.messages) {
      // setChatMessages(local.messages);
      // console.log(local.messages);
    }
    // socket.emit('findRoom', local.id);
    // socket.on('foundRoom', (roomChats) =>
    //   setChatMessages([...chatMessages, roomChats])
    // );
  }, []);

  useEffect(() => {
    console.log('rendering...');
    // socket.on('foundRoom', (roomChats) =>
    //   setChatMessages([...chatMessages, roomChats])
    // );

    socket.on('roomMessage', (message) => {
      setChatMessages([...chatMessages, message]);
      console.log(chatMessages);
      console.log(chatMessages.length);
    });
  }, [socket]);

  const [msg, setMsg] = useState('');

  //👇🏻 Access the chatroom's name and id

  //👇🏻 This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    try {
      if (firstName !== null) {
        setUsername('settng username');
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  // useLayoutEffect(() => {
  //   navigation.setOptions({ title: name });
  //   // getUsername();
  // }, []);

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.emit('newMessage', {
      message: msg,
      room_id: local.id,
      user,
      timestamp: { hour, mins },
    });
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMsg(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: '#f2f0f1', fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
