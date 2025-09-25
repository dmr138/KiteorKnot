import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import kiteCalc from './kiteCalc';


const SpotItem = ({ spots }) => {
    const userWeight = 80;
    return (

    <View style={styles.card}>
        <Image style={styles.img} source={require('@/assets/images/favicon.png') }/>
        <View style={styles.spotInfo}>
            <Text style={styles.infoTxt}>{spots.name}</Text>
            <View style={styles.windInfo}>
                <Text style={styles.infoTxt}>{spots.forecast[0].currentWindKts}kts</Text>
                <Text style={styles.infoTxt}>{spots.forecast[0].currentWindDir}</Text>
            </View>
            <Text>{kiteCalc(userWeight, Number(spots.forecast[0].currentWindKts))}m </Text>
    
        </View>

    </View>
  )
}

export default SpotItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        flexDirection:'row',
        flex: 1,
        borderRadius: 8,
        height: 100,
        aspectRatio: 'auto' ,
        justifyContent: 'space-around',
        alignItems:'flex-start',
        
    },

    spotInfo:{
        display: 'flex',
        flexDirection: 'column'
        
    },
    windInfo:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    img: {
        width: 100,
        aspectRatio: 1,
        backgroundColor:'black',
        margin: 0,
        padding: 0,
    },
    infoTxt:{
        fontSize: 30,
    },
})