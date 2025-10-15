import data from '@/assets/weather.json';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SpotDetails () {
    const {id} = useLocalSearchParams<{id: string}>();
    const spotId = Number(id);
    const spot = data.spots.find(s => s.id === spotId);
  return (
    <View>
      <Text>{spot.name}</Text>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.card}>
                <Text>{spot?.forecast[0].date}</Text>
                <Text>Speed: {spot?.forecast[0].currentWindKts} kts</Text>
                <Text>Dir: {spot?.forecast[0].currentWindDir}</Text>
            </View>
            <View style={styles.card}>
                <Text>{spot?.forecast[1].date}</Text>
                <Text>Speed: {spot?.forecast[1].averageWindKts} kts</Text>
                <Text>Dir: {spot?.forecast[1].currentWindDir}</Text>
            </View>
            <View style={styles.card}>
                <Text>{spot?.forecast[2].date}</Text>
                <Text>Speed: {spot?.forecast[2].averageWindKts} kts</Text>
                <Text>Dir: {spot?.forecast[2].currentWindDir}</Text>
            </View>
            <View style={styles.card}> 
                <Text>{spot?.forecast[3].date}</Text>
                <Text>Speed: {spot?.forecast[3].averageWindKts} kts</Text> 
                <Text>Dir: {spot?.forecast[3].currentWindDir}</Text>
            </View>
        </ScrollView>
        <Text>{spot?.description}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: {flex: 1, width: 200, backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,},
})