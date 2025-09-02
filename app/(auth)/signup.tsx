import { useRouter } from 'expo-router';
import { Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";


export default function SignUp() {
    const router = useRouter();
    return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.outerContainer}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>


                    <View style={styles.inner}>


                        <View>
                            <Text style={styles.header}>Sign-Up</Text>
                        </View>

                        <TextInput
                            
                            placeholder="Email@address.com"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <TextInput
                            
                            placeholder="Password"
                            style={styles.textInput}
                            secureTextEntry={true}
                            autoCapitalize='none'
                        />
                        <TextInput
                            
                            placeholder="Confirm Password"
                            style={styles.textInput}
                            secureTextEntry={true}
                            autoCapitalize='none'

                        />

                        <View style={styles.signupbtnContainer} >
                            <Button
                                title={"Submit"}
                                color="#027600ff"
                            />
                        </View>

                        <View style={styles.linkContainer}>
                            <Text>Already have an account? </Text>
                            <Pressable onPress={() => router.push('/')}>
                                <Text style={styles.link}>Log In</Text>
                            </Pressable>
                        </View>

                    </View>


                </KeyboardAvoidingView>

            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#007AFF', // A standard blue link color
        fontWeight: 'bold',
        fontSize: 16,
    },

    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    
    partition: {
        // marginTop: 5,
        // marginBottom: 5,
        fontSize: 30,
        color: '#444444ff',
    },
})