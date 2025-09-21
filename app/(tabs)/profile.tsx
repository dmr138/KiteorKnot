
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";


export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  //const { data, error } = await Supabase
  // supabase stuff will go here. upsert etc




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.outerContainer]}>
        <KeyboardAvoidingView>
          <View>
            <Text 
            style={[styles.welcomeText]}>
              Hello {user?.email?.split('@')[0] || ''}
            </Text>
            <Text style={[styles.welcomeText]}>
              You are logged in!
            </Text>
            <Text style={[styles.instructionText]}>
              Please enter your weight in the field below.
              {'\n'}{'\n'}
              KiteorKnot will use this information and the current
              {'\n'}
              weather data to recomend a kite size
            </Text>

            <TextInput
              placeholder="Weight"
              style={styles.textInput}
              secureTextEntry={false}
              keyboardType={'numeric'}
              autoComplete='off'
              value={weight}
              onChangeText={setWeight}
            />

            <View style={styles.updatebtnContainer}>
              <Button
                title={loading ? "Updating..." : "Update Weight"}
                disabled={loading}
                  onPress={() => {
                    setLoading(true);
                    const numericWeight = parseFloat(weight);

                    if (isNaN(numericWeight) || numericWeight <= 0 || numericWeight > 350) {
                      Alert.alert("Invalid Weight", "Please enter a weight between 1 and 350.");
                      setLoading(false);
                      return;
                    }
                    Alert.alert("Success", "Weight updated!");
                    setLoading(false);
                    }
                  }
              />
            </View>

            <View style={styles.spacer} />

            <View style={styles.signoutbtnContainer}>
              <Button
                title="Log Out"
                onPress={() => {
                  if (signOut) {
                    Alert.alert(
                      "Log Out",
                      "Are you sure you want to log out?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        {
                          text: "Log Out",
                          onPress: () => signOut()
                        }
                      ]
                    )
                  }
                }}
                color="#9e0000ff"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
    marginBottom: 20,

  },
  updatebtnContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    width: 220,
  },
  spacer: {
    flex: 1,
  },
  signoutbtnContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    width: 220,
    backgroundColor: '#FF0000',
  },
  textInput: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: 210,
    marginTop: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        height: 35,
      },
      web: {
        height: 35,
        outline: 'none',
        cursor: 'text',
        paddingHorizontal: 10,
        pointerEvents: 'auto',
      }
    }),
  },
});