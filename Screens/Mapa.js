import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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

function App({navigation}){
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
 
  const recognizeTextFromImage = async (path) => {
    try {
      const texto = await TextRecognition.recognize(path);
      let recognizedText = texto.join(" ");
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
  const speakinGreeting = () =>{
    
    navigation.navigate("voz");
   }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
              speakinGreeting();
            }}>
          <Image 
        style={styles.image}
        source={require('../img/lyn.png')}/>
          </TouchableOpacity>
      <Image 
        style={styles.imag}
        source={require('../img/lynya.png')}/>
      <View style={styles.options}>
        <View style={styles.button}>
          
          <TouchableOpacity onPress={() => {
              recognizeFromCamera();
            }}>
          <Image 
        style={styles.image}
        source={require('../img/botcamara.png')}/>
          </TouchableOpacity>
        </View>
        
      </View>
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.imagen} source={imgSrc} />
        </View>
      )}
       <TouchableOpacity onPress={() => {
              recognizeFromPicker();
            }}>
          <Image 
        style={styles.image}
        source={require('../img/bgaler.png')}/>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    justifyContent: 'center',
    alignItems: 'center',
    border:20
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
  text:{
    color:'black',
  },
  
  image:{
    width:300,
    marginTop:60,
    marginBottom:60,
    height:60,
  },
  imag:{
    width:40,
    height:40
  }
});

export default App;