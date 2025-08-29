import { useRouter } from 'expo-router';
import { Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";


export default function SignUp() {
    const router = useRouter();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                style={styles.kite}
                source={require('../assets/images/kiteLogin.jpg')}
                resizeMode="cover"
            >


                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>


                    <View style={styles.inner}>


                        <View>
                            <Text style={styles.header}>Sign-Up</Text>
                        </View>

                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}></TextInput>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}></TextInput>

                        <TextInput
                            placeholder="Username"
                            style={styles.textInput}></TextInput>

                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}></TextInput>
                        <TextInput
                            placeholder="Confirm Password"
                            style={styles.textInput}></TextInput>

                        <View style={styles.signupbtnContainer} >
                            <Button
                                title="Submit"
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


    textInput: {
            borderWidth: 1,
            borderRadius: 10,
            width: 250,
            marginTop: 10,
            backgroundColor: 'white',
        ...Platform.select({
            ios: {
                // iOS specific styles
                height: 35,
            },
        }),
    },


    loginbtnContainer: {
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        width: 240,
        ...Platform.select({
            ios: {
                // iOS specific styles
                backgroundColor: '#e0e0e0ff',
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

