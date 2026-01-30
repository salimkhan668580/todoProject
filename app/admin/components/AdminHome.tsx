import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../AdminLayout/AdminScreenLayout";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../navigation/AdminNevigation';



const CHILDREN_DATA = [
  { id: '1', name: 'Alex Johnson', totalTasks: 12, completedTasks: 10, image: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sophie Chen', totalTasks: 8, completedTasks: 3, image: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Marcus Brown', totalTasks: 15, completedTasks: 1, image: 'https://i.pravatar.cc/150?u=3' },
];

function AdminHome() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleChildPress = () => {
      navigation.navigate('TaskDetails');
    }
  return (
    <AdminScreenLayout>
      <ScrollView 
        style={styles.main} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Children Overview</Text>
        
        {CHILDREN_DATA.map((child) => (
          <TouchableOpacity key={child.id} style={styles.childCard} activeOpacity={0.9} onPress={()=>handleChildPress()} >
            {/* Image Section */}
            <Image source={{ uri: child.image }} style={styles.avatar} />
            
            {/* Info Section */}
            <View style={styles.infoContainer}>
              <Text style={styles.childName}>{child.name}</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Tasks</Text>
                  <Text style={styles.totalValue}>{child.totalTasks}</Text>
                </View>
                
                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={styles.completeValue}>{child.completedTasks}</Text>
                </View>
              </View>

              {/* Theme-matching Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={[
                  styles.progressBar, 
                  { width: `${(child.completedTasks / child.totalTasks) * 100}%` }
                ]} />
              </View>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={24} color="#CBBAFF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#2D3142', marginBottom: 20 },
  
  childCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 24, 
    marginBottom: 16, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3
  },
  avatar: { width: 65, height: 65, borderRadius: 20, marginRight: 15 },
  infoContainer: { flex: 1 },
  childName: { fontSize: 18, fontWeight: '700', color: '#2D3142', marginBottom: 8 },
  
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statItem: { flex: 1 },
  statLabel: { fontSize: 11, color: '#AAA', fontWeight: '600', textTransform: 'uppercase' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#2D3142' },
  completeValue: { fontSize: 16, fontWeight: '700', color: '#00BFA5' },
  
  divider: { width: 1, height: 20, backgroundColor: '#EEE', marginHorizontal: 10 },
  
  progressContainer: { 
    height: 6, 
    backgroundColor: '#F0F0F0', 
    borderRadius: 3, 
    width: '90%', 
    overflow: 'hidden' 
  },
  progressBar: { height: '100%', backgroundColor: '#CBBAFF' }
});

export default AdminHome;