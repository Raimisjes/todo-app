<template>
  <div
    v-for="status in todoStore.statuses" :key="status" :status="status"
    class="flex flex-col p-4 rounded h-full"
  >
    <h2 class="font-bold text-lg mb-4">{{ status }}</h2>
    <div class="column-holder">
      <div v-for="task in filteredTasks(status)" class="card mb-4 p-2">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();

todoStore.fetchTodoData();

const filteredTasks = function (status) {
  return todoStore.tasks.filter(task => task.current_column === status);
};
</script>
