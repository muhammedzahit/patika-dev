import React, { useState } from 'react';
import { View , Text} from 'react-native';
import styles from './ToDoCardStyle';
import { Icon } from 'react-native-elements';


const ToDoCard = props => {
  const [isDone, setIsDone] = useState(props.isDone)
  const [textStyle, setTextStyle] = useState(styles.text)

  const checkTextStretched = () => {
    if(textStyle != styles.text)
      return true
    return false
  }

  const textPressed = () => {
    console.log(textStyle)
    if(!checkTextStretched()){
      setTextStyle(styles.text_stretched)
      props.setCounter()
    }
    
      
  }

  return (
    <View style={styles.container}>
      <Text onPress={textPressed}
        style={textStyle}>
        {props.text}
      </Text>
      <Icon onPress = {() => props.delete_func(props.id_, checkTextStretched())}
          name='check' />
    </View>
  );    
};

export default ToDoCard;
