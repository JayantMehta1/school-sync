import styles from './EnrollScreen.style';
import React, { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import fire from '../fire'

function EnrollScreen({ navigation }) {
    const [classID, setClassID] = useState("");

    // .currentUser doesn't return classroom here?
    const user = fire.auth().currentUser;
    const usersRef = fire.firestore().collection('users')
    const classesRef = fire.firestore().collection('classes')

    const joinClassPressed = () => {
        classesRef.where('classID', '==', classID).get().then(snapshot => {
            // When classroom exists,
            if(!snapshot.empty) {
                usersRef.doc(user.uid).update({
                    classroom: [classID]
                }).then(() => {
                    usersRef.doc(user.uid).get().then(userReturned => {
                        const updatedUser = userReturned.data()
                        navigation.navigate("Dashboard", {updatedUser});
                    })
                })

            } else {
                alert("Class ID not found! Please try again.")
            }
        })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../res/calendar.png')} 
                    style={{height: 100, width: 100}}
                />
                <Text style={styles.welcomeMessage}>Name of App</Text>
                <Text style={styles.signInMessage}>Sign up here! :)</Text>
            </View>
            <KeyboardAvoidingView 
                style={styles.fieldContainer}
                behavior='padding'
            >
                <TextInput
                    style={styles.inputField}
                    placeholder={"Enter Class ID"}
                    defaultValue={classID}
                    value={classID}
                    onChangeText={value => setClassID(value)} 
                    autoCapitalize="none"
                    />

                <View style={styles.credentialButtons}>
                    <TouchableOpacity style={styles.login} onPress={() => joinClassPressed()}>
                        <Text style={styles.loginText}>Join Class</Text>
                    </TouchableOpacity>  
                    <View style={styles.registerUserContainer}>
                        <Text style={styles.newUserText}>
                            Done Joining classes? 
                        </Text>
                        <View style={{width: '1.5%'}}></View>
                        <Text style={styles.signInText} onPress={() => navigation.navigate("Dashboard")}>
                            Go to Dashboard
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default EnrollScreen;