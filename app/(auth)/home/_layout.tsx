import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Home Screen' }} />
      <Stack.Screen name="Messaging" options={{ headerTitle: 'Messaging' }} />
    </Stack>
  );
};

export default _layout;
