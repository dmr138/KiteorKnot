const tintColorLight = '#2f95dc';
const tintColorDark = '#2f95dc';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    header: { backgroundColor: '#e1e1e1ff', height: 90 },
    headerTint: tintColorLight,
    tabBar: { backgroundColor: '#e1e1e1ff' },
    tabActiveTint: tintColorLight,
    tabInactiveTint: '#666',
  },
  dark: {
    text: '#fff',
    background: '#2c2c2cff',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    header: { backgroundColor: '#4b4b4bff', height: 90 },
    headerTint: tintColorDark,
    tabBar: { backgroundColor: '#4b4b4bff' },
    tabActiveTint: tintColorDark,
    tabInactiveTint: 'gray',
  },
};