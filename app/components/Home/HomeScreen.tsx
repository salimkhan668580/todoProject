import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenLayout from '@/app/Layout/ScreenLayout';
import { childrenService } from '@/app/service/childrenService';
import ProgreeCard from "./ProgressCard";
import DailyTask from "./DailyTask";

// Assuming you have access to the logged-in child's ID via your Auth context or similar
// For this example, I'll use a placeholder 'currentUserId'
const currentUserId = "697cecf87665a7ec9d9ac682"; 

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('Week'); // Default filter
  const queryClient = useQueryClient();

  // --- 1. Fetch Dynamic Stats ---
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ['stats', currentUserId, filter],
    queryFn: () => childrenService.getStats(currentUserId, filter.toLowerCase()),
    enabled: !!currentUserId,
  });

  const activeStats = response?.data?.[filter];

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['todos'] }),
      refetch()
    ]);
    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <ScrollView 
        style={styles.main} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00BFA5" />
        }
      >
        <ProgreeCard />

        {/* --- 2. TABS (Filters) --- */}
        <View style={styles.tabContainer}>
          {['Week', 'Month', 'Year'].map((item) => (
            <TouchableOpacity 
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.tabButton, filter === item && styles.activeTab]}
            >
              <Text style={[styles.tabText, filter === item && styles.activeTabText]}>
                {item}ly
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- 3. DYNAMIC CHART CARD --- */}
        <View style={styles.statsCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.statsTitle}>Productivity Score: {activeStats?.percent || 0}%</Text>
            <View style={styles.legend}>
              <View style={[styles.dot, { backgroundColor: '#00BFA5' }]} />
              <Text style={styles.legendLabel}>Done</Text>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color="#00BFA5" />
            </View>
          ) : isError || !activeStats ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No data for this period</Text>
            </View>
          ) : (
            <View style={styles.chartContainer}>
              {activeStats.days.map((day: string, index: number) => {
                // Use the percentage from API, min 5% for visibility
                const barHeight = activeStats.percent > 0 ? activeStats.percent : 5;
                
                return (
                  <View key={index} style={styles.barColumn}>
                    <View style={styles.barContainer}>
                      <View style={[styles.barTeal, { height: `${barHeight}%` }]} />
                    </View>
                    <Text style={styles.dayText}>{day}</Text>
                  </View>
                );
              })}
              
              <View style={styles.yAxis}>
                <Text style={styles.yText}>100%</Text>
                <Text style={styles.yText}>50%</Text>
                <Text style={styles.yText}>0%</Text>
              </View>
            </View>
          )}

          <View style={styles.footerRow}>
            <View style={styles.statBox}>
              <Text style={styles.taskTotal}>{activeStats?.assigned || 0}</Text>
              <Text style={styles.statSub}>Assigned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.projectTotal}>{activeStats?.completed || 0}</Text>
              <Text style={styles.statSub}>Completed</Text>
            </View>
          </View>
        </View>

        <DailyTask />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
  
  // Tabs
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 5, 
    marginVertical: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#00BFA5' },
  tabText: { color: '#BBB', fontWeight: '700', fontSize: 13 },
  activeTabText: { color: '#FFF' },

  // Chart
  statsCard: { backgroundColor: '#FFF', borderRadius: 25, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#CBBAFF' },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statsTitle: { color: '#2D3142', fontWeight: '700', fontSize: 15 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 10, color: '#888', fontWeight: '600' },
  
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 130, position: 'relative', marginTop: 10 },
  barColumn: { alignItems: 'center', justifyContent: 'flex-end', width: '11%' },
  barContainer: { width: 12, height: 100, backgroundColor: '#F5F5F5', borderRadius: 10, overflow: 'hidden', justifyContent: 'flex-end' },
  barTeal: { backgroundColor: '#00BFA5', width: '100%', borderRadius: 10 },
  dayText: { marginTop: 10, color: '#AAA', fontSize: 10, fontWeight: '700' },
  
  yAxis: { justifyContent: 'space-between', height: 100, paddingLeft: 8, borderLeftWidth: 1, borderLeftColor: '#F0F0F0' },
  yText: { color: '#CCC', fontSize: 9, fontWeight: '600' },
  
  footerRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, borderTopWidth: 1, borderTopColor: '#F9FFFF', paddingTop: 15 },
  statBox: { alignItems: 'center' },
  taskTotal: { color: '#2D3142', fontWeight: '800', fontSize: 18 },
  projectTotal: { color: '#00BFA5', fontWeight: '800', fontSize: 18 },
  statSub: { color: '#BBB', fontSize: 11, fontWeight: '600', marginTop: 2 },

  loaderContainer: { height: 130, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { height: 130, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#CCC', fontSize: 12, fontStyle: 'italic' }
});

export default HomeScreen;