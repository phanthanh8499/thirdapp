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

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  // const devices = useCameraDevices();
  // const [device, setDevice] = React.useState(useCameraDevices().back)
  // const device1 = useCameraDevices().back;
  const camera = React.useRef<Camera>(null);
  // const [cameraPosition, setCameraPosition] = React.useState(false);

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [enableHdr, setEnableHdr] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);

  // camera format settings
  const devices = useCameraDevices();
  const device = devices[cameraPosition];


  const [imgUri, setImgUri] = useState<string>('file:///data/user/0/com.thirdapp/cache/mrousavy6585615456484468558.jpg');

  const takePhoto = async (camera: any) => {
    const photo = await camera.current.takePhoto({
      qualityPrioritization: 'quality',
      flash: 'on',
      enableAutoRedEyeReduction: true,
    });
    console.log(photo);
    console.log("path image: ", photo.path);
    setImgUri(`file://` + photo.path)
  };

  // const flipCamera = () => {
  //   setCameraPosition(!cameraPosition)
  // }

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {device != null && hasPermission && (
        <>
          <Camera
            ref={camera}
            style={styles.preview}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.footer}>
            <View style={{flex: 2.5}}>
              <Text></Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => takePhoto(camera)}
                style={styles.capture}>
                <Icon name="camera" size={35} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={{flex: 2.5, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => onFlipCameraPressed()}
                style={styles.flipBtn}>
                <Icon name="refresh" size={25} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <Image
        style={styles.tinyLogo}
        source={{ uri: imgUri}}
      />
        </>
      )}
    </SafeAreaView>
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
    backgroundColor: "#292929",
  },
});
