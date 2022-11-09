import React from 'react'
import { FlatList, View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, QuerySnapshot, setDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.config'
import emptyList from '../../images/ext/rolled_eyes.png'


export default function Home({navigation, route}) {

    const [users, setUsers] = useState([])


    async function listarUser (){
        const colRef = collection(db, route.params.idUser)
       onSnapshot(colRef, (QuerySnapshot) => {
            const users = []
            QuerySnapshot.forEach((doc) => {
                const {name, email, phone, pictureURL} = doc.data()
                users.push({
                    id: doc.id,
                    name, 
                    email, 
                    phone,
                    pictureURL
                })
            })
            setUsers(users)
        })
    }

    useEffect(() => {
        listarUser()
    }, [])

    return (
        <View>
            <Pressable
                style={styles.buttonAdd}
                onPress={() => navigation.navigate('Create New User', {idUser: route.params.idUser})}>
                    <Text style={styles.textButton}>Cadastrar Cliente</Text>
                </Pressable>
            <FlatList 
                style={{height: '100%'}}
                data={users}
                numColumns={1}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{fontWeight: '400'}}>Cadastre Clientes para vê-los aqui! :/</Text>
                        <Image source={emptyList} style={{ width: 100, height: 100, marginTop: 30}} />
                    </View>
                }
                renderItem={({item}) => (
                    <Pressable 
                        style={styles.container} 
                        onPress={() => navigation.navigate('User Details', 
                        {
                            item,
                            idUser: route.params.idUser,
                            name: item.name,
                            phone: item.phone,
                            email: item.email,
                            pictureURL: item.pictureURL
                            })}>
                        <View style={styles.innerContainer}>
                            <Image 
                                source={{uri: item.pictureURL}}
                                style={styles.imagePre}/>
                        </View>
                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemMail}>{item.email}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    empty: {
        padding: 100,
        display: 'flex',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#1ecfea',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    imagePre: {
        width: 50, 
        height: 50, 
        margin: 5,
        resizeMode: 'contain', 
        borderRadius: 50/2,
        marginRight: 20
    },
    itemName: {
        fontWeight: 'bold'
    },
    itemMail: {
        fontWeight: '300'
    }
});