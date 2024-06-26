import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Inicio from '../Screens/Inicio.js';
import Confirmacion from '../Screens/Confirmacion.js';
import Mapa from '../Screens/Mapa.js';
import VoiceToTextButton from '../Screens/VoiceToTextButton.tsx';
import Perfil from '../Screens/Perfil.js';
import Habla from '../Screens/Habla.js';
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inicio"
        component={Inicio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="confirmacion"
        component={Confirmacion}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="habla"
        component={Habla}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mapa"
        component={Mapa}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="voz"
        component={VoiceToTextButton}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="perfil"
        component={Perfil}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
