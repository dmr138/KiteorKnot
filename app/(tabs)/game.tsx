import DinoGame from '@/components/dino'; // Import the new component
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <DinoGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});