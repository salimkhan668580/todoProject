import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import ScreenLayout from '@/app/Layout/ScreenLayout';
import ProgreeCard from "./ProgressCard";
import DailyTask from "./DailyTask";

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <ScrollView 
        style={styles.main} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProgreeCard/>

        {/* --- 2. TABS --- */}
        <View style={styles.tabContainer}>
          <Text style={styles.tabText}>Overview</Text>
          <View style={styles.activeTab}><Text style={styles.activeTabText}>Productivity</Text></View>
          <Text style={styles.tabText}>Docs</Text>
        </View>

        {/* --- 3. CHART CARD --- */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Completed in the last 7 days</Text>
          <View style={styles.chartContainer}>
              {[14, 18, 15, 16, 13, 10, 9].map((val, index) => (
                  <View key={index} style={styles.barColumn}>
                      <View style={styles.barContainer}>
                          <View style={[styles.barTeal, { height: val * 4 }]} />
                          <View style={[styles.barPurple, { height: val * 3 }]} />
                      </View>
                      <Text style={styles.dayText}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
                  </View>
              ))}
              <View style={styles.yAxis}>
                  <Text style={styles.yText}>20</Text>
                  <Text style={styles.yText}>10</Text>
                  <Text style={styles.yText}>0</Text>
              </View>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.taskTotal}>94 Tasks</Text>
            <Text style={styles.projectTotal}>7 Projects</Text>
          </View>
        </View>

    <DailyTask/>
     

        
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
  


  // Tabs
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 25 },
  tabText: { color: '#BBB', fontWeight: '600' },
  activeTab: { backgroundColor: '#00BFA5', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10 },
  activeTabText: { color: '#FFF', fontWeight: 'bold' },

  // Chart
  statsCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 20 },
  statsTitle: { color: '#888', marginBottom: 20 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 120, position: 'relative' },
  barColumn: { alignItems: 'center', justifyContent: 'flex-end', width: '11%' },
  barContainer: { width: 12, height: 80, backgroundColor: '#F0F0F0', borderRadius: 6, overflow: 'hidden', justifyContent: 'flex-end' },
  barTeal: { backgroundColor: '#00BFA5', width: '100%' },
  barPurple: { backgroundColor: '#D1C4E9', width: '100%' },
  dayText: { marginTop: 8, color: '#BBB', fontSize: 12 },
  yAxis: { justifyContent: 'space-between', height: 80, paddingLeft: 5 },
  yText: { color: '#CCC', fontSize: 10 },
  footerRow: { flexDirection: 'row', gap: 20, marginTop: 20 },
  taskTotal: { color: '#00BFA5', fontWeight: 'bold' },
  projectTotal: { color: '#D1C4E9', fontWeight: 'bold' },

});

export default HomeScreen;