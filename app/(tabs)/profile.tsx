
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import { Button } from 'react-native';

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello {user?.email}, You are logged in!</Text>
      <Button title="Sign Out" onPress={ signOut } />
    </View>
  );
}