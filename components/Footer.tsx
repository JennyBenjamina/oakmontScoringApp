import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text>Footer</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFF4B3',
  },
});
