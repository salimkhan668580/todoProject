import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ScreenLayout from './ScreenLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/app/service/notificationService';
import { NotificationItem } from '@/app/types/notification';

function NotificationScreen() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
  });

  const notifications: NotificationItem[] = data?.data || [];

  const getIcon = (reminderType: string) => {
    switch (reminderType) {
      case 'morning':
        return { name: 'weather-sunset-up', color: '#FFB74D' };
      case 'evening':
        return { name: 'weather-sunset-down', color: '#64B5F6' };
      default:
        return { name: 'bell-outline', color: '#CBBAFF' };
    }
  };

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconData = getIcon(item.ReminderType);
    const unread = !item.isRead;

    return (
      <TouchableOpacity 
        style={[styles.notificationCard, unread && styles.unreadCard]}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconData.color + '20' }]}>
          <MaterialCommunityIcons name={iconData.name as any} size={24} color={iconData.color} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.notifTitle}>{item.title}</Text>
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </View>
          <Text style={styles.notifMessage} numberOfLines={2}>{item.description}</Text>
        </View>

        {unread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity
            onPress={() => queryClient.invalidateQueries({ queryKey: ['notifications'] })}
          >
            <Text style={styles.markRead}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={() =>
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
          }
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