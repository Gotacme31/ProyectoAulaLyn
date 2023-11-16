import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

function Perfil({navigation}) {
  const [user, setUser] = useState(auth().currentUser);
 
  const logout = () => {
    auth()
      .signOut()
      .then(() => alert('Cerraste sesión!'));
      navigation.navigate('inicio')
  };
  const speakinGreeting = () => {
    navigation.navigate('mapa');
  };
  return (
    <View
      style={{
        alignItems: 'center'
      }}>
         <View
        style={{
          backgroundColor: 'black',
          width: '20%',
          height: '5%',
          marginTop: 10,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "center"
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
            source={require('../img/inicio.jpg')}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          marginTop: 120,
        }}>
        PERFIL
      </Text>
      <View
        style={{
          width: 85,
          height: 85,
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 80,
          marginTop: 60,
        }}>
        <Image
          source={
            user.photoURL ? {uri: user.photoURL} : require('../img/usuario.png')
          }
          style={{
            width: 80,
            height: 80,
            borderRadius: 75
          }}
        />
      </View>
     
      <Text
        style={{
          color: 'black',
          fontSize: 27,
          marginTop:20
        }}>
        {user.email}
      </Text>
     
      <View style={{
        marginTop:250,
        marginBottom:25
      }}>
      <TouchableOpacity
          style={{
            width: '57%',
            height: 70,
            flexDirection: "row",
            justifyContent: 'center',
            backgroundColor:'black',
            alignItems: 'center',
            borderRadius:50
          }}
          onPress={() => {
            logout();
          }}>
            <View style={{
                width: 50,
                height:50,
                backgroundColor: 'white',
                borderRadius:25,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight:10
            }}>
          <Image
            style={{
             width:40,
             height:40,
             marginLeft:8,
             marginTop:3
            }}
            source={require('../img/out.png')}
          />
          </View>
          <Text style={{
            color:'white',
            fontSize:25,
            marginRight:13
        }}>
            Cerrar sesion
        </Text>
        </TouchableOpacity>
        </View> 
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          marginBottom: 50,
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            marginTop: '5%',
          }}
          source={require('../img/ztar.png')}
        />
      </View>
    </View>
  );
}
export default Perfil;
