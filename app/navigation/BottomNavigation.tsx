import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Pokedex from '../components/Pokedex';
import FavoritesPage from '../screens/FavoritesPage';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Pokedex" component={Pokedex} />
        <Tab.Screen name="Favorites" component={FavoritesPage} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}