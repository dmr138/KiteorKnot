import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        setLoading(false);

        if (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.outerContainer}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Kite or Knot</Text>
                </View>


                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>

                    <View style={styles.inner}>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText={setPassword}
                            value={password}
                        />

                        <View style={styles.loginbtnContainer} >
                            <Button
                                title={loading ? "Loading..." : "Login"}
                                onPress={(handleLogin)}
                                disabled={loading}

                            />
                        </View>

                        <Text style={styles.partition}> or </Text>

                        <View style={styles.signupbtnContainer} >
                            <Button
                                title="Create Account"
                                onPress={() => router.push('/signup')}
                                color="#027600ff"
                            />
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
        // justifyContent: 'center',
        // alignItems: 'center',
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
        marginBottom: 0,
        marginTop: 40,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    textInput: {
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: 250,
                marginTop: 10,
                backgroundColor: 'white',
            },
            android: {
                borderWidth: 1,
                borderRadius: 10,
                width: 250,
                marginTop: 10,
                backgroundColor: 'white',
            },
            web: {
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: 250,
                marginTop: 10,
                backgroundColor: 'white',
                outline: 'none',
                cursor: 'text',
                paddingHorizontal: 10,

                pointerEvents: 'auto',
            }
        }),
    },
    loginbtnContainer: {
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        width: 240,
        ...Platform.select({
            ios: {
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
                backgroundColor: '#e0e0e0ff',
            },
        }),
    },
    partition: {
        fontSize: 30,
        color: '#444444ff',
    },
});