import data from '@/assets/weather.json';
import SpotItem from '@/components/SpotItem';
import { View } from '@/components/Themed';
import { retroMapStyle } from '@/constants/mapStyles';
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
        initialRegion={{
          latitude: 32.7765,       // Charleston
          longitude: -79.9311,
          latitudeDelta: 0.05,     // IMPORTANT: must be > 0
          longitudeDelta: 0.05,
        }}
      >
        {data.spots.map((spot, index) => (
            <Marker
            onPress={() => setSelectedSpot(spot)}
            key={spot.id}
            coordinate={spot.location}
            //title={spot.name}
            //description={spot.description}
            
            
            >    
            </Marker>

  ))}
      </MapView>
      {selectedSpot && <SpotItem spots={selectedSpot}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },              // parent must have size
  map: { flex: 1 },
  marker:{
  }                    // map must have size
});