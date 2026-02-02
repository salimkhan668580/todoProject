import React, { useMemo } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../../AdminLayout/AdminScreenLayout";
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AdminNevigation';
import { useQuery } from '@tanstack/react-query';
import { childrenService } from '@/app/service/childrenService';
import { format, isYesterday, isToday } from 'date-fns';

function PreviousTodoList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PreviousTodoList'>>();
  
  // Assuming userId is passed from ChildrenDetails
  const { userId } = route.params || {};
  console.log("this is user id=>",userId) 

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['todoHistory', userId],
    queryFn: () => childrenService.getChildrenAllTodoHistory(userId),
    enabled: !!userId,
  });

  const childData = response?.data;

  // --- Logic to transform flat array into Sections ---
  const sections = useMemo(() => {
    if (!childData?.todos) return [];

    const groups: { [key: string]: any[] } = {};

    childData.todos.forEach((todo: any) => {
      const date = new Date(todo.createdAt);
      let dateLabel = format(date, 'MMM dd, yyyy');
      
      if (isToday(date)) dateLabel = 'Today';
      else if (isYesterday(date)) dateLabel = 'Yesterday';

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(todo);
    });

    return Object.keys(groups).map((date) => ({
      title: date,
      data: groups[date],
    }));
  }, [childData]);

  const handelSeeStats = () => { 
    navigation.navigate('stats', { userId }); 
  };

  const renderItem = ({ item }: any) => {
    const accentColor = item.isDone ? '#00BFA5' : '#FF8A80';
    const statusIcon = item.isDone ? 'check' : 'close';
    const timeDisplay = item.doneTime 
      ? format(new Date(item.doneTime), 'hh:mm a') 
      : 'Pending';

    return (
      <View style={styles.historyCard}>
        <View style={[styles.statusLine, { backgroundColor: item.isDone ? '#CBBAFF' : '#FF8A80' }]} />
        <View style={styles.cardContent}>
          <View style={styles.taskInfo}>
            <Text style={[styles.taskText, !item.isDone && styles.incompleteText]}>
              {item.title}
            </Text>
            <View style={styles.timeRow}>
              <MaterialCommunityIcons 
                name={item.isDone ? "clock-check-outline" : "clock-alert-outline"} 
                size={12} 
                color={accentColor} 
              />
              <Text style={[styles.timeText, { color: accentColor }]}>
                {item.isDone ? `Completed at ${timeDisplay}` : 'Incomplete'}
              </Text>
            </View>
          </View>
          <View style={[styles.statusCircle, { backgroundColor: accentColor }]}>
            <MaterialCommunityIcons name={statusIcon} size={16} color="white" />
          </View>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.headerContainer}>
      <View style={styles.dot} />
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.line} />
    </View>
  );

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#CBBAFF" />;
  return (
<AdminScreenLayout>
      <View style={styles.main}>
        <View style={styles.topInfo}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>History</Text>
              <Text style={styles.subtitle}>{childData?.name || 'Child'} performance</Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.chartBtn} activeOpacity={0.7} onPress={handelSeeStats}>
                <MaterialCommunityIcons name="chart-bar" size={22} color="#00BFA5" />
                <Text style={styles.chartBtnText}>Stats</Text>
              </TouchableOpacity>

              <Image 
                source={{ uri: childData?.image || 'https://via.placeholder.com/150' }} 
                style={styles.miniAvatar} 
              />
            </View>
          </View>
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="clipboard-off-outline" size={80} color="#E0F7FA" />
              <Text style={styles.emptyText}>No History Found</Text>
            </View>
          }
        />
      </View>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  topInfo: { paddingHorizontal: 24, paddingVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 2 },
  
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  
  // Bar Chart Button Styles
  chartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Soft Teal Bg
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  chartBtnText: {
    color: '#00BFA5',
    fontWeight: '700',
    fontSize: 13,
  },

  miniAvatar: { width: 45, height: 45, borderRadius: 12, borderWidth: 2, borderColor: '#CBBAFF' },
  listPadding: { paddingHorizontal: 24, paddingBottom: 40 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CBBAFF', marginRight: 10 },
  sectionHeader: { fontSize: 13, fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: 1 },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0', marginLeft: 15 },
  historyCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  statusLine: { width: 6 },
  cardContent: { flex: 1, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  taskText: { fontSize: 16, fontWeight: '600', color: '#2D3142', marginBottom: 4 },
  incompleteText: { color: '#7D7D7D' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12, fontWeight: '600' },
  statusCircle: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#CCC', fontSize: 18, fontWeight: '600', marginTop: 10 },
});

export default PreviousTodoList;