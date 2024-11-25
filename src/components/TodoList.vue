<template>
  <div
    v-for="status in todoStore.statuses"
    :key="status"
    :status="status"
    class="p-4 rounded h-full flex flex-col"
  >
    <h2 class="font-bold text-lg mb-4">{{ status }}</h2>
    <div
      class="column-holder flex-1"
      @dragover.prevent="onDragOverColumn($event, status)"
      @drop="onDrop($event, status)">
      <TodoItem
        v-for="(task, index) in todoStore.tasksByStatus[status]"
        :key="task.id"
        :task="task"
        :index="index"
        draggable="true"
        @dragstart="onDragStart(task, index)"
        @dragover.prevent="onDragOverTask($event, index)"
      /> 
    </div>
  </div>
</template>

<script setup>
  import { useTodoStore } from '../stores/todoStore';
  import TodoItem from './TodoItem.vue';
  import { ref } from 'vue';

  const todoStore = useTodoStore();

  todoStore.fetchTodoData();

  const draggedTask = ref(null);
  const draggedIndex = ref(null);
  const dragging = ref(false);
  const dropIndex = ref(null);

  const onDragStart = (task, index) => {
    draggedTask.value = task;
    draggedIndex.value = index;
    dragging.value = true;
  };

  const onDragOverColumn = (event, status) => {
    const column = todoStore.tasksByStatus[status];
    const offsetY = event.offsetY;

    if (!column.length) {
      dropIndex.value = 0;
    } else {
      if (offsetY < 10) {
        dropIndex.value = 0;
      }
    }
  };

  const onDragOverTask = (event, index) => {
    const rect = event.target.getBoundingClientRect();
    const isBefore = event.clientY < rect.top + rect.height / 2;
    dropIndex.value = isBefore ? index : index + 1;
  };

  const onDrop = (event, status) => {
    todoStore.updateTaskStatus(draggedTask.value, status, dropIndex.value);
  };
</script>

<style lang="scss">
  .column-holder {
    min-height: 200px;
  }
</style>
