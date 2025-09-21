import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DinoGame() {
  const colorScheme = useColorScheme();

  const invertScript = `
    if ('${colorScheme}' === 'dark') {
      document.documentElement.style.filter = 'invert(1)';
    } else {
      document.documentElement.style.filter = 'none';
    }
    true;
  `;

  return (
    <View style={styles.container}>
      <WebView
        key={colorScheme}
        source={require('../assets/dino-game/index.html')}
        javaScriptEnabled={true}
        injectedJavaScript={invertScript}
        style={[styles.webview, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});