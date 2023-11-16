import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import Tts from 'react-native-tts';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function App({navigation}) {
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  const width = Dimensions.get('window').width;

  const recognizeTextFromImage = async path => {
    try {
      const texto = await TextRecognition.recognize(path);
      let recognizedText = texto.join(' ');
      console.log(recognizedText);
      Tts.speak(recognizedText);
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('');
    }
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };
  const speakinGreeting = () => {
    navigation.navigate('voz');
  };
  const speakin = () => {
    navigation.navigate('perfil');
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: 'black',
          width: '60%',
          height: '6%',
          marginTop: 9,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
          }}
          onPress={() => {
            speakinGreeting();
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
            }}
            source={require('../img/micro.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            
          }}
          onPress={() => {
            speakin();
          }}>
            <View style={{
            width:38,
            height: 38,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:20
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
            }}
            source={require('../img/usuario.png')}
          />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            marginBottom:4
          }}
          onPress={() => {
            navigation.navigate("habla")
          }}>
            <View style={{
            width:38,
            height: 38,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:20
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
            }}
            source={require('../img/habla.png')}
          />
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styles.imag} source={require('../img/lynya.png')} />
      <View style={styles.container}>
        {imgSrc && (
          <View style={styles.imageContainer}>
            <Image style={styles.imagen} source={imgSrc} />
          </View>
        )}
        <View style={styles.options}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                recognizeFromCamera();
              }}
              style={{
                backgroundColor:'black',
                width: 260,
                height:50,
                borderRadius:30,
                justifyContent: 'space-between',
                flexDirection:'row',
                alignItems:'center',
                padding:8,
                marginBottom:30
              }}>
              <Text style={{
                color:'white',
                fontSize:28,
                marginLeft:7
              }}>CÁMARA</Text>
               <View style={{
            width:37,
            height: 37,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:18
          }}>
              <Image style={{
                width:28,
                height:28,
              }} source={require('../img/camara.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            recognizeFromPicker();
          }} style={{
            backgroundColor:'black',
            width: 260,
            height:50,
            borderRadius:30,
            justifyContent: 'space-between',
            flexDirection:'row',
            alignItems:'center',
            padding:8,
            marginBottom:30
          }} >
           <Text style={{
                color:'white',
                fontSize:28,
                marginLeft:7
              }}>GALERIA</Text>
               <View style={{
            width:37,
            height: 37,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:18
          }}>
              <Image style={{
                width:30,
                height:30,
              }} source={require('../img/texto.png')} />
              </View>
        </TouchableOpacity>
        <View style={{
          width:106,
          height:106,
          borderRadius:55,
          backgroundColor:'black',
          justifyContent: 'center',
          alignItems:'center',
          marginTop:20,
        }}>
        <TouchableOpacity
          onPress={() => {
            Tts.stop();
          }}
          style={{
            backgroundColor: 'red',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:50
          }}>
          <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold',}}>S T O P </Text>
        </TouchableOpacity>

        </View>
      </View>
      <Image
        style={{
          width: 80,
          height: 80,
        }}
        source={require('../img/ztar.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  imagen: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
  },

  image: {
    width: 300,
    marginTop: 10,
    marginBottom: 30,
    height: 60,
  },
  imag: {
    width: 55,
    height: 55,
    marginTop: 60,
  },
});

export default App;
