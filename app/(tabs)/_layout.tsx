import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Conditionally select the light or dark theme palette
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

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
            <Ionicons name="information-circle" size={24} color={theme.headerTint} />
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
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "earth" : "earth-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const lightTheme = {
  header: { backgroundColor: '#cacacaff' },
  headerTint: '#006db6ff',
  tabBar: { backgroundColor: '#cacacaff' },
  tabActiveTint: '#006db6ff',
  tabInactiveTint: '#666',
};

const darkTheme = {
  header: { backgroundColor: '#4b4b4bff' },
  headerTint: '#da8600ff',
  tabBar: { backgroundColor: '#4b4b4bff' },
  tabActiveTint: '#da8600ff',
  tabInactiveTint: 'gray',
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
  },
  headerRightContainer: {
    marginRight: 15,
  },
});