import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/theme";


const Buttons = ({ onToggle }) => {
  const [activeTab, setActiveTab] = useState('About');

  const handlePress = (tab) => {
    setActiveTab(tab);
    onToggle(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeTab === 'About' && styles.activeButton]}
        onPress={() => handlePress('About')}
      >
        <Text style={[styles.text, activeTab === 'About' && styles.activeText]}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeTab === 'Menu' && styles.activeButton]}
        onPress={() => handlePress('Menu')}
      >
        <Text style={[styles.text, activeTab === 'Menu' && styles.activeText]}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeTab === 'Review' && styles.activeButton]}
        onPress={() => handlePress('Review')}
      >
        <Text style={[styles.text, activeTab === 'Review' && styles.activeText]}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    marginTop: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.lightWhite,
  },
  activeButton: {
    backgroundColor: COLORS.dark,
  },
  text: {
    fontSize: 14,
    color: COLORS.gray,
  },
  activeText: {
    color: COLORS.white,
  },
});
