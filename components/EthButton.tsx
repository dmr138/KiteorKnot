import { View } from '@/components/Themed';
import React from 'react';
import { Button, Linking, StyleSheet } from 'react-native';
//https://reactnative.dev/docs/linking#get-the-deep-link

export default function EthButton() {

    return (
        <View style={styles.buttonWrapper}>
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
    )
}
const styles = StyleSheet.create({
    buttonWrapper: {
        width: 270,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 30
    },
});







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