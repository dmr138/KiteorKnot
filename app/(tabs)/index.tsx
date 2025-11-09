import SpotItem from '@/components/SpotItem';
import { View } from '@/components/Themed';
import { retroMapStyle } from '@/constants/mapStyles';
import { useAuth } from '@/context/AuthProvider';
import { Spot } from '@/utils/customTypes';
import getWeather from '@/utils/getWeather';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";


export default function HomePage() {
  const { session } = useAuth();
  // define a Spot type so TypeScript knows the shape of items in result.spots

  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [result, setResult] = useState<{ spots: Spot[] }>({ spots: [] });
  useEffect( () => {
    const fetchData = async () => {
            const weatherData: any = await getWeather(session?.access_token ?? '');
            setResult(weatherData);
          };
        fetchData();}, [session?.access_token]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}     // don't force Google provider in Expo Go
        customMapStyle={retroMapStyle}
        style={styles.map}
        initialCamera={{
          center: { latitude: 32.74, longitude: -79.89 },
          pitch: 0,
          heading: 0,
          zoom: 11.5,        // Android- higher is zoomed in more
          altitude: 75000     // ios- meters
        }}
        onPress={() => setSelectedSpot(null)}
      >
        {result.spots.map((spot) => (
            <Marker
            onPress={() => setSelectedSpot(spot)}
            key={spot.id}
            coordinate={{
              latitude: Number(spot.location.latitude),
              longitude: Number(spot.location.longitude),}}
            //title={spot.name}
            //description={spot.description}
            stopPropagation={true}
            
            
            >
               
            </Marker>

  ))}
      </MapView>
      
      {selectedSpot && 
        <SpotItem 
          spots={selectedSpot}
          onPress={() => {router.push({
            pathname: '/spot/[id]',
            params: { id: String(selectedSpot.id),
            },
          });
        }}
          onClose={() => setSelectedSpot(null)}
          />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },              // parent must have size
  map: { flex: 1 },
  marker:{
  }                    // map must have size
});