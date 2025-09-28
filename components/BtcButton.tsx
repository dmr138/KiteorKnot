import { View } from '@/components/Themed';
import React from 'react';
import { Button, Linking, StyleSheet } from 'react-native';
//https://reactnative.dev/docs/linking#get-the-deep-link

export default function BtcButton() {

    return (
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
    </View>)
}
const styles = StyleSheet.create({
    buttonWrapper: {
        width: 270,
        alignSelf: 'center',
        marginTop: 15,
    },
});




