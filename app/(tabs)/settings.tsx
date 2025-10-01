import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Button, ScrollView } from 'react-native';
//this page isfor testing/edbugging edge functions currently

export default function SettingsScreen() {
  const [result, setResult] = useState('Press button to fetch');
  const { session } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Call Edge Function"
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          
          const response = await fetch('https://weatherapi.turbophil.xyz/', {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          });

          if (response.status === 401) {
            setResult(`Unauthorized`);
          } else {
            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
          }
        }}
      />

      <ScrollView
        style={{ marginTop: 20, paddingHorizontal: 10, width: '100%' }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text selectable>{result}</Text>
      </ScrollView>
    </View>
  );
}
