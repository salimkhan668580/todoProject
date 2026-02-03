import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AdminScreenLayout from "../../AdminLayout/AdminScreenLayout";
import { notificationService } from '@/app/service/notificationService';
import { useNavigation } from '@react-navigation/native';

function NotificationHistory() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: ['notificationHistory'],
    queryFn: () => notificationService.getNotificationsSendHistory(),
  });

  const historyData = response?.data || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'morning': return { name: 'weather-sunset-up', color: '#FFB74D' };
      case 'evening': return { name: 'weather-sunset-down', color: '#64B5F6' };
      default: return { name: 'bell-ring-outline', color: '#CBBAFF' };
    }
  };

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const renderItem = ({ item }: { item: any }) => {
    const iconData = getIcon(item.ReminderType);
    
    // Logic to join names: show first two names and "+X more" if needed
    const childNames = item.childrenDetails?.map((c: any) => c.name.split(' ')[0]) || [];
    const displayedNames = childNames.slice(0, 2).join(', ');
    const extraCount = childNames.length > 2 ? childNames.length - 2 : 0;

    return (
      <View style={styles.notificationCard}>
        <View style={[styles.iconContainer, { backgroundColor: iconData.color + '15' }]}>
          <MaterialCommunityIcons name={iconData.name as any} size={22} color={iconData.color} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.notifTitle}>{item.title}</Text>
            <Text style={styles.timeText}>{formatDateTime(item.createdAt)}</Text>
          </View>
          
          <Text style={styles.notifMessage} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.footerRow}>
            {/* Displaying Names instead of Images */}
            <View style={styles.namesWrapper}>
              <MaterialCommunityIcons name="account-child-outline" size={14} color="#8E74F0" />
              <Text style={styles.childNamesText} numberOfLines={1}>
                To: <Text style={styles.boldName}>{displayedNames}</Text>
                {extraCount > 0 && ` & ${extraCount} more`}
              </Text>
            </View>
            
            <View style={styles.statusBadge}>
              <MaterialCommunityIcons name="check-all" size={12} color="#00BFA5" />
              <Text style={styles.statusText}>Sent</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <AdminScreenLayout>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#2D3142" />
            </TouchableOpacity>
            <Text style={styles.title}>History</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => queryClient.invalidateQueries({ queryKey: ['notificationHistory'] })}
            style={styles.refreshBtn}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="#00BFA5" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#CBBAFF" />
          </View>
        ) : (
          <FlatList
            data={historyData}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ['notificationHistory'] })}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="history" size={60} color="#EEE" />
                <Text style={styles.emptyText}>No send history yet</Text>
              </View>
            }
          />
        )}
      </View>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 20 
  },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15 },
  title: { fontSize: 26, fontWeight: '800', color: '#2D3142' },
  refreshBtn: { padding: 8, backgroundColor: '#E0F7FA', borderRadius: 12 },

  listPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 22,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#CBBAFF',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  textContainer: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { fontSize: 15, fontWeight: '700', color: '#2D3142' },
  timeText: { fontSize: 10, color: '#BBB', fontWeight: '600' },
  notifMessage: { fontSize: 13, color: '#777', lineHeight: 18, marginBottom: 12 },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  
  // New Names Styling
  namesWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1, 
    marginRight: 10 
  },
  childNamesText: { 
    fontSize: 12, 
    color: '#888', 
    marginLeft: 5 
  },
  boldName: { 
    color: '#8E74F0', 
    fontWeight: '700' 
  },

  statusBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0FDF4', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 11, color: '#00BFA5', fontWeight: '700', marginLeft: 4 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { marginTop: 100, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#CCC', fontWeight: '600', marginTop: 10 },
});

export default NotificationHistory;