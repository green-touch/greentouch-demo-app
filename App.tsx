import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '@_screens/MainScreen';
import HomeScreen from '@_screens/HomeScreen';
import TestScreen from '@_screens/TestScreen';
import SampleHomeScreen from '@_screens/SampleHomeScreen';
import MyInfoScreen from '@_screens/MyInfoScreen';
import "@_styles/global.css"

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="SampleHome" component={SampleHomeScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
