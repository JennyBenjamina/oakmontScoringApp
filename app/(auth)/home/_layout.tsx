import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'GOLF Scoring' }} />
    </Stack>
  );
};

export default _layout;
