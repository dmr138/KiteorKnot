import data from '@/assets/weather.json';
import SpotItem from '@/components/SpotItem';
import { View } from '@/components/Themed';
import { retroMapStyle } from '@/constants/mapStyles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";


export default function HomePage() {
  const[selectedSpot, setSelectedSpot] = useState(null);
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
        {data.spots.map((spot, index) => (
            <Marker
            onPress={() => setSelectedSpot(spot)}
            key={spot.id}
            coordinate={spot.location}
            //title={spot.name}
            //description={spot.description}
            flat={true}
            stopPropagation={true}// for ios markers
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
            spot: JSON.stringify(selectedSpot) 
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