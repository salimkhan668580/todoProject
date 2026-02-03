import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from '../../AdminLayout/AdminScreenLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { childrenService } from '@/app/service/childrenService';
import { notificationService } from '@/app/service/notificationService';
import { useNavigation } from '@react-navigation/native';

function TaskReminder() {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  // --- 1. Fetch Dynamic Data ---
  const { data: response, isLoading } = useQuery({
    queryKey: ['childrenList'],
    queryFn: () => childrenService.getChildren(),
  });

  // --- 2. Mutation for API Call ---
  const mutation = useMutation({
    mutationFn: (payload: any) => notificationService.sendNotifications(payload),
    onSuccess: () => {
      Alert.alert("Success", "Reminders sent successfully! 🚀");
      setTitle('');
      setDescription('');
      setSelectedChildren([]);
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to send notification. Please try again.");
      console.error(error);
    }
  });

  const childrenData = response?.data || [];

  const toggleChild = (id: string) => {
    if (selectedChildren.includes(id)) {
      setSelectedChildren(selectedChildren.filter(item => item !== id));
    } else {
      setSelectedChildren([...selectedChildren, id]);
    }
  };

  const handleSend = () => {
    const payload = {
      title: title,
      description: description,
      forChild: true,
      ReminderType: "morning",
      sendTo: selectedChildren 
    };
    mutation.mutate(payload);
  };

  return (
    <AdminScreenLayout>
      <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER WITH HISTORY BUTTON --- */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Send Reminder</Text>
            <Text style={styles.subtitle}>Nudge your kids to finish their tasks</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.historyBtn} 
            onPress={() => navigation.navigate('NotificationHistory')} // Ensure this route exists
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="history" size={22} color="#8E74F0" />
            <Text style={styles.historyBtnText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* --- MESSAGE INPUT CARD --- */}
        <View style={styles.card}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Notification Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="e.g. Urgent Reminder"
              placeholderTextColor="#AAA"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Message Description</Text>
            <TextInput
              style={styles.descInput}
              placeholder="e.g. Time to finish Math Homework! 📚"
              placeholderTextColor="#AAA"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>

        {/* --- CHILD SELECTOR --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Select Children</Text>
          <Text style={styles.countText}>{selectedChildren.length} Selected</Text>
        </View>

        <View style={styles.childrenContainer}>
          {isLoading ? (
            <ActivityIndicator color="#CBBAFF" style={{ flex: 1, padding: 20 }} />
          ) : (
            childrenData.map((child: any) => {
              const isSelected = selectedChildren.includes(child._id);
              return (
                <TouchableOpacity 
                  key={child._id} 
                  onPress={() => toggleChild(child._id)}
                  style={[styles.childCard, isSelected && styles.selectedChildCard]}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: child.image }} style={styles.childAvatar} />
                  <Text numberOfLines={1} style={[styles.childName, isSelected && styles.selectedChildName]}>
                    {child.name.split(' ')[0]}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <MaterialCommunityIcons name="check" size={10} color="white" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* --- SEND BUTTON --- */}
        <TouchableOpacity 
          style={[
            styles.sendBtn, 
            (!title || !description || selectedChildren.length === 0 || mutation.isPending) && styles.disabledBtn
          ]} 
          onPress={handleSend}
          disabled={!title || !description || selectedChildren.length === 0 || mutation.isPending}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialCommunityIcons name="send" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.sendBtnText}>Send Notification</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF', paddingHorizontal: 20 },
  
  // Header Adjustments
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginTop: 25, 
    marginBottom: 25 
  },
  headerTextContainer: { flex: 1 },
  title: { fontSize: 26, fontWeight: '800', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  
  // History Button Style
  historyBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0EBFF', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBBAFF'
  },
  historyBtnText: { color: '#8E74F0', fontWeight: '700', marginLeft: 4, fontSize: 13 },

  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 25, elevation: 3, marginBottom: 25, shadowColor: '#CBBAFF', shadowOpacity: 0.1, shadowRadius: 10 },
  inputWrapper: { marginVertical: 5 },
  label: { fontSize: 12, fontWeight: '800', color: '#AAA', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
  
  titleInput: { 
    fontSize: 16, color: '#2D3142', fontWeight: '700', 
    backgroundColor: '#F9FFFF', padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#E0F7FA'
  },
  
  descInput: { 
    fontSize: 15, color: '#2D3142', fontWeight: '500', 
    minHeight: 100, textAlignVertical: 'top', backgroundColor: '#F9FFFF',
    padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E0F7FA'
  },

  divider: { height: 1, backgroundColor: '#F4F4F4', marginVertical: 15 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  countText: { fontSize: 12, color: '#8E74F0', fontWeight: '700' },
  
  childrenContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  childCard: { 
    width: '31%', backgroundColor: '#FFF', borderRadius: 20, 
    padding: 12, alignItems: 'center', elevation: 2, position: 'relative',
    borderWidth: 2, borderColor: 'transparent'
  },
  selectedChildCard: { borderColor: '#CBBAFF', backgroundColor: '#F4EFFF' },
  childAvatar: { width: 45, height: 45, borderRadius: 22.5, marginBottom: 8, backgroundColor: '#F0F0F0' },
  childName: { fontSize: 13, fontWeight: '700', color: '#2D3142' },
  selectedChildName: { color: '#8E74F0' },
  
  checkBadge: { 
    position: 'absolute', top: 5, right: 5, 
    backgroundColor: '#8E74F0', borderRadius: 10, padding: 3 
  },

  sendBtn: { 
    backgroundColor: '#00BFA5', paddingVertical: 18, borderRadius: 20, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#00BFA5', shadowOpacity: 0.4, shadowRadius: 10
  },
  disabledBtn: { backgroundColor: '#D1D1D1', elevation: 0, shadowOpacity: 0 },
  sendBtnText: { color: 'white', fontSize: 17, fontWeight: '800' }
});

export default TaskReminder;