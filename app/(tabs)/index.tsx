import markers from '@/assets/markers.json';
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}  // don't force Google provider in Expo Go
        style={styles.map}
        initialRegion={{
          latitude: 32.7765,       // Charleston
          longitude: -79.9311,
          latitudeDelta: 0.05,     // IMPORTANT: must be > 0
          longitudeDelta: 0.05,
        }}
      >
        {markers.map((spot, index) => (
            <Marker
            key={index}
            coordinate={spot.location}
            title={spot.name}
            description={spot.description}
            >
                
                
            </Marker>
  ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },              // parent must have size
  map: { flex: 1 },
  marker:{
  }                    // map must have size
});