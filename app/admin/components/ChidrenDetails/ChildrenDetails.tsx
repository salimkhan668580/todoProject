import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../../AdminLayout/AdminScreenLayout";
import { RootStackParamList } from '../../navigation/AdminNevigation';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { childrenService } from '@/app/service/childrenService';
import { ChildrenListResponse } from '@/app/types/children';
import { ChildrenData } from '@/app/types/parentChildrenDetails';



function ChildrenDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChildrenDetails'>>();
  const { userId } = route.params; // Get the ID passed from the previous screen

  const { data: response, isLoading, isError } = useQuery<ChildrenListResponse>({
    queryKey: ['childDetails', userId],
    queryFn: () => childrenService.getChildrenDetails(userId),
    enabled: !!userId,
  });

  const childData:any  = response?.data||{};

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#CBBAFF" />;
  if (isError || !childData) return <Text>Error loading data...</Text>;

  // Calculate percentage
  const progressPercent = childData.totalTodos > 0 
    ? Math.round((childData.doneTodos / childData.totalTodos) * 100) 
    : 0;

  const handelSeePrevious = (userId:string) => { navigation.navigate('PreviousTodoList', { userId }) };

  return (
<AdminScreenLayout>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* --- 1. CHILD PROFILE HEADER --- */}
        <View style={styles.headerCard}>
          <Image 
            source={{ uri: childData.image }} 
            style={styles.childImage} 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.childName}>{childData.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{childData.role.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* --- 2. PROGRESS SUMMARY --- */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{childData.doneTodos}/{childData.totalTodos}</Text>
            <Text style={styles.summaryLabel}>Tasks Done</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, { color: '#CBBAFF' }]}>{progressPercent}%</Text>
            <Text style={styles.summaryLabel}>Overall Progress</Text>
          </View>
        </View>

        {/* --- 3. TASK LIST FROM API --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Tasks</Text>
        </View>

        {
          childData.todos.length > 0 ?
        childData.todos.map((task: any) => (
          <View key={task._id} style={styles.taskCard}>
            <View style={[styles.statusIndicator, { backgroundColor: task.isDone ? '#00BFA5' : '#CBBAFF' }]} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskTime}>
                {task.isDone ? `Done: ${new Date(task.updatedAt).toLocaleDateString()}` : 'Pending'}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: (task.isDone ? '#00BFA5' : '#CBBAFF') + '15' }]}>
              <Text style={[styles.statusBadgeText, { color: task.isDone ? '#00BFA5' : '#CBBAFF' }]}>
                {task.isDone ? 'Completed' : 'In Progress'}
              </Text>
            </View>
          </View>
        ))
        :
        <Text style={styles.noTasksText}>No tasks found.</Text>
        }

        <TouchableOpacity style={styles.previousBtn} onPress={()=>handelSeePrevious(userId)}>
          <Text style={styles.previousBtnText}>See All Previous Tasks</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#CBBAFF" />
        </TouchableOpacity>

        <LinearGradient colors={['#A2F3FF', '#CBBAFF']} style={styles.quoteCard}>
          <MaterialCommunityIcons name="star-face" size={24} color="#2D3142" />
          <Text style={styles.quoteText}>
            Keep track of {childData.name}s progress here. Encouragement goes a long way!
          </Text>
        </LinearGradient>

      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF', paddingHorizontal: 20 },
  headerCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 25,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    elevation: 2
  },
  childImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#CBBAFF' },
  headerTextContainer: { marginLeft: 15 },
  childName: { fontSize: 22, fontWeight: '800', color: '#2D3142' },
  badge: { backgroundColor: '#E0F7FA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  badgeText: { fontSize: 12, color: '#00BFA5', fontWeight: '700' },
  summaryContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 2
  },
  summaryBox: { alignItems: 'center' },
  summaryValue: { fontSize: 20, fontWeight: '800', color: '#00BFA5' },
  summaryLabel: { fontSize: 12, color: '#AAA', fontWeight: '600', marginTop: 2 },
  divider: { width: 1, height: 30, backgroundColor: '#EEE' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2D3142' },
  filterChip: { backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  filterChipText: { fontSize: 10, color: '#888', fontWeight: '700', textTransform: 'uppercase' },
  taskCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 18, 
    marginBottom: 12, 
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 1
  },
  statusIndicator: { width: 6, height: '100%' },
  taskInfo: { flex: 1, padding: 16 },
  taskTitle: { fontSize: 15, fontWeight: '600', color: '#2D3142' },
  taskTime: { fontSize: 12, color: '#AAA', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, marginRight: 15 },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  
  // New Button Style
  previousBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBBAFF',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
    borderStyle: 'dashed' // Dashed look to distinguish it from main task cards
  },
  previousBtnText: {
    color: '#CBBAFF',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 5
  },

  noTasksText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3142',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  quoteCard: { 
    padding: 20, 
    borderRadius: 20, 
    marginTop: 10, 
    marginBottom: 30, 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 15
  },
  quoteText: { flex: 1, fontSize: 14, color: '#2D3142', fontWeight: '600', lineHeight: 20 }
});

export default ChildrenDetails;