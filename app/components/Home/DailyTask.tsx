import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/app/service/todoService';
import { TodoItem } from '@/app/types/todo';
import Svg, { Circle } from 'react-native-svg';

function DailyTask() {
  const { data } = useQuery({
    queryKey: ['todos', 'today'],
    queryFn: () => todoService.getTodosByDay('today'),
  });

  const todos: TodoItem[] = (data?.data || []).filter(t => !t.isDeleted);
  const total = todos.length;
  const done = todos.filter(t => t.isDone).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const size = 90;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const strokeDashoffset =
    circumference - (clampedPercent / 100) * circumference;

  return (
    <View style={styles.goalCard}>
      <View style={styles.goalInfo}>
        <Text style={styles.goalTitle}>Daily Goal</Text>
        <View style={styles.badgeRow}>
          <View style={styles.tealBadge}>
            <Text style={styles.badgeText}>
              {done}/{total || 1}
            </Text>
          </View>
          <Text style={styles.tasksLabel}>Tasks</Text>
        </View>
        <Text style={styles.goalDescription}>
          You marked {done}/{total || 1} tasks{"\n"}are done
        </Text>
      </View>

      <View style={styles.circularProgressContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            stroke="#F0F0F0"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle based on percent */}
          <Circle
            stroke="#A2F3FF"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.innerCircle}>
          <View style={styles.iconBox}>
            <View style={styles.iconPlaceholder} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Daily Goal Card
  goalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalInfo: { flex: 1 },
  goalTitle: { fontSize: 20, color: '#7D7D7D', fontWeight: '500', marginBottom: 15 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tealBadge: {
    backgroundColor: '#00BFA5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  tasksLabel: { fontSize: 18, fontWeight: 'bold', color: '#2D3142' },
  goalDescription: { color: '#9E9E9E', fontSize: 14, lineHeight: 20 },

  // Progress Circle
  circularProgressContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerCircle: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: { backgroundColor: '#00BFA5', padding: 12, borderRadius: 12 },
  iconPlaceholder: { width: 24, height: 24, borderWidth: 2, borderColor: 'white', borderRadius: 4 },
});

export default DailyTask;