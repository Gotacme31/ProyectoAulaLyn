import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-ES');
    } catch (error) {
      console.log(error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const onSpeechRecognized = (event) => {
    setRecognizedText(event.value);
  };

  Voice.onSpeechRecognized = onSpeechRecognized;

  return (
    <View>
      <Button title={isListening ? 'Stop listening' : 'Start listening'} onPress={isListening ? stopListening : startListening} />
      <Text color='black'>{recognizedText}</Text>
    </View>
  );
};

export default App;
