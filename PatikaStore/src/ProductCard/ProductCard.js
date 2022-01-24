import React from "react";
import { Text , Image, View} from "react-native";
import ss from './ProductCardStyle.js'

const ProductCard = ({title, imgURL, price, inStock}) => {
    const checked_title = checkTitle(title)
    return(
    <View>  
        <Image 
        style={ss.images}
        source={{uri : imgURL }} 
        ></Image>
        <Text style={ss.header_text}>{checked_title}  </Text>
        <Text>{price}</Text>
        <Text>{inStock}</Text>
    </View>)
}

const checkTitle = (title) => {
    if(title.length > 24){
        let a = 24
        while(a < title.length){
            title = title.substring(a - 24,a) + "\n" + title.substr(a)
            a += 24
        }
            
    }
    return title
}

export default ProductCard;