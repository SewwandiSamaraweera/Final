import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { ambulances } from '@/mocks/data';
import { Ambulance } from '@/types';

interface AmbulanceCardProps {
  ambulance: Ambulance;
}

function AmbulanceCard({ ambulance }: AmbulanceCardProps) {
  const isAvailable = ambulance.status === 'Available';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.ambulanceCode}>{ambulance.code}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <View style={styles.infoValue}>
            <MapPin size={14} color={Colors.gray} />
            <Text style={styles.infoText}>{ambulance.location}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Driver</Text>
          <View style={styles.infoValue}>
            <User size={14} color={Colors.gray} />
            <Text style={styles.infoText}>{ambulance.driver}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isAvailable ? Colors.available : Colors.busy },
          ]}
        >
          <Text style={styles.statusText}>{ambulance.status}</Text>
        </View>
      </View>
    </View>
  );
}

export default function AmbulancesScreen() {
  const availableCount = ambulances.filter(a => a.status === 'Available').length;
  const busyCount = ambulances.filter(a => a.status === 'Busy').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ambulance Management</Text>
      </View>

      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: Colors.available }]} />
          <Text style={styles.summaryText}>Available: {availableCount}</Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: Colors.busy }]} />
          <Text style={styles.summaryText}>Busy: {busyCount}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {ambulances.map((ambulance) => (
            <AmbulanceCard key={ambulance.id} ambulance={ambulance} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.secondary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  ambulanceCode: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
    textAlign: 'center',
  },
  cardContent: {
    padding: 12,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  infoValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: '500' as const,
    flex: 1,
  },
  cardFooter: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});