import { AntDesign, MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const RestaurantManagement = () => {
    const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Restaurant Management Dashboard</Text>

      {/* Restaurant List View */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Restaurant List View')}>
        <MaterialIcons name="restaurant" size={24} color="#333" />
        <Text style={styles.optionText}>Restaurant List View</Text>
      </TouchableOpacity>

      {/* Approval Workflow */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Restaurant List View')}>
        <AntDesign name="checkcircleo" size={24} color="#333" />
        <Text style={styles.optionText}>Approval Workflow</Text>
      </TouchableOpacity>

      {/* Profile Management */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Restaurant List View')}>
        <FontAwesome name="user-circle" size={24} color="#333" />
        <Text style={styles.optionText}>Profile Management</Text>
      </TouchableOpacity>

      {/* Menu Oversight */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Restaurant Menu List View')}>
        <Feather name="menu" size={24} color="#333" />
        <Text style={styles.optionText}>Menu Oversight</Text>
      </TouchableOpacity>

      {/* Status Control */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Restaurant Status')}>
        <MaterialIcons name="settings" size={24} color="#333" />
        <Text style={styles.optionText}>Status Control</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row', // Align the icon and text horizontally
    alignItems: 'center', // Center items vertically
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10, // Add space between icon and text
  },
});

export default RestaurantManagement;
