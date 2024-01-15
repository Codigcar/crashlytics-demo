/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Button, View} from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

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
      <Button
        title="Add To Basket"
        onPress={async () => {
          try {
            await analytics().logEvent('basket', {
              id: 3745092,
              item: 'mens grey t-shirt',
              description: ['round neck', 'long sleeved'],
              size: 'L',
            });
            console.log('Add To Basket');
          } catch (error) {
            console.log(
              '🚀 ------------------------------------------------🚀',
            );
            console.log('🚀 ~ file: App.tsx:69 ~ onPress={ ~ error:', error);
            console.log(
              '🚀 ------------------------------------------------🚀',
            );
          }
        }}
      />
      <Button
        title="Press me"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={async () => {
          try {
            await analytics().logSelectContent({
              content_type: 'clothing',
              item_id: 'abcd',
            });
            console.log('clothing');
          } catch (error) {
            console.log(
              '🚀 ------------------------------------------------🚀',
            );
            console.log('🚀 ~ file: App.tsx:91 ~ onPress={ ~ error:', error);
            console.log(
              '🚀 ------------------------------------------------🚀',
            );
          }
        }}
      />
    </View>
  );
}

export default App;
