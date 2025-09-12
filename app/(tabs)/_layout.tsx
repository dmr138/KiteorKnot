import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Conditionally select the light or dark theme palette
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  



  return (
    <Tabs
      screenOptions={{
        headerStyle: theme.header,
        headerTintColor: theme.headerTint,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: theme.tabBar,
        tabBarActiveTintColor: theme.tabActiveTint,
        tabBarInactiveTintColor: theme.tabInactiveTint,
        headerRight: () => (
          <Pressable onPress={() => alert('Information menu pressed!')} style={styles.headerRightContainer}>
            <Ionicons name="settings" size={24} color={theme.headerTint} />
          </Pressable>
        ),
      }}
    >
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
        name="settings"
        options={{
          headerTitle: '',
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
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