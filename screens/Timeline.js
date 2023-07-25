import {View,Text,Button} from 'react-native';
import {useState, useEffect} from 'react';
import {AtpAgent, BskyAgent} from '@atproto/api';

export default function Timeline({navigation}){
const [accessToken, setAccessToken] = useState(null);
  const [timelineData, setTimelineData] = useState(null);

  useEffect(() => {
    signInAndSetToken();
  }, []);

  const signInAndSetToken = async () => {
    try {
      const agent = new AtpAgent({ service: 'https://bsky.social' });
      const res = await agent.login({
        identifier: 'alrts.bsky.social', 
        password: 'mbjw@p**ZnCWm!P3H6KmWPLcqFxPoi', 
      });
      setAccessToken(res.data.accessJwt);

      
      await fetchTimeline(res.data.accessJwt);
    } catch (error) {
      console.log('Error signing in and setting token:', error);
    }
  };

  const fetchTimeline = async (accessToken) => {
    try {
      
      const bskyAgent = new BskyAgent({ service: 'https://bsky.social' });

      
      const timelineResponse = await bskyAgent.getTimeline(
        null, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      
      setTimelineData(timelineResponse.data);
    } catch (error) {
      console.log('Error fetching timeline data:', error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <View style={{height:20}}/>
      {accessToken ? (
        <View>
          <Text>Access Token: {accessToken}</Text>
          {timelineData && <Text>Timeline Data: {JSON.stringify(timelineData)}</Text>}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title='Go Back' onPress={()=>navigation.navigate('Home')}/>
      </View>
      );

}