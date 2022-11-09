import React, {useState} from 'react'
import {View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Register({navigation}){

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')


  const [errorRegister, setErrorRegister] = useState('')


      const registerFirebase = () =>{
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate('Users List', {idUser: user.uid})
                // ...
            })
            .catch((error) => {
                setErrorRegister(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
          }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
      <Text style={styles.title}>MeuCliente</Text>
      <TextInput
      placeholder='Email'
      style={styles.input}
      type="email"
      onChangeText={(text) => setEmail(text)}
      value={email}
      />
      <TextInput
      placeholder='Senha'
      style={styles.input}
      type="password"
      secureTextEntry={true}
      onChangeText={(text) => setSenha(text)}
      value={senha}
      />
      {
        errorRegister === true
        ?
        <View style={styles.contentAlert}>
          <MaterialCommunityIcons
          name="alert-circle"
          size={24}
          color="#bdbdbd"
          />
          <Text style={styles.waningAlert}>Já existe um e-mail cadastrado</Text>
          </View>
          :
          <View>

          </View>
      }
      {
        email === "" || senha === ""
        ?
        <TouchableOpacity
        disable={true}
        style={styles.btnLogin}
        >
          <Text style={styles.textLogin}>Registrar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
        disable={true}
        style={styles.btnLogin}
        onPress={registerFirebase}
        >
          <Text style={styles.textLogin}>Registrar</Text>
        </TouchableOpacity>

      }
      <Text style={styles.textForgot}
       onPress={()=> navigation.navigate("Login")}
      >
        Já possui conta? Faça Login
        <Text
        style={styles.linkSubscriber}
        >

        </Text>
      </Text>
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: Platform.OS === "ios" ? 0 : 50,

  },
  title: {
    fontSize: 60,
    color: "blue",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    width: 300
  },
  btnLogin: {
    width: 200,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9,
    elevation: 20,
    backgroundColor: '#1ecfea',
  },
  textLogin: {
      fontSize: 16,
      color: "white",
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
});