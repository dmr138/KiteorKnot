import { StyleSheet } from 'react-native';

export  default function kiteCalc(weight: number,wind: number): number{
    return Math.round((weight * 1.5) / wind);
    
}



const styles = StyleSheet.create({})