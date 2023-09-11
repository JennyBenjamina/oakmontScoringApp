import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../utils/styles';

const Modal = ({ setVisible, socket }) => {
  const [groupName, setGroupName] = useState('');

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Game Name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Game Name"
        onChangeText={(value) => setGroupName(value)}
      />

      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
