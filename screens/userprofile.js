import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BskyAgent } from '@atproto/api';

const UserProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const bskyAgent = new BskyAgent({ service: 'https://bsky.social' });

      const res = await bskyAgent.login({
        identifier: 'alrts.bsky.social',
        password: 'mbjw@p**ZnCWm!P3H6KmWPLcqFxPoi',
      });
      if (res.data.accessJwt) {
        bskyAgent.session = { accessJwt: res.data.accessJwt, did: res.data.did };
      }

      const userProfile = await bskyAgent.getProfile({
        actor: 'alrts.bsky.social', 
      });

      setProfile(userProfile); 
      setLoading(false);
    } catch (error) {
      console.log('Error fetching user profile:', error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading profile...</Text>
      ) : profile ? (
        <View styles={styles.profile}>
          {/* Display each data item */}
          <Text>DID: {profile.data.did}</Text>
          <Text>Handle: {profile.data.handle}</Text>
          <Text>Follows Count: {profile.data.followsCount}</Text>
          <Text>Followers Count: {profile.data.followersCount}</Text>
          <Text>Posts Count: {profile.data.postsCount}</Text>
          <Text>Indexed At: {profile.data.indexedAt}</Text>
        </View>
      ) : (
        <Text style={styles.text}>No profile data available</Text>
      )}
      <Button title='Go Back' onPress={()=>navigation.navigate('Home')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default UserProfileScreen;
