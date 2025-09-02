
import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';


export default function HomePage() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You are "logged" in!</Text>
      <Button title="Sign Out" onPress={() => router.push('/(auth)')} />
    </View>
  );
}