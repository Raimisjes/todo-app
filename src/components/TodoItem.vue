<template>
  <div
    class="card mb-4 p-3 bg-white shadow-md rounded-lg"
    draggable="true"
    >
    <div class="header">
      <span class="text-[13px]"><b>Created:</b> {{ task.date_created }}</span>
    </div>
    <div class="body text-[13px]">{{ task.title }}</div>
    <div class="footer py-1">
      <button
        v-if="task.id !== confirmRemoveID"
        class="button text-[12px] p-1"
        @click="removeTask(task.id)">
        <font-awesome-icon :icon="['fa', 'trash']" /> Remove
      </button>
      <button
        v-if="task.id === confirmRemoveID"
        class="button text-[12px] p-1"
        @click="removeTask(task.id)">
        <font-awesome-icon :icon="['fa', 'check']" /> Confirm remove
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';
import { storeToRefs } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const todoStore = useTodoStore();
const { confirmRemoveID } = storeToRefs(todoStore);

library.add(faTrash, faCheck);

const props = defineProps({
  task: Object,
  index: Number
});

const removeTask = (id) => {
  useTodoStore().removeTask(id);
};
</script>

<style lang="scss">
 .card {
  cursor: pointer;

  > * {
    text-align: left;
  }
  .button {
    background-color: #e63030;
    color: #FFF;
  }
 }
</style>
