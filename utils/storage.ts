
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Keyboard } from "react-native";
//https://reactnative.dev/docs/asyncstorage
//https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage
//local storage testing

  export async function getUserWeightLocal(setWeight: (value: string) => void ,setLoading: (value: boolean) => void) {
    try {
      const storedWeight = await AsyncStorage.getItem('userWeight');
      if (storedWeight !== null) {
        setWeight(storedWeight);
      }
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

export  async function updateUserWeightLocal(newWeight: string, setWeight: (value: string) => void ,setLoading: (value: boolean) => void) {
    try {
      setLoading(true)
      const numericWeight = Number(newWeight);
      if (isNaN(numericWeight) || numericWeight <= 0 || numericWeight > 350) {
        Alert.alert("Invalid Weight", "Please enter a weight between 1 and 350.");
        return;
      }
      await AsyncStorage.setItem('userWeight', newWeight);
      setWeight(newWeight);
      Alert.alert("Success", "Weight updated!");
      Keyboard.dismiss();
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }