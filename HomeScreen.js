import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
if(data.status===200){
    return data.json()
}
else{
    return null
}
    })
}
.then((response)=>{
//console.log(response)

var responseObject = response
//var word = responseObject.word
//var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
if(responseObject){
    var wordData = responseObject.definitions[0]
    //console.log(responseObject.definitions[0])
    var definition = wordData.description
    var lexicalCategory = wordData.wordtype 
    //console.log(lexicalCategory)
    this.setState({
        "word":this.state.text,
        "definition":definition,
        "lexicalCategory":lexicalCategory
    })
    }
    else{
        this.setState({
            "word":this.state.text,
            "definition":"Not Found"
        })
    }
})

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
        text: '',
        lexicalCategory: '',
        definition: ''
        }

        <View style={styles.container}>
        <Header>
        backgroundColor={'cyan'}
          centerComponent={{
            text: 'Text to speech converter',
            style: { color: '#fff', fontSize: 20 },
          }}
        </Header>
        <TextInput
        style={styles.inputBox}
        onChangeText={ text => {
        this.state({
        text:text,
        isSearchedPressed: false,
        word : "Loading.....",
        lexicalCategory: "",
        examples: [],
       definition: ''
           });
             }}
       value=(this.state.text)
        />

    <TouchableOpacity
    style={styles.searchButton}
    onPress={ () => {
    this.setState ({isSearchedPressed:true})
    this.getWord(this.state.text)
    }}
    >
    <Text style={{textSize: 18}}>Big Button</Text>
    </TouchableOpacity>
        </View>
    }
    render(){
       
        <View style={styles.detailsContainer}>
       <Text style={styles.detailsTitle}>
       Word: {''}
       </Text>
       <Text style={{fontSize:18}}>
           {this.state.word}
       </Text>
        </View>

      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>
       Type: {''}
       </Text>
      <Text style={{fontSize:18}}>
      {this.state.lexicalCategory}
      </Text>
      </View>

      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
      <Text style={styles.detailsTitle}>
      Definition: {''}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.definition}
      </Text>
      </View>
        
        <View style={styles.outputContainer}>
        <Text style={{fontSize: 20}}>
        {
        this.state.isSearchedPressed && this.state.word === "Loading..."
        ?this.state.word
        :""
        }
      </Text>
      {
          this.state.word!=="Loading..."?
      }
        </View>
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      },
    searchButton: {
        backgroundColor: 'red',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4
    },
    inputBox: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
    },
    detailsContainer: {
        alignSelf: 'center',
        backgroundColor: 'blue',
        width: 100,
        height: 100
    },
    detailsTitle: {
        textAlign:"center",
        color: 'red',
        borderColor: 'green'
    },
    outputContainer: {
        height: 100,
        width: 50
    }
  });
  