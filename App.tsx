import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import BottomNavigation from './app/navigation/BottomNavigation';
import { store } from './app/store';

export default function App() {
  return (
    <Provider store={store}>
      <BottomNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
