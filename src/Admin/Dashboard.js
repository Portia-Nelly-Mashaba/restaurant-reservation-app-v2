import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/theme';
import { AntDesign, MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const screenWidth = Dimensions.get('window').width;

  // Chart data
  const reservationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple
        strokeWidth: 2,
      },
    ],
  };

  const tableOccupancyData = {
    labels: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'],
    datasets: [
      {
        data: [0.8, 0.6, 0.4, 0.9, 0.5],
      },
    ],
  };

  const revenueData = [
    {
      name: 'Food',
      population: 60, // Percentage value
      color: '#FF6384', // Red
      legendFontColor: COLORS.text,
      legendFontSize: 15,
    },
    {
      name: 'Drinks',
      population: 30, // Percentage value
      color: '#36A2EB', // Blue
      legendFontColor: COLORS.text,
      legendFontSize: 15,
    },
    {
      name: 'Desserts',
      population: 10, // Percentage value
      color: '#FFCE56', // Yellow
      legendFontColor: COLORS.text,
      legendFontSize: 15,
    },
  ];

  const customerSatisfactionData = {
    labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
    data: [0.7, 0.2, 0.1],
    colors: ['#4CAF50', '#FFC107', '#F44336'],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Analytics Section */}
      <Text style={styles.sectionTitle}>Analytics</Text>
      <View style={styles.chartsContainer}>
        {/* Reservations Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Reservations Over Time</Text>
          <LineChart
            data={reservationData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Table Occupancy Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Table Occupancy</Text>
          <BarChart
            data={tableOccupancyData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>

        {/* Revenue Distribution Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Distribution</Text>
          <PieChart
            data={revenueData}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </View>

        {/* Customer Satisfaction Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Customer Satisfaction</Text>
          <ProgressChart
            data={customerSatisfactionData}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
      </View>

      {/* Action Buttons Section */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.optionsContainer}>
        {/* Manage Reservations */}
        <TouchableOpacity style={styles.optionButton}>
          <AntDesign name="calendar" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Manage Reservations</Text>
        </TouchableOpacity>

        {/* Manage Tables */}
        <TouchableOpacity style={styles.optionButton}>
          <Feather name="grid" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Manage Tables</Text>
        </TouchableOpacity>

        {/* Manage Menu */}
        <TouchableOpacity style={styles.optionButton}>
          <MaterialIcons name="restaurant-menu" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Manage Menu</Text>
        </TouchableOpacity>

        {/* Customer Feedback */}
        <TouchableOpacity style={styles.optionButton}>
          <FontAwesome name="comments" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Customer Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  chartsContainer: {
    marginBottom: 24,
  },
  chartContainer: {
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 16,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.text,
  },
});

export default Dashboard;