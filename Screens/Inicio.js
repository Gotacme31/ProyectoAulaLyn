import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { saveTask } from "../api";
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

const Inicio = ({ navigation }) => {
  
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],     
      androidClientId:'203051124108-jfpvdl3pofio5parui4hsd195ue4b9jd.apps.googleusercontent.com'
    });
  },[])
 const [user, setUser] = useState(null);

 const signIn = async () => {
   try {
     await GoogleSignin.hasPlayServices();
     navigation.navigate("confirmacion");
     const userInfo = await GoogleSignin.signIn();
     setUser(userInfo);
     console.log(userInfo);
   } catch (error) {
     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       // El usuario canceló el proceso de autenticación
     } else if (error.code === statusCodes.IN_PROGRESS) {
       // El proceso de autenticación ya está en curso
     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
       // Los servicios de Google Play no están disponibles
     } else {
       // Otro error ocurrió
     }
   }
 };

 useEffect(() => {
   // Comprueba si el usuario ya ha iniciado sesión al cargar la aplicación
   const checkLoggedIn = async () => {
     const isLoggedIn = await GoogleSignin.isSignedIn();
     if (isLoggedIn) {
       const userInfo = await GoogleSignin.getCurrentUser();
       setUser(userInfo);
     }
   };
   checkLoggedIn();
 }, []);
      
    return(
    <View style={styles.container}>
       
          <Image 
            style={styles.imagen}
            source={require('../img/lynya.png')}
          />
         
      <View>
            
        <Text style={styles.titulo}>LYN</Text>
      <TouchableOpacity onPress={signIn} >
      <Image style={styles.boton}
            source={require('../img/BOTON.png')}
          />
      </TouchableOpacity>
      <Image 
        style={styles.image}
        source={require('../img/ztar.png')}
      />
      </View>
     
    </View>
  );
}
//#fad5d5

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
  gradiente: {
    // flex: 1,
    width: '100%',
    alignItems:'center'
    },
  
  titulo:{
    marginLeft:50,
    marginTop:40,
    marginBottom:50,
    fontSize: 60,
    color: 'black',
    fontFamily:'TTF'
  },
  enviar:{
    fontSize: 40,
    textAlign: 'center',
    margin:3,
    width: '60%'
  },
  contenedor:{
    alignItems: 'center',
    width:250,
    marginTop:20,
    borderRadius: 22,
    backgroundColor: 'black'
  },
    text:{
    fontSize:23,
    color: 'gray',
    color: 'white'
  },
  imagen: {
    //marginLeft:20,
    marginLeft:0,
    width: 100,
    height:100,
    marginTop:80,
    marginBottom:80
  },
  image:{
    alignItems:'center',
    marginTop: 200,
    width:90,
    height:90,
    marginLeft:60
  },
  boton:{
    marginTop:50,
    width:200,
    height:50
  }
});
export default Inicio;
