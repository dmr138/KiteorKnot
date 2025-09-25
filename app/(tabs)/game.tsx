import DinoGame from '@/components/dino'; // Import the new component
import { Text, View } from '@/components/Themed';
import React from 'react';
import { Button, Linking, StyleSheet, useColorScheme } from 'react-native';

export default function GameScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>

      <View style={styles.gameContainer}>
        <DinoGame />
      </View>


      <View style={[
        styles.donateSection,
        { backgroundColor: colorScheme === 'dark' ? '#000000ff' : '#fff' },
      ]}>
        <Text style={styles.donateTitle}>Support the Developers using the link(s) below.</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Donate Bitcoin (BTC)"
            color="#F7931A"
            onPress={() =>
              Linking.openURL("bitcoin:bc1qd6ktk5nmna2me9h7z2tflqu6pjc6p4ywhlmk56").catch(() =>
                Linking.openURL("https://blockstream.info/address/bc1qd6ktk5nmna2me9h7z2tflqu6pjc6p4ywhlmk56")
              )
            }
          />
        </View>
        <View style={[styles.buttonWrapper, { marginBottom: 30 }]}>
          <Button
            title="Donate Ethereum (ETH)"
            color="#627EEA"
            onPress={() =>
              Linking.openURL("ethereum:0x928b8CA6645662A8998D0413e3d81E18d466911E").catch(() =>
                Linking.openURL("https://etherscan.io/address/0x928b8CA6645662A8998D0413e3d81E18d466911E")
              )
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
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
