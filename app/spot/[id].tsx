import data from '@/assets/weather.json';
import { dirToDeg } from '@/utils/windDir';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function SpotDetails () {
    const {id} = useLocalSearchParams<{id: string}>();
    const spotId = Number(id);
    const spot = data.spots.find(s => s.id === spotId);
    const [selectedForecast, setSelectedForecast] = useState(spot?.forecast[0]);
    const barData = [
        { value: selectedForecast.times[0].windSpeedKts, label: selectedForecast.times[0].time },
        { value: selectedForecast.times[1].windSpeedKts, label: selectedForecast.times[1].time },
        { value: selectedForecast.times[2].windSpeedKts, label: selectedForecast.times[2].time },
    ];
const wind0 = spot?.forecast[0].currentWindDir;
const wind1 = spot?.forecast[1].currentWindDir;
const wind2 = spot?.forecast[2].currentWindDir;
const wind3 = spot?.forecast[3].currentWindDir;

const deg0 = Number.isFinite(dirToDeg(wind0)) ? dirToDeg(wind0) : 0 ;
const deg1 = Number.isFinite(dirToDeg(wind1)) ? dirToDeg(wind1) : 0;
const deg2 = Number.isFinite(dirToDeg(wind2)) ? dirToDeg(wind2) : 0;
const deg3 = Number.isFinite(dirToDeg(wind3)) ? dirToDeg(wind3) : 0;

  return (
    <View>
      <Text>{spot.name}</Text>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
            <Pressable onPress={() => setSelectedForecast(spot?.forecast[0])} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{spot?.forecast[0].date}</Text>
                        <Text>Speed: {spot?.forecast[0].averageWindKts} kts</Text>
                        <Text>Dir: {spot?.forecast[0].currentWindDir}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${deg0}deg` }] }]} source={require('@/assets/images/arrow-up.png')} />
                </View>
            </Pressable>

            <Pressable onPress={() => setSelectedForecast(spot?.forecast[1])} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{spot?.forecast[1].date}</Text>
                        <Text>Speed: {spot?.forecast[1].averageWindKts} kts</Text>
                        <Text>Dir: {spot?.forecast[1].currentWindDir}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${deg1}deg` }] }]} source={require('@/assets/images/arrow-up.png')} />
                </View>
            </Pressable>

            <Pressable onPress={() => setSelectedForecast(spot?.forecast[2])} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{spot?.forecast[2].date}</Text>
                        <Text>Speed: {spot?.forecast[2].averageWindKts} kts</Text>
                        <Text>Dir: {spot?.forecast[2].currentWindDir}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${deg2}deg` }] }]} source={require('@/assets/images/arrow-up.png')} />
                </View>    
            </Pressable>

            <Pressable style={styles.card} onPress={() => setSelectedForecast(spot?.forecast[3])} >
                    <View style={styles.text}>
                        <Text>{spot?.forecast[3].date}</Text>
                        <Text>Speed: {spot?.forecast[3].averageWindKts} kts</Text>
                        <Text>Dir: {spot?.forecast[3].currentWindDir}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${deg3}deg` }] }]} source={require('@/assets/images/arrow-up.png')} />
            </Pressable>
        </ScrollView>
        <Text>Selected Forecast:</Text>
        <Text>{selectedForecast ? `Date: ${selectedForecast.date}` : 'None selected'}</Text>
        <ScrollView>
            {barData.length > 0 ? <BarChart data={barData} /> : <Text>No hourly data</Text>}
        </ScrollView>
        <Text>{spot?.description}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: {flex: 1, flexDirection:'row', height: 200, width: 200, backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,},
    text: {flex: 1, flexDirection: 'column', zIndex: 1, justifyContent: 'space-evenly'},
    img: {
    maxWidth: 20,
    aspectRatio: 1,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
})