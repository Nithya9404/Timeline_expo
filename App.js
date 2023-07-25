import React, { useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import CarbonIntensityScreen from './screens/CarbonIntensityScreen';
import UserProfileScreen from './screens/userprofile';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Timeline from './screens/Timeline';

const Stack = createStackNavigator();

export default function App () {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
      <Stack.Screen name='Timeline' component={Timeline}></Stack.Screen>
      <Stack.Screen name='Post' component={CarbonIntensityScreen}></Stack.Screen>
      <Stack.Screen name='Profile' component={UserProfileScreen}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
};
  

function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Welcome</Text>
      <View style={styles.spacing}></View>
      <Button title='Get timeline' onPress={()=>navigation.navigate('Timeline')}/>
      <View style={styles.spacing}></View>
      <Button title='Post from API' onPress={()=>navigation.navigate('Post')}/>
      <View style={styles.spacing}></View>
      <Button title='Get Profile' onPress={()=>navigation.navigate('Profile')}/>
    </View>
  );
};
const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  spacing:{height:20},
});

