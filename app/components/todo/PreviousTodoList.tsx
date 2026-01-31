import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ScreenLayout from "@/app/Layout/ScreenLayout";
import { todoService } from "@/app/service/todoService";
import { TodoItem } from "@/app/types/todo";

// Helper to group todos by created date (YYYY-MM-DD)
const groupTodosByDate = (todos: TodoItem[]) => {
  const sections: { title: string; data: TodoItem[] }[] = [];
  const map = new Map<string, TodoItem[]>();

  todos.forEach((todo) => {
    const dateKey = todo.createdAt.slice(0, 10); // 2026-01-31
    if (!map.has(dateKey)) {
      map.set(dateKey, []);
    }
    map.get(dateKey)!.push(todo);
  });

  const sortedKeys = Array.from(map.keys()).sort((a, b) => (a < b ? 1 : -1));

  sortedKeys.forEach((key) => {
    const date = new Date(key);
    const title = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    sections.push({
      title,
      data: map.get(key)!,
    });
  });

  return sections;
};

function PreviousTodoList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ['todos', 'all'],
    queryFn: () => todoService.getAllTodos(),
  });

  const todos: TodoItem[] = (data?.data || []).filter(t => !t.isDeleted);
  const sections = groupTodosByDate(todos);
  const renderItem = ({ item }:any) => {
    // Map API fields to UI fields
    const completed = item.isDone;
    const accentColor = completed ? '#00BFA5' : '#FF8A80';
    const statusIcon = completed ? 'check' : 'close';
    const timeLabel = item.doneTime
      ? new Date(item.doneTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : '—';
    const statusLabel = completed ? `Completed at ${timeLabel}` : `Incomplete (${timeLabel})`;

    return (
      <View style={styles.historyCard}>
        {/* Left accent line changes color */}
        <View style={[styles.statusLine, { backgroundColor: completed ? '#CBBAFF' : '#FF8A80' }]} />
        
        <View style={styles.cardContent}>
          <View style={styles.taskInfo}>
            <Text style={[styles.taskText, !completed && styles.incompleteText]}>
              {item.title}
            </Text>
            <View style={styles.timeRow}>
              <MaterialCommunityIcons 
                name={completed ? "clock-check-outline" : "clock-alert-outline"} 
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
          sections={sections}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={() =>
            queryClient.invalidateQueries({ queryKey: ['todos', 'all'] })
          }
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
