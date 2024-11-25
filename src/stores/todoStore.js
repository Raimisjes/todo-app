// src/stores/todoStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useTodoStore = defineStore('todoStore', () => {
  // State
  const authors = ref([]);
  const statuses = ref([]);
  const tasks = ref([]);
  let confirmRemoveID = ref('');

  const tasksByStatus = computed(() =>
    statuses.value.reduce((acc, status) => {
      acc[status] = tasks.value.filter((task) => task.current_column
      === status);
      return acc;
    }, {})
  );

  // Actions
  const fetchTodoData = async () => {
    try {
      const response = await axios.get('todoData.json');

      statuses.value = response.data.columns;
      authors.value = response.data.authors;
      tasks.value = response.data.tasks;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTask = (author_id, title) => {
    const newTodo = {
      author_id,
      current_column: 'To do',
      date_created: Date.now(),
      id: '?',
      title,
    };
    tasks.value.push(newTodo);
  };

  const updateTaskStatus = (task, newStatus, newIndex) => {
    const oldIndex = tasks.value.indexOf(task);
    
    if (oldIndex !== -1) {
      tasks.value.splice(oldIndex, 1);
    }

    const newColumnTasks = tasks.value.filter((t) => t.current_column === newStatus);

    tasks.value.splice(
      newColumnTasks.length ? tasks.value.indexOf(newColumnTasks[0]) + newIndex :tasks.value.length,
      0,
      { ...task, current_column: newStatus }
    );
  };

  const removeTask = (id) => {
    if(confirmRemoveID.value !== id){
      confirmRemoveID.value = id;
      return;
    }
    if (confirmRemoveID.value === id) {
      tasks.value = tasks.value.filter(task => task.id !== id);
      confirmRemoveID.value = '';
    }
  };

  return {
    tasks,
    statuses,
    tasksByStatus,
    confirmRemoveID,
    fetchTodoData,
    addTask,
    updateTaskStatus,
    removeTask,
  };
});

