import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AtpAgent, BskyAgent } from '@atproto/api';

const CarbonIntensityScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [did, setDid] = useState(null); 

  const fetchCarbonIntensityData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.carbonintensity.org.uk/intensity');
      const data = await response.json();
      setData(data);
      setLoading(false);

      // Post the data to ATP server after fetching
      postToAtpServer(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const postToAtpServer = async (data) => {
    try {   
      const bskyAgent = new BskyAgent({ service: 'https://bsky.social' });
      const res = await bskyAgent.login({
        identifier: 'alrts.bsky.social',
        password: 'mbjw@p**ZnCWm!P3H6KmWPLcqFxPoi',
      });
  
     
      if (res.data.accessJwt) {
        bskyAgent.session = { accessJwt: res.data.accessJwt, did: res.data.did };
        setDid(res.data.did); 
      }  
      const actualIntensity = data.data[0].intensity.actual;
      const newPost = await bskyAgent.post({
        repo: res.data.did, 
        text: `The Actual Carbon Intensity of UK is: ${actualIntensity}`, 
      });
  
      console.log('Posted to ATP server:', newPost);
    } catch (error) {
      console.log('Error posting to ATP server:', error.message);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Button
        title="Fetch Carbon Intensity Data"
        onPress={fetchCarbonIntensityData}
        disabled={loading}
      />
      {loading ? (
        <Text style={styles.text}>Loading data...</Text>
      ) : data ? (
        <View styles={styles.text}>
          <Text>Current Carbon Intensity: {data.data[0].intensity.actual}</Text>
        </View>
      ) : null}
      <Button title='Go back' onPress={()=>navigation.navigate('Home')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default CarbonIntensityScreen;
