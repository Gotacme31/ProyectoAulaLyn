import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

function VoiceTest({ navigation }): JSX.Element {
  const [state, setState] = useState({
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  });
  useEffect(() => {
    const onSpeechStart = (e: any) => {
      console.log('onSpeechStart: ', e);
      setState({
        ...state,
        started: '√',
      });
    };

    const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
      console.log('onSpeechRecognized: ', e);
      setState({
        ...state,
        recognized: '√',
      });
    };

    const onSpeechEnd = (e: any) => {
      console.log('onSpeechEnd: ', e);
      setState({
        ...state,
        end: '√',
      });
    };

    const onSpeechError = (e: SpeechErrorEvent) => {
      console.log('onSpeechError: ', e);
      setState({
        ...state,
        error: JSON.stringify(e.error),
      });
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
      console.log('onSpeechResults: ', e);
      // @ts-ignore
      setState({
        ...state,
        results: e.value,
      });
    };

    const onSpeechPartialResults = (e: SpeechResultsEvent) => {
      console.log('onSpeechPartialResults: ', e);
      // @ts-ignore
      // @ts-ignore
      setState({
        ...state,
        partialResults: e.value,
      });
    };
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    return () => {
      Voice.removeAllListeners();
    };
  }, []);

  const _startRecognizing = async () => {
    console.log("andale si")
    // setState({
    //   recognized: '',
    //   pitch: '',
    //   error: '',
    //   started: '',
    //   results: [],
    //   partialResults: [],
    //   end: '',
    // });

    try {
      await Voice.start('es-MX');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };


  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
  const speakinGreeting = () => {
    navigation.navigate('mapa');
  };
  const speakin = () => {
    navigation.navigate('perfil');
  };
  return (
    <View style={styles.container}>

      <View
        style={{
          backgroundColor: 'black',
          width: '60%',
          height: '6%',
          marginTop: 9,
          borderRadius: 25,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity style={{
          width: 35,
          height: 35
        }} onPress={() => {
          speakinGreeting();
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
      <View style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        flex:1
      }}>
        
        <Text style={{
          fontSize:30,
          color:'black'
        }}>{`INICIA: ${state.started}`}</Text>
        <View style={{
          height: '42%',
          backgroundColor: 'white',
          width: '100%',
        }}>
          <ScrollView>
          <Text style={styles.stat}>ESCUCHANDO: </Text>
          
        {state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={{color:'black'}}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>RESULTADO: </Text>
        {state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={{color:'black'}}>
              {result}
            </Text>
          );
        })}
       
        </ScrollView>
        </View>
        <View style={{
          backgroundColor: 'black',
          width: '84%',
          height: '16%',
          marginTop: 15,
          borderRadius: 45,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 8,
        }}>
       
        <TouchableOpacity onPress={_stopRecognizing}>
          <View>
          <Text style={styles.action}>TERMINAR </Text>
          <Text style={styles.action}>RECONOCIMIENTO </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={_startRecognizing}>
        <View style={{
            width:81,
            height: 81,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:40
          }}>
          <Image source={require('../img/button.png')}
          style={{
            width:80,
            height: 80,
          }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={_destroyRecognizer}>
          <Text style={styles.action}>DESTRUIR</Text>
        </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 15
  },
  instructions: {
    textAlign: 'center',
    color: 'purple',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: 'black',
    marginBottom:15 ,
    fontSize: 20,
  },
  play: {
    color: '#1be90c',
  },
});
export default VoiceTest;