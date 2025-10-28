
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Keyboard } from "react-native";
//https://reactnative.dev/docs/asyncstorage
//https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage
//local storage testing

  export async function getUserWeightLocal(userID: string) {
    try {
      return await AsyncStorage.getItem(`${userID}:userWeight`);
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      return null;
    }
  }

  export async function updateUserWeightLocal(newWeight: string, userID: string) {
    try {
      const numericWeight = Number(newWeight);
      if (isNaN(numericWeight) || numericWeight <= 0 || numericWeight > 350) {
        Alert.alert("Invalid Weight", "Please enter a weight between 1 and 350.");
        return;
      }
      await AsyncStorage.setItem(`${userID}:userWeight`, newWeight);
      Alert.alert("Success", "Weight updated!");
      Keyboard.dismiss();
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } 
  }

  export async function getUserKitesLocal(userID: string) {
    try {
      const kitesJson = await AsyncStorage.getItem(`${userID}:userKites`);
      return kitesJson ? JSON.parse(kitesJson) : [];
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      return [];
    }
  }

  export async function updateUserKitesLocal(kiteSize: string, userID: string) {
    try {
      const numericSize = Number(kiteSize);
      if (isNaN(numericSize) || numericSize <= 0 || numericSize > 30) {
        Alert.alert("Invalid Kite Size", "Please enter a kite size between 1 and 30 square meters.");
        return;
      }

      const existingKites = await getUserKitesLocal(userID);
      const newKite = {
        size: numericSize,
        id: Date.now().toString(),
      };

      const updatedKites = [...existingKites, newKite];
      await AsyncStorage.setItem(`${userID}:userKites`, JSON.stringify(updatedKites));
      Keyboard.dismiss();
      return newKite;
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  export async function removeUserKiteLocal(kiteId: string, userID: string) {
    try {
      const existingKites = await getUserKitesLocal(userID);
      const updatedKites = existingKites.filter((kite: { id: string }) => kite.id !== kiteId);
      await AsyncStorage.setItem(`${userID}:userKites`, JSON.stringify(updatedKites));
      return true;
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      return false;
    }
  }