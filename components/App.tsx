import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useRef, useState, useMemo, useCallback} from 'react';
import {
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RealmProvider} from '../models/Photo';
import CameraPage from './CameraPage';
import InfoPage from './InfoPage';
import LibraryPage from './LibraryPage';
import PreviewPage from './PreviewPage';
import {Routes} from './Routes';

const Stack = createNativeStackNavigator<Routes>();

export default function App({navigation}: any) {

  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // headerShown: false,
            statusBarStyle: 'dark',
            animationTypeForReplace: 'push',
          }}
          initialRouteName="CameraPage">
          <Stack.Screen
            options={{headerShown: false}}
            name="CameraPage"
            component={CameraPage}
          />
          <Stack.Screen
            options={{
              title: 'Xem trước',
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTintColor: '#ffffff',
            }}
            name="PreviewPage"
            component={PreviewPage}
          />
          <Stack.Screen
            options={{
              title: 'Thư viện',
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTintColor: '#ffffff',
            }}
            name="LibraryPage"
            component={LibraryPage}
          />
          <Stack.Screen
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#ffffff',
            }}
            name="InfoPage"
            component={InfoPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  capture: {
    flex: 0,
    padding: 5,
    alignSelf: 'center',
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipBtn: {
    flex: 0,
    padding: 5,
    alignSelf: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929',
  },
});
