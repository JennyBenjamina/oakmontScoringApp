import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { Text } from 'react-native';

const clerkPubKey =
  'pk_test_c21hc2hpbmctZGFzc2llLTMxLmNsZXJrLmFjY291bnRzLmRldiQ';

// console.log('process ' + process.env.CLERK_PUBLISHABLE_KEY);
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/home' as never);
    } else if (isSignedIn === false) {
      router.replace('/login');
    }
  }, [isSignedIn]);
  return <Slot />;
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey!} tokenCache={tokenCache}>
      <InitialLayout />
      {/* <Stack /> */}
    </ClerkProvider>
  );
};

export default RootLayoutNav;
