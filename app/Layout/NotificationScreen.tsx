import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ScreenLayout from './ScreenLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Mock Data for Notifications
const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Project Assigned',
    message: 'You have been added to "Mobile App Redesign"',
    time: '2m ago',
    type: 'project',
    unread: true,
  },
  {
    id: '2',
    title: 'Task Deadline',
    message: 'Task "Design graphic user interface" is due in 1 hour',
    time: '45m ago',
    type: 'alert',
    unread: true,
  },
  {
    id: '3',
    title: 'Daily Goal Achieved!',
    message: 'Congratulations! You marked 5/5 tasks as done today.',
    time: '3h ago',
    type: 'goal',
    unread: false,
  },
  {
    id: '4',
    title: 'Workspace Update',
    message: 'Mariposa added 3 new documents to the "Docs" tab.',
    time: 'Yesterday',
    type: 'info',
    unread: false,
  },
];

function NotificationScreen() {
  const getIcon = (type:any) => {
    switch (type) {
      case 'project': return { name: 'briefcase-outline', color: '#CBBAFF' };
      case 'alert': return { name: 'bell-alert-outline', color: '#FF8A80' };
      case 'goal': return { name: 'trophy-outline', color: '#00BFA5' };
      default: return { name: 'information-outline', color: '#A2F3FF' };
    }
  };

  const renderItem = ({ item }:any) => {
    const iconData = getIcon(item.type);

    return (
      <TouchableOpacity 
        style={[styles.notificationCard, item.unread && styles.unreadCard]}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconData.color + '20' }]}>
          <MaterialCommunityIcons name={iconData.name as any} size={24} color={iconData.color} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.notifTitle}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.notifMessage} numberOfLines={2}>{item.message}</Text>
        </View>

        {item.unread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markRead}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={NOTIFICATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingVertical: 20 
  },
  title: { fontSize: 28, fontWeight: '800', color: '#2D3142' },
  markRead: { color: '#00BFA5', fontWeight: '600', fontSize: 14 },
  
  listPadding: { paddingHorizontal: 20, paddingBottom: 40 },

  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#CBBAFF',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 4
  },
  notifTitle: { fontSize: 16, fontWeight: '700', color: '#2D3142' },
  timeText: { fontSize: 12, color: '#BBB' },
  notifMessage: { fontSize: 14, color: '#888', lineHeight: 20 },
  
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5252',
    marginLeft: 10,
  }
});

export default NotificationScreen;