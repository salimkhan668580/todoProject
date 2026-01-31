import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../AdminLayout/AdminScreenLayout";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AdminNevigation';
import { useAppDispatch } from '@/app/store/hook';
import { ClearUser } from '@/app/store/AuthSlice';

function AdminProfileScreen() {
  const dispatch = useAppDispatch();
      const navigation = useNavigation<NavigationProp<RootStackParamList >>();
  const MENU_OPTIONS = [
    { id: '1', icon: 'bell-ring-outline', label: 'Task Reminders', color: '#A2F3FF' },

    { id: '2', icon: 'logout', label: 'Logout', color: '#FF8A80' },
  ];

  const handelLogout=()=>{
   dispatch(ClearUser());
  }

  const handleOptionPress = (optionId: string) => {
    switch (optionId) {
      case '1':
        navigation.navigate('taskReminder');
        break;
      case '2':
        navigation.navigate('Login');
        break;
      default:
        break;
    }
  };

  return (
    <AdminScreenLayout>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* --- 1. PERSONAL HEADER --- */}
        <View style={styles.profileHeader}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=parent' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.editIcon}>
              <MaterialCommunityIcons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.adminName}>Parent Dashboard</Text>
          <Text style={styles.adminEmail}>Personal Workspace</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>CHIEF ORGANIZER</Text>
          </View>
        </View>

        {/* --- 2. FAMILY INSIGHTS --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>03</Text>
            <Text style={styles.statLabel}>Kids</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#00BFA5' }]}>28</Text>
            <Text style={styles.statLabel}>Active Tasks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#CBBAFF' }]}>12</Text>
            <Text style={styles.statLabel}>Awards</Text>
          </View>
        </View>

        {/* --- 3. MENU LIST --- */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {MENU_OPTIONS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7} 

            onPress={()=>{
              item.id === '2' ? handelLogout() : handleOptionPress(item.id)}} >
              <View style={[styles.iconBg, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.versionText}>Your Personal Workspace v1.0</Text>
      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF', paddingHorizontal: 20 },
  
  profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 30 },
  imageWrapper: { position: 'relative' },
  profileImage: { width: 100, height: 100, borderRadius: 30, borderWidth: 4, borderColor: '#FFF' },
  editIcon: { 
    position: 'absolute', bottom: -5, right: -5, 
    backgroundColor: '#00BFA5', padding: 8, borderRadius: 15,
    elevation: 4, borderWidth: 3, borderColor: '#F9FFFF'
  },
  adminName: { fontSize: 24, fontWeight: '800', color: '#2D3142', marginTop: 15 },
  adminEmail: { fontSize: 14, color: '#888', marginTop: 2 },
  roleBadge: { 
    backgroundColor: '#CBBAFF', paddingHorizontal: 12, paddingVertical: 5, 
    borderRadius: 10, marginTop: 12 
  },
  roleText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  statsContainer: { 
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 25, 
    padding: 20, elevation: 2, marginBottom: 30, alignItems: 'center',
    shadowColor: '#CBBAFF', shadowOpacity: 0.1, shadowRadius: 10
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#2D3142' },
  statLabel: { fontSize: 11, color: '#AAA', fontWeight: '700', marginTop: 4 },
  statDivider: { width: 1, height: 25, backgroundColor: '#F0F0F0' },

  menuSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#CCC', marginBottom: 15, marginLeft: 5, textTransform: 'uppercase' },
  menuItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    padding: 15, borderRadius: 20, marginBottom: 10, elevation: 1 
  },
  iconBg: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: '#2D3142' },

  versionText: { textAlign: 'center', color: '#CCC', fontSize: 12, marginBottom: 40, letterSpacing: 1 }
});

export default AdminProfileScreen;