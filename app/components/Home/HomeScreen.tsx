import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenLayout from '@/app/Layout/ScreenLayout';

function HomeScreen() {
  return (
    <ScreenLayout>
      <ScrollView 
        style={styles.main} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- 1. TASK PROGRESS CARD --- */}
        <LinearGradient
          colors={['#A2F3FF', '#CBBAFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.progressCard}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Most important task progress</Text>
            <View style={styles.closeBtn}><Text style={styles.closeBtnText}>×</Text></View>
          </View>
          <Text style={styles.taskCount}>2/5</Text>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '40%' }]} />
            </View>
            <Text style={styles.progressPercent}>40%</Text>
          </View>
          {/* FIXED: Changed <div> to <View> */}
          <View style={styles.tagRow}>
            <View style={styles.tag}><Text style={styles.tagText} numberOfLines={1}>Illustrate design ideas...</Text></View>
            <View style={styles.tag}><Text style={styles.tagText} numberOfLines={1}>Design graphic user...</Text></View>
          </View>
        </LinearGradient>

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

        {/* --- 4. DAILY GOAL CARD --- */}
        <View style={styles.goalCard}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>Daily Goal</Text>
            <View style={styles.badgeRow}>
              <View style={styles.tealBadge}>
                <Text style={styles.badgeText}>2/5</Text>
              </View>
              <Text style={styles.tasksLabel}>Tasks</Text>
            </View>
            <Text style={styles.goalDescription}>You marked 2/5 tasks{"\n"}are done</Text>
          </View>

          <View style={styles.circularProgressContainer}>
            <View style={styles.outerCircle}>
               <View style={styles.progressArc} />
               <View style={styles.innerCircle}>
                  <View style={styles.iconBox}>
                    {/* Placeholder for Icon */}
                    <View style={styles.iconPlaceholder} />
                  </View>
               </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
  
  // Progress Card
  progressCard: { borderRadius: 24, padding: 20, marginBottom: 25 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { color: '#2D3142', fontSize: 18, fontWeight: '700', width: '85%' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: '#666', fontSize: 12 },
  taskCount: { color: '#2D3142', fontSize: 16, fontWeight: '600', marginVertical: 10 },
  progressBarWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  progressBarBackground: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 3, marginRight: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#E91E63', borderRadius: 3 },
  progressPercent: { fontWeight: 'bold', color: '#2D3142' },
  tagRow: { flexDirection: 'row', gap: 10 },
  tag: { flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 8 },
  tagText: { fontSize: 10, color: '#777' },

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

  // Daily Goal Card
  goalCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalInfo: { flex: 1 },
  goalTitle: { fontSize: 20, color: '#7D7D7D', fontWeight: '500', marginBottom: 15 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tealBadge: { backgroundColor: '#00BFA5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  tasksLabel: { fontSize: 18, fontWeight: 'bold', color: '#2D3142' },
  goalDescription: { color: '#9E9E9E', fontSize: 14, lineHeight: 20 },
  
  // Progress Circle
  circularProgressContainer: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center' },
  outerCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  progressArc: { position: 'absolute', width: 90, height: 90, borderRadius: 45, borderWidth: 8, borderColor: '#A2F3FF', borderTopColor: 'transparent', borderRightColor: 'transparent', transform: [{ rotate: '-45deg' }] },
  innerCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  iconBox: { backgroundColor: '#00BFA5', padding: 12, borderRadius: 12 },
  iconPlaceholder: { width: 24, height: 24, borderWidth: 2, borderColor: 'white', borderRadius: 4 }
});

export default HomeScreen;