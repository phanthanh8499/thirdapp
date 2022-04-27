import * as React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const InfoPage = ({navigation, route}: any) => {
  const [data, setData] = React.useState<any>({
    _id: '',
    note: '',
    path: '',
    createAt: '',
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    console.log(route.params._id);
    console.log(route.params.note);
    console.log(route.params.path);
    console.log(route.params.createAt);
    setData({
      _id: route.params._id,
      note: route.params.note,
      path: `file://` + route.params.path,
      createAt: route.params.createAt,
    });
    setLoading(false);
  }, []);

  console.log('nhan', data);
  return (
    <View style={{width: '100%', height: '100%', flexDirection: 'column'}}>
      {/* <Image source = {{uri : ``}} */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <View style={{flex: 9, width: '100%', height: '100%'}}>
            <Image
          source={{uri: data.path}}
          resizeMode="center"
          style={{ width: '100%', height: '100%'}}></Image>
        </View>
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Text>abc</Text>
        </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoPage;
