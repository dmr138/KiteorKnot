import { Stack } from 'expo-router';
import { Image, Platform, StyleSheet, View } from 'react-native';

export default function AuthLayout() {
  const isios = Platform.OS === 'ios';
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/kiteLogin.jpg')}
        style={styles.backgroundImage}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          // animation: isAndroid ? 'slide_from_right' : 'ios_from_right',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" options={{ animation: isios ? 'fade_from_bottom': 'slide_from_left' }}   />
        <Stack.Screen name="signup" options={{ animation: isios ? 'fade_from_bottom': 'slide_from_right' }}  />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});