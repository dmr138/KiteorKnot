import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme(); //grabs the phones theme
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const screenOptions={
        headerStyle: { backgroundColor: theme.header, height: 90 },
        headerTintColor: theme.headerTint,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: { backgroundColor: theme.tabBar },
        tabBarActiveTintColor: theme.tabActiveTint,
        tabBarInactiveTintColor: theme.tabInactiveTint,
      }
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '',
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: '',
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: '',
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="donation"
        options={{
          href: null,
          headerTitle: '',
          title: 'donation',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  
  headerTitle: {
    fontWeight: 'bold',
  },
  headerRightContainer: {
    marginRight: 15,
    marginBottom: 5
  },
});