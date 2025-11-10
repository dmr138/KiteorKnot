import { useAuth } from '@/context/AuthProvider';
import { avgWindDir, avgWindSpeed, forecastSplit, getDate } from '@/utils/averageWind';
import { Forecast, Spot } from '@/utils/customTypes';
import getWeather from '@/utils/getWeather';
import { dirToDeg } from '@/utils/windDir';
import { degToDir } from '@/utils/windtxt';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, BarChartPropsType } from 'react-native-gifted-charts';

export default function SpotDetails () {
    const { session } = useAuth();
    const {id} = useLocalSearchParams<{id: string}>();
    const spotId = Number(id);

    const [result, setResult] = useState<{ spots: Spot[] }>({ spots: [] });
    const [selectedForecast, setSelectedForecast] = useState<Forecast | null>(null);
    const nav = useNavigation();

    useEffect( () => {
        
        const fetchData = async () => {
            try{
                const weatherData: any = await getWeather(session?.access_token ?? '');
                setResult(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
              };
            fetchData();}, [session?.access_token]);

    const spot2 = useMemo(() => result.spots.find(s => s.id === spotId), [result.spots, spotId]);
    const spotName = spot2?.name ?? 'Spot Details';

    useLayoutEffect(() =>{
        nav.setOptions({
            title: spotName,
        });
    }, [nav, spotName]);
//forecast info
    const hourly = spot2?.data?.hourly;
    const hasHourly = Boolean(hourly?.time && hourly?.wind_speed_10m && hourly?.wind_direction_10m);

    if (!hasHourly) {
        return <Text style={{ padding: 16 }}>Loading…</Text>;
    }
    
    //Day 1 Forecast
    const day1WwindDirs = forecastSplit(spot2?.data.hourly.wind_direction_10m, 0, 23) as number[];
    const day1WSpeeds = forecastSplit(spot2?.data.hourly.wind_speed_10m, 0,23) as (number| string)[];
    const day1Times = forecastSplit(spot2?.data.hourly.time, 0, 23 ) as string[];
    const day1AvgDir = avgWindDir(day1WwindDirs, day1WSpeeds) as number;
    const day1AvgSpeed = avgWindSpeed(day1WSpeeds) as number;
    //Day 2 Forecast info
    const day2WwindDirs = forecastSplit(spot2?.data.hourly.wind_direction_10m, 24, 47) as number[];
    const day2WSpeeds = forecastSplit(spot2?.data.hourly.wind_speed_10m, 24, 47 )  as (number| string)[];
    const day2Times = forecastSplit(spot2?.data.hourly.time, 24, 47 ) as string[];
    const day2AvgDir = avgWindDir(day2WwindDirs, day2WSpeeds);
    const day2AvgSpeed = avgWindSpeed(day2WSpeeds);
    //Day 3 Forecast info
    const day3WwindDirs = forecastSplit(spot2?.data.hourly.wind_direction_10m, 48, 71) as number[];
    const day3WSpeeds = forecastSplit(spot2?.data.hourly.wind_speed_10m, 48, 71) as (number| string)[];
    const day3Times = forecastSplit(spot2?.data.hourly.time, 48, 71 ) as string[];
    const day3AvgDir = avgWindDir(day3WwindDirs, day3WSpeeds);
    const day3AvgSpeed = avgWindSpeed(day3WSpeeds);

    const forecastDay1: Forecast = { 
        date: getDate(day1Times),
        AvgWindSpd: day1AvgSpeed,
        AvgWindDirection: day1AvgDir,
        times: day1Times as string[],
        windSpeedsKts: day1WSpeeds,
        windDirectionsDeg: day1WwindDirs as number[],
    };
    const forecastDay2: Forecast = { 
        date: getDate(day2Times),
        AvgWindSpd: day2AvgSpeed,
        AvgWindDirection: day2AvgDir,
        times: day2Times as string[],
        windSpeedsKts: day2WSpeeds,
        windDirectionsDeg: day2WwindDirs as number[],
    };
    const forecastDay3: Forecast = { 
        date: getDate(day3Times),
        AvgWindSpd: day3AvgSpeed,
        AvgWindDirection: day3AvgDir,
        times: day3Times as string[],
        windSpeedsKts: day3WSpeeds,
        windDirectionsDeg: day3WwindDirs as number[],
    };
    
    const currentForecast = selectedForecast ?? forecastDay1;

    let barData: BarChartPropsType['data'] = [];
    if(currentForecast){
        barData = currentForecast.windSpeedsKts.map((v, i) => ({
            value: Number(v) || 0,
            label: currentForecast.times[i]?.slice(11, 13) ?? '',
      }));
    }
    
    const wind0 = spot2?.data.current.wind_direction_10m;
    const deg0 = wind0 ? dirToDeg(wind0) : 0 ;


  return (
    <View>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
            <Pressable onPress={() => setSelectedForecast(forecastDay1)} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{forecastDay1.date}</Text>
                        <Text>Speed: {spot2?.data.current.wind_speed_10m} kts</Text>
                        <Text>Dir: {degToDir(spot2?.data.current.wind_direction_10m)}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${deg0}deg` }] }]} source={require('@/assets/images/arrow-down.png')} />
                </View>
            </Pressable>

            <Pressable onPress={() => setSelectedForecast(forecastDay2)} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{forecastDay2.date}</Text>
                        <Text>Speed: {forecastDay2.AvgWindSpd} kts</Text>
                        <Text>Dir: {degToDir(forecastDay2.AvgWindDirection)}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${forecastDay2.AvgWindDirection}deg` }] }]} source={require('@/assets/images/arrow-down.png')} />
                </View>
            </Pressable>

            <Pressable onPress={() => setSelectedForecast(forecastDay3)} >
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text>{forecastDay3.date}</Text>
                        <Text>Speed: {forecastDay3.AvgWindSpd} kts</Text>
                        <Text>Dir: {degToDir(forecastDay2.AvgWindDirection)}</Text>
                    </View>
                    <Image style={[styles.img, { transform: [{ rotate: `${day3AvgDir}deg` }] }]} source={require('@/assets/images/arrow-down.png')} />
                </View>    
            </Pressable>

            
        </ScrollView>
        <Text>Selected Forecast:</Text>
        <Text>{currentForecast.date ? `Date: ${currentForecast.date}` : 'None selected'}</Text>
        <ScrollView>
            {barData.length > 0 ? 
                <BarChart data={barData}
                    height={240} 
                    showLine
                    barWidth={20}
                    spacing={3}

                    noOfSections={5}
                    
                    lineConfig2={{
                        color: 'blue',
                        thickness: 2,
                        curved: true,
                        startIndex: 0,
                        hideDataPoints: false,
                        
                    }}
                    /> 
                    : <Text>No hourly data</Text>}
        </ScrollView>
        <Text>{spot2?.description}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: { flexDirection:'row', height: 200, width: 200, backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,},
    text: {flex: 1, flexDirection: 'column',  justifyContent: 'space-evenly'},
    img: {
    flex: 1,
    maxWidth: 20,
    aspectRatio: 1,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
})