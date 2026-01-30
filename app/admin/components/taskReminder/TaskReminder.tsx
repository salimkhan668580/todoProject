import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from '../../AdminLayout/AdminScreenLayout';

function TaskReminder() {
  const [title, setTitle] = useState('');
  const [selectedChildren, setSelectedChildren] = useState([]);

  const CHILDREN = [
    { id: '1', name: 'Alex', image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Emma', image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Liam', image: 'https://i.pravatar.cc/150?u=3' },
  ];

  const toggleChild = (id:any) => {
    if (selectedChildren.includes(id)) {
      setSelectedChildren(selectedChildren.filter(item => item !== id));
    } else {
      setSelectedChildren([...selectedChildren, id]);
    }
  };

  const handleSend = () => {
    alert(`Notification Sent: "${title}" to ${selectedChildren.length} children`);
    setTitle('');
    setSelectedChildren([]);
  };

  return (
    <AdminScreenLayout>
      <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- 1. HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Send Reminder</Text>
          <Text style={styles.subtitle}>Nudge your kids to finish their tasks</Text>
        </View>

        {/* --- 2. MESSAGE INPUT --- */}
        <View style={styles.card}>
          <Text style={styles.label}>Reminder Message</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Time to finish Math Homework! 📚"
            placeholderTextColor="#AAA"
            value={title}
            onChangeText={setTitle}
            multiline
          />
        </View>

        {/* --- 3. CHILD SELECTOR --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Select Children</Text>
          <Text style={styles.countText}>{selectedChildren.length} Selected</Text>
        </View>

        <View style={styles.childrenContainer}>
          {CHILDREN.map((child) => {
            const isSelected = selectedChildren.includes(child.id);
            return (
              <TouchableOpacity 
                key={child.id} 
                onPress={() => toggleChild(child.id)}
                style={[styles.childCard, isSelected && styles.selectedChildCard]}
                activeOpacity={0.8}
              >
                <Image source={{ uri: child.image }} style={styles.childAvatar} />
                <Text style={[styles.childName, isSelected && styles.selectedChildName]}>
                  {child.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <MaterialCommunityIcons name="check" size={12} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- 4. SEND BUTTON --- */}
        <TouchableOpacity 
          style={[styles.sendBtn, (!title || selectedChildren.length === 0) && styles.disabledBtn]} 
          onPress={handleSend}
          disabled={!title || selectedChildren.length === 0}
        >
          <MaterialCommunityIcons name="send" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.sendBtnText}>Send Notification</Text>
        </TouchableOpacity>

      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF', paddingHorizontal: 20 },
  header: { marginTop: 25, marginBottom: 25 },
  title: { fontSize: 26, fontWeight: '800', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },

  // Input Card
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 25, elevation: 2, marginBottom: 25 },
  label: { fontSize: 13, fontWeight: '800', color: '#AAA', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1 },
  input: { 
    fontSize: 16, color: '#2D3142', fontWeight: '500', 
    minHeight: 80, textAlignVertical: 'top', backgroundColor: '#F9FFFF',
    padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#E0F7FA'
  },

  // Selector
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  countText: { fontSize: 12, color: '#CBBAFF', fontWeight: '700' },
  childrenContainer: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  childCard: { 
    flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 15, 
    alignItems: 'center', elevation: 2, position: 'relative',
    borderWidth: 2, borderColor: 'transparent'
  },
  selectedChildCard: { borderColor: '#CBBAFF', backgroundColor: '#F4EFFF' },
  childAvatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 8 },
  childName: { fontSize: 14, fontWeight: '700', color: '#2D3142' },
  selectedChildName: { color: '#8E74F0' },
  checkBadge: { 
    position: 'absolute', top: 5, right: 5, 
    backgroundColor: '#CBBAFF', borderRadius: 10, padding: 2 
  },

  // Send Button
  sendBtn: { 
    backgroundColor: '#00BFA5', paddingVertical: 18, borderRadius: 20, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#00BFA5', shadowOpacity: 0.3, shadowRadius: 8
  },
  disabledBtn: { backgroundColor: '#CCC', elevation: 0, shadowOpacity: 0 },
  sendBtnText: { color: 'white', fontSize: 16, fontWeight: '800' }
});

export default TaskReminder;