import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Imagen extends Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <Image style={styles.imagen}
             source={IMAGENES[this.props.numFallos.toString()]} />
    );
  }
}

const styles = StyleSheet.create({
  imagen: {
    flex: 1,
    width: undefined, 
    height: undefined, 
    resizeMode: 'contain',
    margin: 20,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'blue'
  }
});

const IMAGENES = {
  '0': require('./Imagenes/0.png'),
  '1': require('./Imagenes/1.png'),
  '2': require('./Imagenes/2.png'),
  '3': require('./Imagenes/3.png'),
  '4': require('./Imagenes/4.png'),
  '5': require('./Imagenes/5.png'),
  '6': require('./Imagenes/6.png'),
};