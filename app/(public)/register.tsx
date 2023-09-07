import { StyleSheet, TextInput, Button, View } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSignUp } from '@clerk/clerk-expo';

const register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />

          <Button
            onPress={onSignUpPress}
            title="Sign Up"
            color={'#6c47ff'}
          ></Button>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
          </View>
          <Button
            onPress={onPressVerify}
            title="Verify Email"
            color={'#6c47ff'}
          ></Button>
        </>
      )}
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    padding: 10,
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});
