import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PhotoI, useQuery, useRealm} from '../models/Photo';
import {Dimensions} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const LibraryPage = ({navigation}: any) => {
  const realm = useRealm();
  const result = useQuery('PhotoI');
  console.log(result);

  const [images, setImages] = React.useState<{uri: string}[]>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  const [visible, setIsVisible] = React.useState<boolean>(false);

  const [imgIndex, setImgIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const temp: {uri: string}[] = [];
    result.forEach((item: any) => {
      console.log(item.path);
      temp.push({uri: `file://` + item.path});
    });
    setImages(temp);
    setLoading(false);
    console.log(temp);
  }, []);
  console.log('nhan ve images', images);
  const selectItem = ({item, index}: any) => {
    console.log(item);
    // navigation.push('InfoPage', {_id : item._id, note: item.note, path: item.path, createAt: item.createAt})
    console.log('nhan ve ', index);
    setImgIndex(index);
    setIsVisible(true);
  };

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      onPress={() => selectItem({item, index})}
      style={{margin: 5}}>
      <Image
        style={{
          width: windowWidth / 4 + 20,
          height: windowWidth / 4 + 20,
          opacity: 0.85,
        }}
        source={{uri: `file://` + item.path}}></Image>

      {/* <Text>{item.note}</Text> */}
    </TouchableOpacity>
  );

  const renderFooter = (currentImage: any) => {
    console.log('cuurent footer', currentImage);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={styles.btnFooter}>
          <TouchableOpacity style={styles.buttonSmall}>
            <Icon name="trash-o" size={25} color="#ffffff"></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.btnFooter}>
          <TouchableOpacity style={styles.button}>
            <Icon name="eye" size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <>
          <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          />
          <ImageView
            images={images}
            imageIndex={imgIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
            FooterComponent={renderFooter}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnFooter: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default LibraryPage;
