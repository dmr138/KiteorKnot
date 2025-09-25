import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet, } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme(); //grabs the phones theme
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;


  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.header, height: 90 },
        headerTintColor: theme.headerTint,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: { backgroundColor: theme.tabBar },
        tabBarActiveTintColor: theme.tabActiveTint,
        tabBarInactiveTintColor: theme.tabInactiveTint,
        headerRight: () => (
          <Pressable

            onPress={() => alert('Settings button pressed!')}


            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push('/game');
            }}
            style={styles.headerRightContainer}>
            <Ionicons name="settings-outline" size={24} color={theme.headerTint} />
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
        name="game"
        options={{
          href: null,
          headerTitle: '',
          title: 'Game',
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