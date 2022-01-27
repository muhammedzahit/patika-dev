import React from "react";
import styles from "./AddToDoBarStyle"
import {View,  Button, TextInput, TouchableOpacity } from "react-native"

const AddToDoBar = props => {

    const changeTextFunc = (text) => {
        props.setText(text)
    }

    return (
        <View style = {styles.container}> 
            <TextInput style={styles.textInput} placeholder="To Do ..." onChangeText={changeTextFunc}>

            </TextInput>
            <Button title="Add To Do" onPress={props.onPressButton}>
            </Button>
        </View>
    )
}

export default AddToDoBar