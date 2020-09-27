import styles from './EnrollScreen.style';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, SafeAreaView, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


function RegisterScreen({ navigation }) {
    const [classID, setClassIDname] = useState("");
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>  
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
                    onChangeText={classID => setClassID(classID)} 
                    autoCapitalize="none"
                    />

                <View style={styles.credentialButtons}>
                    <TouchableOpacity style={styles.login} onPress={() => {
                        console.log(classID)
                        navigation.navigate("RegisterOptions")}}>

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

        </ScrollView>
</SafeAreaView>
    );
}

export default RegisterScreen;