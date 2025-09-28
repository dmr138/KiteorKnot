import data from '@/assets/weather.json';
import SpotItem from '@/components/SpotItem';
import { View } from '@/components/Themed';
import { retroMapStyle } from '@/constants/mapStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";


export default function HomePage() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}     // don't force Google provider in Expo Go
        customMapStyle={retroMapStyle}
        showsCompass={false}
        toolbarEnabled={false}
        style={styles.map}
        onPress={() => setSelectedSpot(null)}
        //moveOnMarkerPress={false}
        
        
        initialCamera={{
          center: { latitude: 32.74, longitude: -79.89 },
          pitch: 0,
          heading: 0,
          zoom: 11.5,        // Android- higher is zoomed in more
          altitude: 75000     // ios- meters
        }}
      >
      {data.spots.map((spot, index) => (
        <Marker
          stopPropagation={true}// for ios markers
          key={spot.id}
          flat={true}
          coordinate={spot.location}
          onPress={() => setSelectedSpot(spot)}
          //tracksViewChanges={false} //for flickering icons may need later
        >
          <Ionicons name="arrow-up" size={35} color="red" />
        </Marker>

      ))}
    </MapView>
      { selectedSpot && <SpotItem spots={selectedSpot} /> }
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },              // parent must have size
  map: { flex: 1 },
  marker: {
  }                    // map must have size
});