
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import { getUserKitesLocal, getUserWeightLocal, removeUserKiteLocal, updateUserKitesLocal, updateUserWeightLocal } from '@/utils/storage';
import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [kiteSize, setKiteSize] = useState('');
  const [kites, setKites] = useState<Array<{ size: number; id: string }>>([]);

  useEffect(() => {
    user?.id && getUserKitesLocal(user.id).then(userKites => setKites(userKites));
  }, [user?.id]);

  useEffect(() => {
    user?.id && getUserWeightLocal(user.id).then(localWeight => setWeight(localWeight ?? ''));
  }, [user?.id]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.outerContainer]}>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.welcomeText}>
              Hello{' '}
              <Text
                style={styles.welcomeText}
                onLongPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push('/donation');
                }}
              >
                {user?.email?.split('@')[0] || ''}
              </Text>
            </Text>
            <Text style={[styles.welcomeText]}>
              You are logged in!
            </Text>
            <Text style={[styles.instructionText]}>
              Please enter your weight in the field below.
              {'\n'}{'\n'}
              KiteorKnot will use this information and the current
              {'\n'}
              weather data to recommend a kite size
            </Text>

            <TextInput
              placeholder="Enter your weight (lbs)"
              style={styles.textInput}
              inputMode="numeric"
              keyboardType={'numeric'}
              autoComplete='off'
              value={weight}
              onChangeText={setWeight}
            />

            <View style={styles.updatebtnContainer}>
              <Button
                title={"Update Weight"}
                onPress={() => user?.id && updateUserWeightLocal(weight, user.id)}
                />
            </View>

            <Text style={[styles.instructionText, { marginTop: 30, marginBottom: 0 }]}>
              Your Kites
            </Text>

            <View style={styles.kiteInputContainer}>
              <TextInput
                placeholder="Enter kite size (m²)"
                style={[styles.textInput, { width: 150 }]}
                inputMode="numeric"
                keyboardType="numeric"
                autoComplete="off"
                value={kiteSize}
                onChangeText={setKiteSize}
              />
              <View style={[styles.updatebtnContainer, { width: 100, marginTop: 10 }]}>
                <Button
                  title="Add Kite"
                  onPress={async () => {
                    if (user?.id) {
                      const newKite = await updateUserKitesLocal(kiteSize, user.id);
                      if (newKite) {
                        setKites(prevKites => [...prevKites, newKite]);
                        setKiteSize('');
                      }
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.kitesContainer}>
              {kites.map(kite => (
                <View key={kite.id} style={styles.kiteItem}>
                  <Text style={styles.kiteSize}>{kite.size}m²</Text>
                  <Pressable
                    onPress={async () => {
                      if (user?.id) {
                        const success = await removeUserKiteLocal(kite.id, user.id);
                        if (success) {
                          setKites(prevKites => prevKites.filter(k => k.id !== kite.id));
                        }
                      }
                    }}
                    style={styles.removeKiteBtn}
                  >
                    <FontAwesome name="trash-o" size={20} color="#FF0000" />
                  </Pressable>
                </View>
              ))}
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
    kiteInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  kitesContainer: {
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  kiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  kiteSize: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  removeKiteBtn: {
    padding: 5,
  },
});