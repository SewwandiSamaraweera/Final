import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

const AdminDashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerText}>Admin Dashboard</Text>
      </View>

      {/* Dashboard Card */}
      <View style={styles.dashboardCard}>
        <View style={styles.row}>
          {/* Active Emergencies */}
          <View style={styles.statCard}>
            <Ionicons name="notifications" size={26} color="#1B2A41" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statText}>Active</Text>
            <Text style={styles.statText}>Emergencies</Text>
          </View>

          {/* Available Ambulances */}
          <View style={styles.statCard}>
            <MaterialIcons name="local-hospital" size={26} color="#1B2A41" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statText}>Available</Text>
            <Text style={styles.statText}>Ambulances</Text>
          </View>
        </View>

        <View style={styles.row}>
          {/* Ongoing Dispatches */}
          <View style={styles.statCard}>
            <Feather name="refresh-cw" size={26} color="#1B2A41" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statText}>Ongoing</Text>
            <Text style={styles.statText}>Dispatches</Text>
          </View>

          {/* System Status */}
          <View style={styles.statCard}>
            <Feather name="monitor" size={26} color="#1B2A41" />
            <Text style={styles.statNumber}>Online</Text>
            <Text style={styles.statText}>System</Text>
            <Text style={styles.statText}>Status</Text>
          </View>
        </View>
      </View>

      
    </View>
  )
}

export default AdminDashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EF2C2',
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 28,
  },

  dashboardCard: {
    backgroundColor: '#EFFFF8',
    margin: 20,
    borderRadius: 15,
    padding: 15,
    marginTop: 40,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    padding: 15,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  statText: {
    fontSize: 13,
  },

  
})
