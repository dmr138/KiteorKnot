import BtcButton from '@/components/BtcButton';
import Dino from '@/components/dino';
import EthButton from '@/components/EthButton';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export default function DonationScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.dinoContainer}>
        <Dino />
      </View>
      <View style={[styles.donateSection, {backgroundColor: colorScheme === 'dark' ? '#000000ff' : '#fff' ,}]}>
        <Text style={styles.donateTitle}>
          Support the Developers using the link(s) below.
        </Text>
        <BtcButton />
        <EthButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dinoContainer: {
    flex: 6,
  },
  donateSection: {
    flex: 1,
    padding: 20,
    paddingBottom: 25,
    justifyContent: 'center',
  },
  donateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: 270,          
    alignSelf: 'center',
    marginTop: 15,
  },
});
