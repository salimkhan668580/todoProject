import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminScreenLayout from "../../AdminLayout/AdminScreenLayout";
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AdminNevigation';
import { useQuery } from '@tanstack/react-query';
import { childrenService } from '@/app/service/childrenService';

function Stats() {
  const route = useRoute<RouteProp<RootStackParamList, 'stats'>>();
  const { userId } = route.params;
  
  // Set initial state to 'Month' to match your response example
  const [filter, setFilter] = useState('Month'); 

  // Fetch stats whenever userId or filter changes
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['stats', userId, filter],
    queryFn: () => childrenService.getStats(userId, filter.toLowerCase()),
    enabled: !!userId,
  });

  // Accessing the data dynamically based on the filter key (e.g., response.data.Month)
  const activeStats = response?.data?.[filter];

  if (isLoading) {
    return (
      <AdminScreenLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#CBBAFF" />
        </View>
      </AdminScreenLayout>
    );
  }

  if (isError || !activeStats) {
    return (
      <AdminScreenLayout>
        <View style={styles.center}>
          <MaterialCommunityIcons name="database-off" size={48} color="#EEE" />
          <Text style={styles.subtitle}>No data available for this period.</Text>
        </View>
      </AdminScreenLayout>
    );
  }

  return (
    <AdminScreenLayout>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Performance</Text>
          <Text style={styles.subtitle}>Detailed task analytics</Text>
        </View>

        {/* --- FILTER BUTTONS --- */}
        <View style={styles.filterContainer}>
          {['Week', 'Month', 'Year'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.filterBtn, filter === item && styles.activeFilterBtn]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- STATS CARDS --- */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: '#CBBAFF' }]}>
            <Text style={styles.statLabel}>Assigned</Text>
            <Text style={styles.statValue}>{activeStats.assigned}</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#00BFA5' }]}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={[styles.statValue, { color: '#00BFA5' }]}>{activeStats.completed}</Text>
          </View>
        </View>

        {/* --- BAR CHART VISUAL --- */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{filter}ly Progress</Text>
            {/* Fixed: Changed <div> to <View> */}
            <View style={styles.legend}>
              <View style={[styles.dot, { backgroundColor: '#00BFA5' }]} />
              <Text style={styles.legendText}>Task Success</Text>
            </View>
          </View>

          <View style={styles.barsRow}>
            {activeStats.days.map((day: string, index: number) => {
              // Logic: If there's 100% progress, bar is full (100%). 
              // Otherwise, we show a minimum of 10% for visual consistency.
              const barHeight = activeStats.percent > 0 ? activeStats.percent : 10;
              return (
                <View key={index} style={styles.barColumn}>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { height: `${barHeight}%` }]} />
                  </View>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* --- COMPLETION PERCENTAGE CARD --- */}
        <View style={styles.percentCard}>
          <View style={styles.percentCircle}>
            <Text style={styles.percentText}>{activeStats.percent}%</Text>
          </View>
          <View style={styles.percentInfo}>
            <Text style={styles.percentTitle}>Productivity Score</Text>
            <Text style={styles.percentSub}>Based on {filter.toLowerCase()}ly average</Text>
          </View>
          <MaterialCommunityIcons name="trending-up" size={28} color="#00BFA5" />
        </View>

      </ScrollView>
    </AdminScreenLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  main: { flex: 1, backgroundColor: '#F9FFFF', paddingHorizontal: 20 },
  header: { marginTop: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#888' },

  // Filters
  filterContainer: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 15, padding: 5, marginBottom: 25, elevation: 2 },
  filterBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeFilterBtn: { backgroundColor: '#CBBAFF' },
  filterText: { fontWeight: '700', color: '#AAA' },
  activeFilterText: { color: '#FFF' },

  // Summary Cards
  statsRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  statCard: { flex: 1, backgroundColor: '#FFF', padding: 15, borderRadius: 20, borderLeftWidth: 5, elevation: 2 },
  statLabel: { fontSize: 12, color: '#AAA', fontWeight: '700', textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '800', color: '#2D3142', marginTop: 5 },

  // Chart
  chartContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 25, elevation: 2, marginBottom: 25 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: 16, fontWeight: '700', color: '#2D3142' },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: '#888', fontWeight: '600' },
  barsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150 },
  barColumn: { alignItems: 'center', flex: 1 },
  barBackground: { width: 12, height: 120, backgroundColor: '#F0F0F0', borderRadius: 10, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', backgroundColor: '#00BFA5', borderRadius: 10 },
  dayLabel: { marginTop: 10, fontSize: 10, fontWeight: '700', color: '#BBB' },

  // Percent Card
  percentCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginBottom: 40, elevation: 2 },
  percentCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 5, borderColor: '#CBBAFF', justifyContent: 'center', alignItems: 'center' },
  percentText: { fontSize: 14, fontWeight: '800', color: '#2D3142' },
  percentInfo: { flex: 1, marginLeft: 15 },
  percentTitle: { fontSize: 16, fontWeight: '700', color: '#2D3142' },
  percentSub: { fontSize: 12, color: '#AAA' },
});

export default Stats;