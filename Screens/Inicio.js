import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Tts from 'react-native-tts';

const Section = ({children, title}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {children}
      <Text
        style={{
          color: 'black',
          fontSize: 22,
          marginTop: 25,
        }}>
        {title}
      </Text>
    </View>
  );
};

const Inicio = ({navigation}) => {
  // En este caso manejo estos 3 estados, initializing, es porque la API de autenticación necesita ser inicializada,
  // por lo que nno sirve de nada mostrar algo cuando no lo esté, user es el que contendrá la sesión tal cual del
  // usuario y userLoginData, es para el formulario de inicio de sesión o registro
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userLoginData, setUserLoginData] = useState({email: '', password: ''});

  // aut necesita un callback que ejecutar cada que cambia el estado de autenticación, en este caso es un simple set
  // al estado user
  const onAuthStateChanged = user => {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    // Esta parte solo debe ejecutarse UNA VEZ, puede tener su propio useEffect o de menos, si lo pones en uno
    // solo recuerda validar con un if para que se ejecute una sola vez
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;

    // Es necesario cerrar el listener de la sesion, en useEffect esto se hace con el return
    // de una función, si necesitas hacer algo más cuando el componente se desmonte, lo que tendrás que hacer es
    // poner el siguiente return
    /*
        return () => {
            subscriber();
            // otros procedimientos para desmontar
        }
        * */
  }, []);

  GoogleSignin.configure({
    webClientId:
      '203051124108-bmrdvfj85i14rtn55dq7a03fh1eoise6.apps.googleusercontent.com',
  });

  // Función para registrar un usuario en Firebase, inicia la sesión automáticamente si el registro fue exitoso
  const registerWithEmailAndPassword = () => {
    auth()
      .createUserWithEmailAndPassword(
        userLoginData.email,
        userLoginData.password,
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        alert(error.code);
        console.error(error);
      });
  };
  // Función para iniciar la sesión de un usuario registrado en firebase
  const loginWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(userLoginData.email, userLoginData.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        alert(error.code);
      });
  };
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      try {
        // Get the users ID token
        console.log('si');
        const user = await GoogleSignin.signIn();
        console.log('no');
        try {
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(
            user.idToken,
          );

          try {
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.error('cuatro', error);
          }
        } catch (error) {
          console.error('tres', error);
        }
      } catch (error) {
        console.error('dos', error);
      }
    } catch (error) {
      console.error('uno', error);
    }
  }
  // Función para cerrar sesión
  const logout = () => {
    auth()
      .signOut()
      .then(() => alert('Cerraste sesión!'));
  };

  if (initializing) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '19%',
      }}>
      {!user ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Image style={styles.imagen} source={require('../img/lynya.png')} />
          <Text
            style={{
              color: 'black',
              fontSize: 40,
              marginBottom: 50,
              alignItems: 'center',
            }}>
            Inicia sesión
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            Ingresa tu correo
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 17,
              marginBottom: 30,
              backgroundColor: 'grey',
              width: '100%',
              borderRadius: 20,
            }}
            textContentType="emailAddress"
            onChangeText={newText =>
              setUserLoginData({
                ...userLoginData,
                email: newText,
              })
            }
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            defaultValue={userLoginData.email}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            Ingresa tu contraseña
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 17,
              marginBottom: 30,
              backgroundColor: 'grey',
              width: '100%',
              borderRadius: 20,
            }}
            textContentType="password"
            onChangeText={newText =>
              setUserLoginData({
                ...userLoginData,
                password: newText,
              })
            }
            secureTextEntry
            defaultValue={userLoginData.password}
          />
          <TouchableOpacity
            onPress={loginWithEmailAndPassword}
            style={{
              borderColor: 'black',
              backgroundColor: 'black',
              width: '100%',
              marginTop: 20,
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
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderColor: 'black',
              width: '100%',
              margin: 20,
              height: 42,
              borderRadius: 25,
            }}>
            <TouchableOpacity
              onPress={registerWithEmailAndPassword}
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 25,
                }}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                await onGoogleButtonPress();
              } catch (error) {
                console.log('btn');
                console.error(error);
              }
            }}
            style={{
              width: '100%',
            }}>
            <Image
              style={{
                width: '100%',
                height: 50,
              }}
              source={require('../img/google.jpg')}
            />
          </TouchableOpacity>

          <Image style={styles.image} source={require('../img/ztar.png')} />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              const greeting =
                'bienvenido a lyn, a continuacion encontrara dos botones, uno es para elegir una imagen, y el otro para abrir la camara';
              Tts.speak(greeting);
              navigation.navigate('mapa');
            }}
            style={{
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              style={{
                width: 65,
                height: 65,
                marginBottom:90
              }}
              source={require('../img/lynya.png')}
            />
            <View
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#000000',
                alignItems: 'center',
                borderRadius: 80
              }}>
              <Image
                source={
                  user.photoURL
                    ? {uri: user.photoURL}
                    : require('../img/usuario.png')
                }
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderColor: 'purple',
                  margin: 6,
                }}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                marginTop:80
              }}>
              Bienvenid@
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                marginBottom: 80,
              }}>
              {user.email}
            </Text>
            {/* <Button title="Cerrar sesión" onPress={logout}></Button> */}
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                marginTop: 20,
                marginBottom: 50,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 60,
                }}
                source={require('../img/ztar.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
//#fad5d5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //   gradient: {
  //     flex: 1,
  //     width: '100%',
  //     alignItems: 'center',
  //   },
  //   gradiente: {
  //     // flex: 1,
  //     width: '100%',
  //     alignItems: 'center',
  //   },

  //   titulo: {
  //     marginLeft: 50,
  //     marginTop: 40,
  //     marginBottom: 50,
  //     fontSize: 60,
  //     color: 'black',
  //     fontFamily: 'TTF',
  //   },
  //   enviar: {
  //     fontSize: 40,
  //     textAlign: 'center',
  //     margin: 3,
  //     width: '60%',
  //   },
  //   contenedor: {
  //     alignItems: 'center',
  //     width: 250,
  //     marginTop: 20,
  //     borderRadius: 22,
  //     backgroundColor: 'black',
  //   },
  text: {
    fontSize: 23,
    color: 'black',
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 80,
  },
  imagen: {
    alignItems: 'center',
    width: 65,
    height: 65,
    marginBottom: 50,
    marginTop: 50,
  },
  boton: {
    marginTop: 50,
    width: 200,
    height: 50,
  },
});
export default Inicio;
