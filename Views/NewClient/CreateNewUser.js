import React from 'react'
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native"
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase/firebase.config'

const CreateNewUser = ({navigation, route}) => {

    const defaultURL = "https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1"

    const [textName, onChangeNameText] = React.useState("");
    const [textMail, onChangeMailText] = React.useState("");
    const [textPhone, onChangePhoneText] = React.useState("");
    const [textURL, onChangeURLText] = React.useState(defaultURL);

    async function AddUser() {
        await addDoc(collection(db, route.params.idUser), {
            name: textName,
            email: textMail,
            phone: textPhone,
            pictureURL: textURL
        }).then(() => {
            navigation.navigate("Users List")
        }).catch((error) => {
            alert(error.message)
        });
    }

    function ButtonSave() {
        if (   textName.length == 0 
            || textMail.length == 0
            || textPhone.length == 0) {
            alert('Os campos, email e telefone são obrigatório')
            return
        }
        AddUser()
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeNameText}
                value={textName}
                placeholder="Nome do Cliente"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeMailText}
                value={textMail}
                placeholder="E-Mail do Cliente"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangePhoneText}
                value={textPhone}
                placeholder="Telefone do Cliente"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeURLText}
                placeholder="Selfie do Cliente"/>
            <Pressable 
                style={styles.buttonSave}
                onPress={() => ButtonSave()}>
                <Text style={styles.textButton}>Salvar Cliente</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonSave: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1ecfea',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});

export default CreateNewUser