<script setup>
import TodoList from './components/TodoList.vue';
</script>

<template>
  <div>
    <h1 class="text-center text-4xl font-bold mb-4">To-Do List</h1>
    <div class="grid grid-cols-4 gap-4">
      <TodoList />
    </div>
  </div>
</template>

<style scoped></style>
