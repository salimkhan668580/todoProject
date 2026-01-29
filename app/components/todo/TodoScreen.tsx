import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenLayout from "../../Layout/ScreenLayout";

function TodoScreen() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([
    { id: '1', text: 'Illustrate design ideas', completed: true },
    { id: '2', text: 'Design graphic user interface', completed: false },
    { id: '3', text: 'Prepare moodboard for client', completed: false },
  ]);

  // Date & Time Logic
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Task Actions
  const addTask = () => {
    if (task.trim().length > 0) {
      setTodoList([{ id: Date.now().toString(), text: task, completed: false }, ...todoList]);
      setTask('');
    }
  };

  const toggleTask = (id:any) => {
    setTodoList(todoList.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteTask = (id:any) => {
    setTodoList(todoList.filter(item => item.id !== id));
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.main}
      >
        {/* --- HEADER SECTION --- */}
        <View style={styles.headerSection}>
          <View style={styles.topRow}>
            <Text style={styles.title}>My Tasks</Text>
            
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{formattedDate}</Text>
              </View>
              <View style={styles.timeBadge}>
                <MaterialCommunityIcons name="clock-outline" size={12} color="#00BFA5" />
                <Text style={styles.timeText}>{formattedTime}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subtitle}>{todoList.filter(t => !t.completed).length} pending tasks</Text>
        </View>

        {/* --- TASKS LIST --- */}
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.todoCard}>
              <TouchableOpacity 
                style={[styles.checkbox, item.completed && styles.checkedBox]} 
                onPress={() => toggleTask(item.id)}
              >
                {item.completed && <MaterialCommunityIcons name="check" size={14} color="white" />}
              </TouchableOpacity>
              
              <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.text}
              </Text>

              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color="#FF8A80" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* --- INPUT AREA --- */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#BBB"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={addTask}>
            <LinearGradient
              colors={['#A2F3FF', '#CBBAFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addBtn}
            >
              <MaterialCommunityIcons name="plus" size={28} color="#2D3142" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F9FFFF' },
  listContent: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 10 },
  
  // Header Styles
  headerSection: { paddingHorizontal: 20, marginVertical: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 28, fontWeight: '700', color: '#2D3142' },
  subtitle: { fontSize: 14, color: '#00BFA5', fontWeight: '500' },

  // Date & Time Badges
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateBadge: { backgroundColor: '#CBBAFF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  dateText: { color: '#FFF', fontWeight: '700', fontSize: 11 },
  timeBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E0F7FA', 
    paddingHorizontal: 8, 
    paddingVertical: 5, 
    borderRadius: 10, 
    gap: 4, 
    borderWidth: 1, 
    borderColor: '#B2EBF2' 
  },
  timeText: { color: '#00BFA5', fontWeight: '600', fontSize: 11 },

  // Todo Card Styles
  todoCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CBBAFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checkedBox: { backgroundColor: '#00BFA5', borderColor: '#00BFA5' },
  todoText: { flex: 1, fontSize: 16, color: '#2D3142', fontWeight: '500' },
  completedText: { textDecorationLine: 'line-through', color: '#BBB' },

  // Footer Input Styles
  inputWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingLeft: 20,
    paddingRight: 8,
    height: 65,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  input: { flex: 1, height: '100%', fontSize: 16, color: '#2D3142' },
  addBtn: { width: 50, height: 50, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});

export default TodoScreen;