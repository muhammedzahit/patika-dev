import { StyleSheet, Dimensions } from "react-native"

ss = StyleSheet.create({
    images : {
        width : Dimensions.get('window').width / 2,
        height : Dimensions.get('window').height / 6
    },
    header_text : {
        fontSize : 12,
    }
})

export default ss;