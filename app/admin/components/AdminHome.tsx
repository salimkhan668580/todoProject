import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminScreenLayout from "../AdminLayout/AdminScreenLayout";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../navigation/AdminNevigation';
import { childrenService } from '@/app/service/childrenService';
import { ChildItem } from '@/app/types/children';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '@/app/Helper';
import { useAppSelector } from '@/app/store/hook';
import { fCMService } from '@/app/service/FcmService';






 function AdminHome() {
   const { expoPushToken } = usePushNotifications();
   const userData=useAppSelector(state=>state.user.value)

     const saveFcmMutation = useMutation({
       mutationFn: ({ userId, fcmToken }: { userId: string; fcmToken: string }) =>
         fCMService.saveFcm(userId, fcmToken),
     });
 

  useEffect(() => {
  
      if (expoPushToken && userData) {

        console.log("userData in user=>",userData)
        console.log("this is fcm token in user=>",expoPushToken)
        saveFcmMutation.mutate({
          userId: userData?.data?._id,
          fcmToken: expoPushToken,
        });
    }
  }, [expoPushToken]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['children'],
    queryFn: () => childrenService.getChildren(),
  });

  const children: ChildItem[] = data?.data || [];

  const handleChildPress = (id:string) => {
    if(!id) return
    navigation.navigate('TaskDetails',{ userId: id });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['children'] });
    setRefreshing(false);
  };

  return (
    <AdminScreenLayout>
      <ScrollView 
        style={styles.main} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing || isFetching} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Children Overview</Text>

        {children.map((child) => (
          <TouchableOpacity
            key={child._id}
            style={styles.childCard}
            activeOpacity={0.9}
            onPress={()=>handleChildPress(child._id)}
          >
            {/* Image Section */}
            <Image source={{ uri: child.image }} style={styles.avatar} />

            {/* Info Section */}
            <View style={styles.infoContainer}>
              <Text style={styles.childName}>{child.name}</Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Tasks</Text>
                  <Text style={styles.totalValue}>{child.totalTodos}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={styles.completeValue}>{child.doneTodos}</Text>
                </View>
              </View>

              {/* Progress bar based on doneTodos / totalTodos */}
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        child.totalTodos
                          ? (child.doneTodos / child.totalTodos) * 100
                          : 0
                      }%`,
                    },
                  ]}
                />
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