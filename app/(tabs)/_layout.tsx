import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: true}}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTitle: '',
          tabBarIcon:(props) => {
              return(
                <Image source={icons.home}></Image>
              )
          },
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: '',
          tabBarIcon:(props) => {
            return(
              <Image source={icons.person}></Image>
            )
              
          },
        }}
        
        />
      <Tabs.Screen
        name="search"
      
        options={{
          title: 'Search',
          headerTitle: '',
          tabBarIcon: () => {
            return(
              <Image source={icons.search}></Image>
            )
          }
        }}
        />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})

