import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, MapPin, X, Ambulance } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { emergencies, ambulances } from '@/mocks/data';
import { Emergency } from '@/types';

interface EmergencyCardProps {
  emergency: Emergency;
  onPress: () => void;
}

function EmergencyCard({ emergency, onPress }: EmergencyCardProps) {
  const getStatusColor = (status: Emergency['status']) => {
    switch (status) {
      case 'New':
        return Colors.statusNew;
      case 'Assigned':
        return Colors.statusAssigned;
      case 'In Progress':
        return Colors.statusInProgress;
      default:
        return Colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.patientId}>{emergency.patientId}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(emergency.status) }]}>
          <Text style={styles.statusText}>{emergency.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.emergencyType}>{emergency.emergencyType}</Text>
        
        <View style={styles.infoRow}>
          <Clock size={14} color={Colors.gray} />
          <Text style={styles.infoText}>{emergency.timeReceived}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.gray} />
          <Text style={styles.infoText} numberOfLines={1}>{emergency.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function EmergenciesScreen() {
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const availableAmbulances = ambulances.filter(a => a.status === 'Available');

  const handleEmergencyPress = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setModalVisible(true);
  };

  const handleAssignAmbulance = (ambulanceCode: string) => {
    Alert.alert(
      'Ambulance Assigned',
      `${ambulanceCode} has been assigned to ${selectedEmergency?.patientId}`,
      [{ text: 'OK', onPress: () => setModalVisible(false) }]
    );
  };

  const getStatusColor = (status: Emergency['status']) => {
    switch (status) {
      case 'New':
        return Colors.statusNew;
      case 'Assigned':
        return Colors.statusAssigned;
      case 'In Progress':
        return Colors.statusInProgress;
      default:
        return Colors.gray;
    }
  };

  const newCount = emergencies.filter(e => e.status === 'New').length;
  const assignedCount = emergencies.filter(e => e.status === 'Assigned').length;
  const inProgressCount = emergencies.filter(e => e.status === 'In Progress').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Management</Text>
      </View>

      <View style={styles.filterBar}>
        <View style={styles.filterItem}>
          <View style={[styles.filterDot, { backgroundColor: Colors.statusNew }]} />
          <Text style={styles.filterText}>New: {newCount}</Text>
        </View>
        <View style={styles.filterItem}>
          <View style={[styles.filterDot, { backgroundColor: Colors.statusAssigned }]} />
          <Text style={styles.filterText}>Assigned: {assignedCount}</Text>
        </View>
        <View style={styles.filterItem}>
          <View style={[styles.filterDot, { backgroundColor: Colors.statusInProgress }]} />
          <Text style={styles.filterText}>In Progress: {inProgressCount}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {emergencies.map((emergency) => (
          <EmergencyCard
            key={emergency.id}
            emergency={emergency}
            onPress={() => handleEmergencyPress(emergency)}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Emergency Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={Colors.secondary} />
              </TouchableOpacity>
            </View>

            {selectedEmergency && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Patient Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Patient ID:</Text>
                    <Text style={styles.detailValue}>{selectedEmergency.patientId}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Name:</Text>
                    <Text style={styles.detailValue}>{selectedEmergency.patientName}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Emergency Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Type:</Text>
                    <Text style={styles.detailValue}>{selectedEmergency.emergencyType}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <View style={[styles.statusBadgeSmall, { backgroundColor: getStatusColor(selectedEmergency.status) }]}>
                      <Text style={styles.statusTextSmall}>{selectedEmergency.status}</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Time:</Text>
                    <Text style={styles.detailValue}>{selectedEmergency.timeReceived}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Location</Text>
                  <View style={styles.locationBox}>
                    <MapPin size={18} color={Colors.primary} />
                    <Text style={styles.locationText}>{selectedEmergency.location}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{selectedEmergency.description}</Text>
                </View>

                {selectedEmergency.assignedAmbulance ? (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Assigned Ambulance</Text>
                    <View style={styles.assignedBox}>
                      <Ambulance size={20} color={Colors.primary} />
                      <Text style={styles.assignedText}>{selectedEmergency.assignedAmbulance}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Assign Ambulance</Text>
                    {availableAmbulances.length > 0 ? (
                      <View style={styles.ambulanceList}>
                        {availableAmbulances.map((amb) => (
                          <TouchableOpacity
                            key={amb.id}
                            style={styles.assignButton}
                            onPress={() => handleAssignAmbulance(amb.code)}
                          >
                            <Ambulance size={18} color={Colors.white} />
                            <Text style={styles.assignButtonText}>{amb.code}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.noAmbulanceText}>No ambulances available</Text>
                    )}
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  filterText: {
    fontSize: 12,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  patientId: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.secondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  cardContent: {
    padding: 12,
  },
  emergencyType: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.secondary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: Colors.gray,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.secondary,
  },
  modalBody: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.gray,
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.secondary,
    flex: 1,
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusTextSmall: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    color: Colors.secondary,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  assignedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: 8,
  },
  assignedText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  ambulanceList: {
    gap: 10,
  },
  assignButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  assignButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  noAmbulanceText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    padding: 12,
  },
});