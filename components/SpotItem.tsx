import data from '@/assets/spots.json';
import { useAuth } from '@/context/AuthProvider';
import { getUserWeightLocal } from '@/utils/storage';
import { degToDir, isSafe } from '@/utils/windtxt';
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
  const spotId = spots?.id
  const windD = spots?.data.current.wind_direction_10m;
  
  const degTxt = degToDir(windD);
  const speed = spots?.data.current.wind_speed_10m;
  const spot  = data.spotInfo.find(item => item.id === spotId);
  const idealWinds: string[] = spot?.goodwinds ?? [];
  

  let card = styles.card
  if(isSafe(degTxt, idealWinds)){
    card = styles.cardGood
  } else{
    card = styles.cardBad
  }

  let kiteText: string;
  if (weight) {
    kiteText = `${kiteCalc(Number(weight), Number(speed ?? 0))}m`;
  } else {
    kiteText = 'Add Weight in Profile page';
  }

  return (
    <Pressable onPress={onPress} style={card} >
        <Image style={[styles.img, { transform: [{ rotate: `${windD}deg` }] }]} source={require('@/assets/images/arrow-down.png')} />
        <View style={styles.spotInfo}>
          <Text style={styles.infoTxt}>{spots.name}</Text>
          <View style={styles.windInfo}>
            <Text style={styles.infoTxt}>{speed}kts</Text>
            <Text style={styles.infoTxt}>{degTxt}</Text>
          </View>
          <View style={styles.windInfo}>
            <Text>Kite Rec: {kiteText}</Text>
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
  cardGood: {
    backgroundColor: 'green',
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

  cardBad: {
    backgroundColor: 'red',
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
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    width: 250,

  },
  windInfo: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',

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