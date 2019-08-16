import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';


export default class botonera extends Component {
  constructor(props){
    super(props);
    
  }

  getButtons(){
    return this.props.getButtons.map(
      (button, index) => 
        <TouchableHighlight onPress={() => this.props.pushButton(index)}
                            key={index}
                            underlayColor="white">
          <View style={button.state == "no-pulse" ? 
                          styles.botonNoPulsado : (
                             button.state == "pulse-rigth" ? styles.buttonPulseRigth :
                                                                  styles.buttonNoPulse  )}>
            <Text style={styles.textButton}>{button.word}</Text>
          </View>
        </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.botonera}>
        {this.getButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  botonera: {    
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  botonNoPulsado: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  buttonPulseRigth: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  buttonNoPulse: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textButton: {
    fontSize: 20,
    color: 'white'
  }
});