import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomBtn = ({onPress, text, type = 'primary', bgColor, fgColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },

  container_Teritiary: {},

  container_Secondary: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  container_primary: {
    backgroundColor: '#3B71F3',
    shadowColor: 'black',
    elevation: 5,
  },

  text_primary: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_Teriiary: {
    color: 'gray',
  },

  text_Secondary: {
    color: 'gray',
  },
});

export default CustomBtn;
