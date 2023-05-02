import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

function VoiceTest(): JSX.Element {
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

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Started: ${state.started}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${state.recognized}`}</Text>
      <Text style={styles.stat}>{`Pitch: ${state.pitch}`}</Text>
      <Text style={styles.stat}>{`Error: ${state.error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {state.results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>Partial Results</Text>
      {state.partialResults.map((result, index) => {
        return (
          <Text key={`partial-result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>{`End: ${state.end}`}</Text>
      <TouchableHighlight onPress={_startRecognizing}>
        <Text style={styles.play}>xd</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_stopRecognizing}>
        <Text style={styles.action}>Stop Recognizing</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_cancelRecognizing}>
        <Text style={styles.action}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_destroyRecognizer}>
        <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  play: {
    color: '#1be90c',
  },
});
export default VoiceTest;