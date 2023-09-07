import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import {
  Button,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      Alert.alert('Error', error || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <TextInput
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputField}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={onSignInPress} color={'#6c47ff'}></Button>
      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot Password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});
