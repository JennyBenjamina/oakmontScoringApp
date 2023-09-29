import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
        headerTitle: 'GOLF Scoring',
      }}
    >
      {/* <Stack.Screen name="index" options={{ headerTitle: 'GOLF Scoring' }} /> */}

      <Stack.Screen name="betSetup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
