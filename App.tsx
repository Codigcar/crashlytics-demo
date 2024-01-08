/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Button, View} from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';

async function onSignIn(user: any) {
  try {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
    // crashlytics().recordError(new Error('hola como estas?'));
    crashlytics().recordError(new Error('Estoy bien y tu?'));
    // crashlytics().crash();
    console.log('data registrada');
  } catch (error) {
    console.log('🚀 -----------------------------------------------🚀');
    console.log('🚀 ~ file: App.tsx:28 ~ onSignIn ~ error:', error);
    console.log('🚀 -----------------------------------------------🚀');
  }
}

function App(): React.JSX.Element {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <View>
      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
    </View>
  );
}

export default App;
