import { Text, View } from '@/components/Themed';
import { supabase } from '@/utils/supabase';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Button, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const [result, setResult] = useState('Press button to fetch');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Call Edge Function"
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          const { data } = await supabase.functions.invoke('smooth-api');
          setResult(JSON.stringify(data, null, 2));
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
