import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit, Ban, CheckCircle, XCircle, AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { users, systemLogs } from '@/mocks/data';
import { User, SystemLog } from '@/types';

type TabType = 'Users' | 'Roles' | 'Logs' | 'Reports';

interface UserRowProps {
  user: User;
  onEdit: () => void;
  onToggleStatus: () => void;
}

function UserRow({ user, onEdit, onToggleStatus }: UserRowProps) {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={[styles.tableCell, styles.roleCellContent]}>
        <View style={[styles.roleBadge, getRoleBadgeStyle(user.role)]}>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </View>
      <View style={[styles.tableCell, styles.statusCellContent]}>
        <View style={[styles.statusIndicator, { backgroundColor: user.status === 'Active' ? Colors.success : Colors.gray }]} />
        <Text style={styles.statusText}>{user.status}</Text>
      </View>
      <View style={[styles.tableCell, styles.actionsCellContent]}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Edit size={16} color={Colors.info} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onToggleStatus}>
          <Ban size={16} color={user.status === 'Active' ? Colors.danger : Colors.success} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getRoleBadgeStyle(role: User['role']) {
  switch (role) {
    case 'Admin':
      return { backgroundColor: Colors.primary };
    case 'Doctor':
      return { backgroundColor: Colors.info };
    case 'Paramedic':
      return { backgroundColor: Colors.warning };
    default:
      return { backgroundColor: Colors.gray };
  }
}

interface LogRowProps {
  log: SystemLog;
}

function LogRow({ log }: LogRowProps) {
  const getStatusIcon = (status: SystemLog['status']) => {
    switch (status) {
      case 'Success':
        return <CheckCircle size={16} color={Colors.success} />;
      case 'Failed':
        return <XCircle size={16} color={Colors.danger} />;
      case 'Warning':
        return <AlertTriangle size={16} color={Colors.warning} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.logRow}>
      <View style={styles.logTimestamp}>
        <Text style={styles.logTimestampText}>{log.timestamp}</Text>
      </View>
      <View style={styles.logContent}>
        <Text style={styles.logAction}>{log.action}</Text>
        <Text style={styles.logUser}>by {log.user}</Text>
      </View>
      <View style={styles.logStatus}>
        {getStatusIcon(log.status)}
      </View>
    </View>
  );
}

export default function ManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Users');

  const tabs: TabType[] = ['Users', 'Roles', 'Logs', 'Reports'];

  const handleEditUser = (user: User) => {
    Alert.alert('Edit User', `Editing ${user.name}`);
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'disable' : 'enable';
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${newStatus} ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log(`${newStatus} ${user.name}`) },
      ]
    );
  };

  const renderUsersTab = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.nameHeader]}>Name</Text>
        <Text style={[styles.tableHeaderText, styles.roleHeader]}>Role</Text>
        <Text style={[styles.tableHeaderText, styles.statusHeader]}>Status</Text>
        <Text style={[styles.tableHeaderText, styles.actionsHeader]}>Actions</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onEdit={() => handleEditUser(user)}
            onToggleStatus={() => handleToggleStatus(user)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderRolesTab = () => (
    <View style={styles.rolesContainer}>
      <View style={styles.roleCard}>
        <Text style={styles.roleCardTitle}>Admin</Text>
        <Text style={styles.roleCardDescription}>Full system access, user management, and configuration</Text>
        <Text style={styles.roleCardCount}>{users.filter(u => u.role === 'Admin').length} users</Text>
      </View>
      <View style={styles.roleCard}>
        <Text style={styles.roleCardTitle}>Doctor</Text>
        <Text style={styles.roleCardDescription}>Access to patient records and emergency details</Text>
        <Text style={styles.roleCardCount}>{users.filter(u => u.role === 'Doctor').length} users</Text>
      </View>
      <View style={styles.roleCard}>
        <Text style={styles.roleCardTitle}>Paramedic</Text>
        <Text style={styles.roleCardDescription}>Field operations and ambulance management</Text>
        <Text style={styles.roleCardCount}>{users.filter(u => u.role === 'Paramedic').length} users</Text>
      </View>
    </View>
  );

  const renderLogsTab = () => (
    <View style={styles.logsContainer}>
      <Text style={styles.logsTitle}>System Logs</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {systemLogs.map((log) => (
          <LogRow key={log.id} log={log} />
        ))}
      </ScrollView>
    </View>
  );

  const renderReportsTab = () => (
    <View style={styles.reportsContainer}>
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Emergency Report</Text>
        <Text style={styles.reportDescription}>Summary of all emergencies this month</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Ambulance Utilization</Text>
        <Text style={styles.reportDescription}>Ambulance usage and availability stats</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>User Activity</Text>
        <Text style={styles.reportDescription}>User login and activity summary</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':
        return renderUsersTab();
      case 'Roles':
        return renderRolesTab();
      case 'Logs':
        return renderLogsTab();
      case 'Reports':
        return renderReportsTab();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User & System Management</Text>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.secondary,
    textTransform: 'uppercase',
  },
  nameHeader: {
    flex: 2,
  },
  roleHeader: {
    flex: 1.2,
    textAlign: 'center',
  },
  statusHeader: {
    flex: 1,
    textAlign: 'center',
  },
  actionsHeader: {
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
  },
  roleCellContent: {
    flex: 1.2,
    alignItems: 'center',
  },
  statusCellContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  actionsCellContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.secondary,
  },
  userEmail: {
    fontSize: 11,
    color: Colors.gray,
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  actionButton: {
    padding: 6,
  },
  rolesContainer: {
    gap: 12,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  roleCardTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.secondary,
    marginBottom: 6,
  },
  roleCardDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  roleCardCount: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.primary,
  },
  logsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.secondary,
    marginBottom: 12,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  logTimestamp: {
    width: 140,
  },
  logTimestampText: {
    fontSize: 11,
    color: Colors.gray,
    fontFamily: 'monospace',
  },
  logContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  logAction: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.secondary,
  },
  logUser: {
    fontSize: 11,
    color: Colors.gray,
  },
  logStatus: {
    width: 30,
    alignItems: 'center',
  },
  reportsContainer: {
    gap: 12,
  },
  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.secondary,
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
  },
  reportButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
