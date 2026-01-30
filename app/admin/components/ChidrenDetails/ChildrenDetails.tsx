import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../../AdminLayout/AdminScreenLayout";
import { RootStackParamList } from '../../navigation/AdminNevigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

function ChildrenDetails() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const TASKS = [
    { id: '1', title: 'Morning Exercise', status: 'Completed', time: '08:30 AM', color: '#00BFA5' },
    { id: '2', title: 'Math Homework', status: 'In Progress', time: 'Pending', color: '#CBBAFF' },
    { id: '3', title: 'Read Science Chapter 4', status: 'Completed', time: '11:00 AM', color: '#00BFA5' },
    { id: '4', title: 'Clean Room', status: 'Not Started', time: 'Upcoming', color: '#BBB' },
  ];

  const filteredTasks = TASKS.filter(task => 
    task.status === 'Completed' || task.status === 'Not Started'
  );

  const handelSeePrevious=() => { navigation.navigate('PreviousTodoList') };

  return (
    <AdminScreenLayout>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* --- 1. CHILD PROFILE HEADER --- */}
        <View style={styles.headerCard}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=1' }} 
            style={styles.childImage} 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.childName}>Alex Johnson</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Primary Student</Text>
            </View>
          </View>
        </View>

        {/* --- 2. PROGRESS SUMMARY --- */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>2/4</Text>
            <Text style={styles.summaryLabel}>Tasks Done</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, { color: '#CBBAFF' }]}>50%</Text>
            <Text style={styles.summaryLabel}>Overall Progress</Text>
          </View>
        </View>

        {/* --- 3. FILTERED TASK LIST --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Activity Overview</Text>
          <View style={styles.filterChip}>
             <Text style={styles.filterChipText}>Filtered</Text>
          </View>
        </View>

        {filteredTasks.map((item) => (
          <View key={item.id} style={styles.taskCard}>
            <View style={[styles.statusIndicator, { backgroundColor: item.color }]} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskTime}>{item.time}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.statusBadgeText, { color: item.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}

        {/* --- NEW: SEE ALL PREVIOUS BUTTON --- */}
        <TouchableOpacity style={styles.previousBtn} activeOpacity={0.7} onPress={handelSeePrevious}>
          <Text style={styles.previousBtnText}>See All Previous Tasks</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#CBBAFF" />
        </TouchableOpacity>

        {/* --- 4. ENCOURAGEMENT CARD --- */}
        <LinearGradient
          colors={['#A2F3FF', '#CBBAFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.quoteCard}
        >
          <MaterialCommunityIcons name="star-face" size={24} color="#2D3142" />
          <Text style={styles.quoteText}>
            Keep track of Alex progress here. Encouragement goes a long way!
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