import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Homescreen';
import Game1 from './src/screens/Game1/Game1';
import Game2 from './src/screens/Game2/Game2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        {/* ✅ Hides the white header space */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Wordle" component={Game1} />
        <Stack.Screen name="Bumble Bloom" component={Game2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
