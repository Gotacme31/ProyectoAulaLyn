import React, {useState,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Tts from 'react-native-tts';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function Habla({navigation}) {
  
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const speakk = async path => {
        try {
          Tts.speak(text);
        } catch (err) {
          console.error(err);
          setText('');
        }
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
            navigation.navigate("voz")
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
            navigation.navigate("perfil")
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
        <TouchableOpacity style={{
          width: 35,
          height: 35
        }} onPress={() => {
          navigation.navigate("mapa")
        }}>
          <View style={{
            width:35,
            height: 35,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:15
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
            }}
            source={require('../img/texto.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styles.imag} source={require('../img/lynya.png')} />
      <Text
            style={{
              color: 'black',
              fontSize: 23,
              fontWeight: 'bold'
            }}>
            Ingresa lo que quieres reproducir
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 17,
              marginBottom: 10,
              backgroundColor: '#E1E1E1',
              width: '80%',
              borderRadius: 20,
              marginTop:30
            }}
            ref={inputRef}
                onChangeText={setText}
            
          />
      <View style={styles.container}>
     
           <TouchableOpacity
            onPress={speakk}
            style={{
              borderColor: 'black',
              backgroundColor: 'black',
              width: '30%',
              marginTop: 30,
              height: 42,
              borderRadius: 25,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                marginTop: 3,
              }}>
              Hablar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{inputRef.current.clear();}}
            style={{
              borderColor: 'black',
              backgroundColor: 'black',
              width: '45%',
              marginTop: 30,
              height: 42,
              borderRadius: 25,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                marginTop: 3,
              }}>
              Borrar texto 
            </Text>
          </TouchableOpacity>
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
            borderRadius:50,
            marginTop:100
          }}>
          <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold',}}>S T O P </Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{
          width: 80,
          height: 80,
          marginTop:50
        }}
        source={require('../img/ztar.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   width:'100%',
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
    marginBottom:100
  },
});

export default Habla;
