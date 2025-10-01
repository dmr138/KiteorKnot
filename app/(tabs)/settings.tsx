import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import getWeather from '@/utils/getWeather';
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
          const weatherData = await getWeather(session?.access_token ?? '');
          setResult(weatherData);
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