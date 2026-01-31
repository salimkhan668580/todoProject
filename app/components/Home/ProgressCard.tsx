import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/app/service/todoService';
import { TodoItem } from '@/app/types/todo';

function ProgressCard() {
  const { data } = useQuery({
    queryKey: ['todos', 'today'],
    queryFn: () => todoService.getTodosByDay('today'),
  });

  const todos: TodoItem[] = (data?.data || []).filter(t => !t.isDeleted);
  const total = todos.length;
  const done = todos.filter(t => t.isDone).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const firstTitle = todos[0]?.title || 'No tasks yet';
  const secondTitle = todos[1]?.title || '';

  return (
    <LinearGradient
      colors={['#A2F3FF', '#CBBAFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.progressCard}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Most important task progress</Text>
        <View style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>×</Text>
        </View>
      </View>

      <Text style={styles.taskCount}>
        {done}/{total || 1}
      </Text>

      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percent}%` },
            ]}
          />
        </View>
        <Text style={styles.progressPercent}>{percent}%</Text>
      </View>

      <View style={styles.tagRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText} numberOfLines={1}>
            {firstTitle}
          </Text>
        </View>
        {secondTitle ? (
          <View style={styles.tag}>
            <Text style={styles.tagText} numberOfLines={1}>
              {secondTitle}
            </Text>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Progress Card
  progressCard: { borderRadius: 24, padding: 20, marginBottom: 25 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { color: '#2D3142', fontSize: 18, fontWeight: '700', width: '85%' },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: '#666', fontSize: 12 },
  taskCount: { color: '#2D3142', fontSize: 16, fontWeight: '600', marginVertical: 10 },
  progressBarWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 3,
    marginRight: 10,
  },
  progressBarFill: { height: '100%', backgroundColor: '#E91E63', borderRadius: 3 },
  progressPercent: { fontWeight: 'bold', color: '#2D3142' },
  tagRow: { flexDirection: 'row', gap: 10 },
  tag: { flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 8 },
  tagText: { fontSize: 10, color: '#777' },
});

export default ProgressCard;
