// src/stores/todoStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useTodoStore = defineStore('todoStore', () => {
  // State
  const authors = ref([]);
  const statuses = ref([]);
  const tasks = ref([]);

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

  return {
    tasks,
    statuses,
    fetchTodoData,
  };
});
