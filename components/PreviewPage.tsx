import {transform} from '@babel/core';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot, {captureRef} from 'react-native-view-shot';

import RNFetchBlob from 'rn-fetch-blob';
import {Photo, useQuery, useRealm} from '../models/Photo';
// import { MyPicture, useQuery, useRealm } from '../models/Photo';

// import {NativeModules} from 'react-native';
// const RNFetchBlob = NativeModules.RNFetchBlob

const formatDate = (timestamp: number) => {
  var date = new Date(timestamp);
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
};

const PreviewPage = ({navigation, route}: any) => {
  const [data, setData] = React.useState<string>(
    'https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif',
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [text, onChangeText] = React.useState<string>('');
  const [textDisplay, setTextDisplay] = React.useState<string>('');
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<number>(0);

  const realm = useRealm();
  const result = useQuery('Photo');
  // let realm = Realm()

  // realm.deleteAll()

  console.log('ket qua', result.length);
  console.log('ket qua', result);
  // console.log("????");
  // console.log("key qua", result);

  React.useEffect(() => {
    setData(route.params.imgUri);
    setDate(route.params.date);
    // var date = new Date();
    // setDate(date.getTime());
    // setData('file:///storage/emulated/0/Pictures/myfolder/1650956705879.jpg');
    // setData('file:///data/user/0/com.thirdapp/cache/ReactNative-snapshot-image2570905698866786126.jpg');
    setLoading(false);
  }, []);

  const viewShotRef: any = React.useRef();

  const savePhoto = async () => {
    try {
      let exist = await RNFetchBlob.fs.exists(
        `/storage/emulated/0/Pictures/myfolder`,
      );

      if (!exist)
        await RNFetchBlob.fs.mkdir(`/storage/emulated/0/Pictures/myfolder`);

      var sec = new Date().getTime();

      exist = await RNFetchBlob.fs.exists(`${data}`);

      if (exist) {
        const img = await captureRef(viewShotRef, {
          format: 'jpg',
          quality: 0.8,
        });

        await RNFetchBlob.fs.mv(
          img.replace('file://', ''),
          `/storage/emulated/0/Pictures/myfolder/${sec}.jpg`,
        );

        console.log('Da move');
        Alert.alert('Lưu ảnh thành công');

        var path = `/storage/emulated/0/Pictures/myfolder/${sec}.jpg`;
        console.log('path: ', path);
        console.log('date: ', new Date(date));
        console.log('note: ', textDisplay);
        try {
          realm.write(() => {
            realm.create(
              'Photo',
              new Photo({
                note: textDisplay,
                path: path,
                createAt: new Date(date),
              }),
            );
          });
          console.log('write thanh cong');
        } catch (e) {
          console.log(e);
        }
        navigation.goBack();
      }
    } catch (e) {
      console.error('takePicture e: ', e);
    }
  };

  const onCapture = (uri: any) => {
    console.log('do something with ', uri);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={100}></ActivityIndicator>
      ) : (
        <>
          <View
            style={{width: '100%', height: '100%', flexDirection: 'column'}}>
            <ViewShot
              ref={viewShotRef}
              options={{format: 'jpg', quality: 0.9}}
              style={{flex: 9, backgroundColor: '#ffffff', width: '100%'}}>
              <View style={{flex: 9}}>
                <Image
                  source={{uri: data}}
                  style={{width: '100%', height: '100%'}}></Image>
              </View>
              <View style={{position: 'relative', flexDirection: 'row'}}>
                <View style={{flex: 4, marginLeft: 5}}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{position: 'absolute', bottom: 5}}>
                    <Text
                      style={{color: '#ffffff', fontSize: 16}}
                      numberOfLines={2}>
                      {textDisplay}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 2, alignItems: 'flex-end', marginRight: 5}}>
                  <Text
                    style={{
                      color: '#ffffff',
                      position: 'absolute',
                      bottom: 5,
                      fontSize: 16,
                    }}>
                    {formatDate(date)}
                  </Text>
                </View>
              </View>
            </ViewShot>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'black',
              }}>
              <View
                style={{
                  flex: 3,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.buttonSmall}
                  onPress={() => setModalVisible(true)}>
                  <Icon name="pencil" size={25} color="#ffffff"></Icon>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity style={styles.button} onPress={savePhoto}>
                  <Icon name="check" size={25} color="white"></Icon>
                </TouchableOpacity>
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>GHI CHÚ</Text>
                  <TextInput
                    style={{
                      marginVertical: 10,
                      color: '#3b3b3b',
                      borderWidth: 1,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                      padding: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    onChangeText={onChangeText}
                    placeholder="Nhập vào ghi chú"
                    placeholderTextColor="#b3b5b4"
                    value={text}
                  />
                  <Pressable
                    style={styles.modalBtn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setIsEdit(true);
                      setTextDisplay(text);
                      console.log(text);
                    }}>
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmall: {
    borderWidth: 1,
    borderColor: '#292929',
    backgroundColor: '#292929',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    // backgroundColor: "white",
    width: '80%',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalBtn: {
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignSelf: 'flex-end',
    padding: 5,
    width: 50,
    alignItems: 'center',
  },
  textStyle: {},
});

export default PreviewPage;
