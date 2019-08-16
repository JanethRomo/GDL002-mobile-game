import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import Imagen from './Imagen.js';
import Guiones from './Guiones.js';
import Botonera from './Botonera.js';

export default class Ahorcado extends Component {
  constructor(props){
    super(props);

    this.pushButton = this.pushButton.bind(this);

    let word = this.getWordGuess();

    this.state = {
      rigthNumers: 0,
      numMistakes: 0,
      wordToGuess: word,
      wordToGuessMoment: this.startWordToGuessMoment(word),
      buttons: this.getButtons(),
      modalVisible: false,
      result: ''
    }
  }

  reStart(){
    let word = this.getWordGuess();
    
    this.setState({
      rigthNumers: 0,
      numMistakes: 0,
      wordToGuess: word,
      wordToGuessMoment: this.startWordToGuessMoment(word),
      buttons: this.getButtons(),
      modalVisible: false,
      result: ''
    });
  }

  getButtons(){
    let letters = [ "A", "B", "C", "D", "E", "F", "G", 
                    "H", "I", "J", "K", "L", "M", "N",
                    "Ñ", "O", "P", "Q", "R", "S", "T",
                    "U", "V", "W", "X", "Y", "Z" 
                  ];

    return letters.map((l) => ({ letter: l, estado: 'no-pulse'}));
  }

  getWordGuess(){
    let words = ["BOOTCAMP", "LABORATORIA", "SORORIDAD"];
    return words[Math.floor(Math.random() * words.length)];
  }

  startWordToGuessMoment(word){
    let wordStarting = "";
    for(let i = 0; i < word.length; i++){
      wordStarting += "-";
    }
    return wordStarting;
  }

  pushButton(i){
    
    let buttonsAux = this.state.buttons;
    let lyric = buttonsAux[i].lyric;

    if(this.isRigth(lyric)){
      buttonsAux[i].estado = "pulse-rigth";
      this.setState((prevState) => ({
        buttons: buttonsAux
      }));
    } else {
      buttonsAux[i].estado = "pulse-not-rigth";
      this.setState((prevState) => ({
        buttons: buttonsAux,
        numMistakes: ++prevState.numMistakes
      }));
    }
  }

  componentDidUpdate(){
    if(this.state.numMistakes == 6){
      this.setState({
        modalVisible: true,
        result: '¡You Lose!',
        numMistakes: 0
      });
    }

    if(this.state.wordToGuess.length == this.state.rigthNumers){
      this.setState({
        modalVisible: true,
        result: '¡YOU WIN!',
        rigthNumers: 0
      });
    }
  }

  isRigth(lyric){
    let rigth = false;

    for(let i = 0; i < this.state.wordToGuess.length; i++){
      if(lyric == this.state.wordToGuess.substr(i, 1)){
        this.setState((prevState) => ({
          rigthNumers: ++prevState.rigthNumers,
          wordToGuessMoment: prevState.wordToGuessMoment.substr(0, i) +
                                          lyric +
                                          prevState.wordToGuessMoment.substr(i + 1)
        }));
        rigth = true;
      }
    }

    return rigth;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getModal()}
        <View style={styles.imagen}>
          <Imagen numMistakes={this.state.numMistakes}/>
        </View >
        <View style={styles.guiones}>
          <Guiones wordToGuessMoment={this.state.wordToGuessMoment}/>
        </View>
        <View style={styles.botonera}>
          <Botonera buttons={this.state.buttons}
                    pushButton={this.pushButton}/>
        </View>
      </View>
    );
  }

  getModal(){
    return (
      <Modal  animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.reStart();}}>
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <Text style={styles.text}>{this.state.result}</Text>

            <TouchableHighlight onPress={() => { this.reStart(); }}
                                style={styles.button}>
              <Text style={styles.textButton}>Pulsa aquí para jugar otra vez</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'green'
},
imagen: {
  flex: 5,
  justifyContent: 'center',
  backgroundColor: 'white'
},
guiones: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white'
},
botonera: {
  flex: 3,
  justifyContent: 'center',
  backgroundColor: 'black'
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)'
},
innerModalContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  margin: 20
},
button: {
  flexWrap: 'wrap',
  padding: 10,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'blue',
  margin: 20
},
text: {
  fontSize: 20,
  fontWeight: 'bold',
  margin: 20
},
textButton: {
  fontSize: 20,
  color: 'white'
}

});