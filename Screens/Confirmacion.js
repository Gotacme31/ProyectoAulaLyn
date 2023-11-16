import  React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image,Button, Icon, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
import auth from '@react-native-firebase/auth';

export default function Confirmacion({navigation}){

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

   const speakinGreeting = () =>{
    const greeting = 'axel es gay';
    Tts.speak(greeting);
    navigation.navigate("mapa");
   }
    return(
    <View style={styles.container}>
      
      <TouchableOpacity onPress={()=> speakinGreeting()} >
          <Image 
            style={styles.imagen}
            source={require('../img/lynya.png')}
          />
          <Text style={styles.titulo}>BIENVENIDO </Text>
      <View>
      <Image 
        style={styles.image}
        source={require('../img/ztar.png')}
      />
      </View>
      </TouchableOpacity>
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems:'center'
    },
  boton:{
    fontSize: 27,
    textAlign: 'center',
    margin:5,
    color:'white'
  },
  titulo:{
    marginLeft:20,
    marginTop:70,
    fontSize: 50,
    color: 'black',
    marginBottom: 50
  },
  texto:{
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    marginTop: 130,
    color: '#000000',
    backgroundColor: '#F0D5FA',
    borderRadius: 25,
    marginBottom: 40
  },
  contenedor:{
    alignItems: 'center',
    flex:1,
    width:'80%',
    marginTop:50
  },
  text:{
    fontSize:23,
    color: 'gray',
    color: 'white'
  },
  imagen:{
    marginLeft:90,
    width: 100,
    height:100,
    marginTop:130,
    marginBottom:60
  },
  image:{
    marginLeft:100,
    marginTop: 265,
    width:90,
    height:90
  }
});
