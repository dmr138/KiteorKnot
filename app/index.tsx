import { IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Miniver_400Regular, useFonts } from '@expo-google-fonts/miniver';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Waterfall_400Regular } from '@expo-google-fonts/waterfall';
import React from 'react';
import { Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';



const KeyboardAvoidingComponent = () => {
    const [fontsLoaded] = useFonts({
        Miniver_400Regular,
        IndieFlower_400Regular,
        Waterfall_400Regular,
        Lobster_400Regular,
        Pacifico_400Regular
      });

      if (!fontsLoaded) {
        return null;
      }
  
  
  return (
    <ImageBackground style={styles.kite} source={require('../assets/images/kiteLogin.jpg')} resizeMode="cover" >
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Kite or Knot</Text>
      </View>
      </TouchableWithoutFeedback>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.inner}>

            <TextInput placeholder="Username" style={styles.textInput} />
            <TextInput placeholder="Password" style={styles.textInput} />
            <View style={styles.btnContainer}>
              <Button title="Login" onPress={() => null} />
            </View>
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    marginBottom: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 60,
    fontFamily: "Pacifico_400Regular",
    marginBottom: 0,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
  alignItems: 'center',
  marginTop: 50,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width:250,
    marginTop: 10,
    backgroundColor: 'white',
  },
  btnContainer: {
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
    width:245,

  },
    kite: {
    flex: 1,
  }
});

export default KeyboardAvoidingComponent;