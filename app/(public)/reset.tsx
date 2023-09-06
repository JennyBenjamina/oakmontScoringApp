import { StyleSheet, TextInput, Button, View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const [loading, setLoading] = useState(false);

  const onRequestReset = async () => {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password Reset Successful');

      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            placeholder="Email to Reset"
            onChangeText={setEmail}
            value={email}
          />
          <Button
            onPress={onRequestReset}
            title="Request Reset"
            color={'#6c47ff'}
          />
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Code..."
              style={styles.inputField}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="New Password..."
              style={styles.inputField}
              secureTextEntry={true}
            />
          </View>
          <Button
            onPress={onReset}
            title="Set New Password"
            color={'#6c47ff'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderwidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Reset;
