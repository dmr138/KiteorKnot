import { useAuth } from '@/context/AuthProvider';
import { getUserWeightLocal } from '@/utils/storage';
import { dirToDeg } from '@/utils/windDir';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import kiteCalc from './kiteCalc';
import { Text, View } from './Themed';

const SpotItem = ({ spots, onPress, onClose }) => {

  //const weight = '180'; //temporary hardcoded weight
  const {user} = useAuth();
  const [weight, setWeight] = useState('');
  useEffect(() => {
  user?.id && getUserWeightLocal(user.id).then(localWeight => setWeight(localWeight ?? ''));
  }, [spots]); //not the most efficient but it works for now
  //spots.data.current.wind_speed_10m
  const windD = spots?.forecast[0].currentWindDir;
  const deg = Number.isFinite(dirToDeg(windD)) ? dirToDeg(windD) : 0;
  let kiteText: string;
  if (weight) {
    kiteText = `${kiteCalc(Number(weight), Number(spots.forecast[0].currentWindKts ?? 0))}m`;
  } else {
    kiteText = 'Add Weight in Profile page';
  }

  return (
    <Pressable onPress={onPress} style={styles.card} >
        <Image style={[styles.img, { transform: [{ rotate: `${deg}deg` }] }]} source={require('@/assets/images/arrow-up.png')} />
        <View style={styles.spotInfo}>
          <Text style={styles.infoTxt}>{spots.name}</Text>
          <View style={styles.windInfo}>
            <Text style={styles.infoTxt}>{spots.forecast[0].currentWindKts}kts</Text>
            <Text style={styles.infoTxt}>{spots.forecast[0].currentWindDir}</Text>
          </View>
          <View style={styles.windInfo}>
            <Text>{kiteText}</Text>
            {onClose && <Pressable onPress={onClose}><Text>Close</Text></Pressable>}
          </View>
        </View>
    
    </Pressable>
  )
}

export default SpotItem

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 8,
    height: 100,
    aspectRatio: 'auto',
    justifyContent: 'space-around',
    alignItems: 'flex-start',

  },

  spotInfo: {
    display: 'flex',
    flexDirection: 'column'

  },
  windInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  img: {
    width: 70,
    aspectRatio: 1,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
  infoTxt: {
    fontSize: 30,
  },
})