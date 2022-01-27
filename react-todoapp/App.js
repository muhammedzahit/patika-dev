import React, { useState } from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AddToDoBar from './src/AddToDoBar'
import ToDoCard from './src/ToDoCard';


const App = () => {
  const [toDoBarText, SetToDoBarText] = useState(0);
  const [toDoList, setToDoList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [id_counter, setIdCounter] = useState(1);
  
  const toDoFunc = () => {
    let a = toDoList.slice();
    setIdCounter(id_counter + 1)
    console.log(id_counter)
    a.push({
      text : toDoBarText,
      isDone : false,
      id : id_counter
    });
    setCounter(counter + 1);
    setToDoList(a)
  }
  

  const deleteWork = (id_, counterFlag) => {
    console.log("sdfksofk")
    let a = toDoList.slice();
    let index = a.findIndex(x => x.id === id_)
    a.splice(index, 1);
    setToDoList(a);
    if(!counterFlag)
      setCounter(counter - 1);
  }

  const renderFunc = ({item}) => <ToDoCard text={item.text} isDone={item.isDone}
   delete_func={deleteWork}  id_ = {item.id}  setCounter = {() => setCounter(counter-1)}/>

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header_container}>
        <Text style={styles.header_text}>YAPILACAKLAR</Text>
        <Text style={styles.counter_text}>{counter}</Text>
      </View>
      <View style={styles.to_do_container}>
        <FlatList
          data={toDoList}
          renderItem={renderFunc}
        >
        </FlatList>
      </View>
      <View style = {styles.add_to_do}>
        <AddToDoBar setText = {SetToDoBarText} onPressButton = {toDoFunc}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_container: {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-between',
    padding : 10
  },
  header_text: {
    marginRight : 25,
    fontSize : 24,
    fontWeight : 'bold',
    fontFamily : 'dancing',
    color : '#4f0516',
  },
  counter_text : {
    fontSize : 16,
    paddingTop : 5,
    fontWeight : 'bold',
  },
  container: {
    flex : 1,
  },
  to_do_container: {
    flex : 4,
  },
  add_to_do : {
    flex : 1,
    marginBottom : 30,
  },
  to_do_text:{
    textDecorationLine : 'line-through'
  },
  touchable: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
}
});

export default App;
