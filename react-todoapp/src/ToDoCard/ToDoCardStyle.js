import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text : {
        fontSize : 16
    },
    container : {
        margin : 10,
        flexDirection : "row",
        flexGrow : 1,
        justifyContent : 'space-between'
    },
    text_stretched : {
        fontSize : 16,
        textDecorationLine : 'line-through'
    }
})

export default styles;