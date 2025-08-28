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

                        <View style={styles.loginbtnContainer} >
                            <Button 
                                title="Login" 
                                onPress={() => null}   
                                //color="#027600ff"
                            />
                        </View>

                        <View >
                            <Text style={styles.partition}> or </Text>
                        </View>
                        

                        <View style={styles.signupbtnContainer} >
                            <Button 
                                title="Create Account" 
                                onPress={() => null}   
                                color="#027600ff"
                            />
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


    loginbtnContainer: {
        ...Platform.select({
            ios: {
                // iOS specific styles
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 10,
                width: 240,
                backgroundColor: '#e0e0e0ff',
                
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


    signupbtnContainer: {
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        width: 220,

        ...Platform.select({
            ios: {
                // iOS specific styles
                
                backgroundColor: '#e0e0e0ff',
                
            },
            android: {
                // Android specific styles
            
            },
            
        }),
    },

    kite: {
        flex: 1,
    },

    partition: {
        // marginTop: 5,
        // marginBottom: 5,
        fontSize: 30,
        color: '#444444ff',
    },
})

