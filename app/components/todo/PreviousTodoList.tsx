import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenLayout from "@/app/Layout/ScreenLayout";

// Updated Mock Data with some incomplete tasks
const HISTORY_DATA = [
  {
    title: 'Yesterday',
    data: [
      { id: '1', text: 'Finalize landing page design', completed: true, time: '04:20 PM' },
      { id: '2', text: 'Team sync meeting', completed: false, time: 'Missed' }, // Incomplete
    ],
  },
  {
    title: 'Jan 27, 2026',
    data: [
      { id: '3', text: 'Fix navigation bugs', completed: true, time: '02:15 PM' },
      { id: '4', text: 'Update profile UI', completed: true, time: '11:30 AM' },
      { id: '5', text: 'Research color palettes', completed: false, time: 'Expired' }, // Incomplete
    ],
  },
  {
    title: 'Jan 28, 2026',
    data: [
      { id: '3', text: 'Fix navigation bugs', completed: true, time: '02:15 PM' },
      { id: '4', text: 'Update profile UI', completed: true, time: '11:30 AM' },
      { id: '5', text: 'Research color palettes', completed: false, time: 'Expired' }, // Incomplete
    ],
  },
  {
    title: 'Jan 29, 2026',
    data: [
      { id: '3', text: 'Fix navigation bugs', completed: true, time: '02:15 PM' },
      { id: '4', text: 'Update profile UI', completed: true, time: '11:30 AM' },
      { id: '5', text: 'Research color palettes', completed: false, time: 'Expired' }, // Incomplete
    ],
  },
  {
    title: 'Jan 30, 2026',
    data: [
      { id: '3', text: 'Fix navigation bugs', completed: true, time: '02:15 PM' },
      { id: '4', text: 'Update profile UI', completed: true, time: '11:30 AM' },
      { id: '5', text: 'Research color palettes', completed: false, time: 'Expired' }, // Incomplete
    ],
  },
  {
    title: 'Jan 31, 2026',
    data: [
      { id: '3', text: 'Fix navigation bugs', completed: true, time: '02:15 PM' },
      { id: '4', text: 'Update profile UI', completed: true, time: '11:30 AM' },
      { id: '5', text: 'Research color palettes', completed: false, time: 'Expired' }, // Incomplete
    ],
  },
];

function PreviousTodoList() {
  const renderItem = ({ item }:any) => {
    // Dynamic styles based on status
    const accentColor = item.completed ? '#00BFA5' : '#FF8A80';
    const statusIcon = item.completed ? 'check' : 'close';
    const statusLabel = item.completed ? `Completed at ${item.time}` : `Incomplete (${item.time})`;

    return (
      <View style={styles.historyCard}>
        {/* Left accent line changes color */}
        <View style={[styles.statusLine, { backgroundColor: item.completed ? '#CBBAFF' : '#FF8A80' }]} />
        
        <View style={styles.cardContent}>
          <View style={styles.taskInfo}>
            <Text style={[styles.taskText, !item.completed && styles.incompleteText]}>
              {item.text}
            </Text>
            <View style={styles.timeRow}>
              <MaterialCommunityIcons 
                name={item.completed ? "clock-check-outline" : "clock-alert-outline"} 
                size={12} 
                color={accentColor} 
              />
              <Text style={[styles.timeText, { color: accentColor }]}>{statusLabel}</Text>
            </View>
          </View>

          {/* Icon Circle changes color and icon */}
          <View style={[styles.statusCircle, { backgroundColor: accentColor }]}>
            <MaterialCommunityIcons name={statusIcon} size={16} color="white" />
          </View>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }:any) => (
    <View style={styles.headerContainer}>
      <View style={styles.dot} />
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <ScreenLayout>
      <View style={styles.main}>
        <View style={styles.topInfo}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Review your past productivity</Text>
        </View>

        <SectionList
          sections={HISTORY_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="clipboard-off-outline" size={80} color="#E0F7FA" />
              <Text style={styles.emptyText}>No Todos Found</Text>
            </View>
          }
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  topInfo: { paddingHorizontal: 24, paddingVertical: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  listPadding: { paddingHorizontal: 24, paddingBottom: 40 },

  // Section Header
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CBBAFF', marginRight: 10 },
  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: 1 },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0', marginLeft: 15 },

  // History Card
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
  taskInfo: { flex: 1 },
  taskText: { fontSize: 16, fontWeight: '600', color: '#2D3142', marginBottom: 4 },
  incompleteText: { color: '#7D7D7D' }, // Slightly dimmer for incomplete
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12, fontWeight: '600' },
  
  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // Empty State
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#CCC', fontSize: 18, fontWeight: '600', marginTop: 10 },
});

export default PreviousTodoList;
