import { Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
    return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
  {/* Dismiss keyboard when clicking outside of input fields anywhere on background including header */}
        <ImageBackground style={styles.kite} source={require('../assets/images/kiteLogin.jpg')} resizeMode="cover">
             
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Kite or Knot</Text>
                </View>
              </TouchableWithoutFeedback>
            

            <KeyboardAvoidingView  
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={styles.container}>

                
                    <View style={styles.inner}>

                        <TextInput placeholder="Username" style={styles.textInput}></TextInput> 
                      
                        <TextInput placeholder="Password" style={styles.textInput}></TextInput>
                      
                        <View style={styles.btnContainer}>
                            <Button title="Login" onPress={() => null} />
                        </View>
                    
                    </View>

                
              </KeyboardAvoidingView>
            
        </ImageBackground>
        </TouchableWithoutFeedback>
    );

}

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
        //fontFamily: "Pacifico_400Regular",
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
        ...Platform.select({
        ios: {
          // iOS specific styles
          borderWidth: 1,
            borderRadius: 10,
            height: 35,
            width: 250,
            marginTop: 10,
            backgroundColor: 'white',
        },
        android: {
          // Android specific styles
          borderWidth: 1,
            borderRadius: 10,
            width: 250,
            marginTop: 10,
            backgroundColor: 'white',
        },
      }),
    },


    btnContainer: {
        ...Platform.select({
          ios: {
            // iOS specific styles
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
              width: 240,
              backgroundColor: '#cececeff',
          },
          android: {
            // Android specific styles
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
              width: 240,
          },
        }),
    },

    kite: {
        flex: 1,
    }
})

