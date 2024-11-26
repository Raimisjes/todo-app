<template>
  <div class="filter-form mb-3">
    <form>
      <div class="form-input ml-3 mb-2">
          <input
            type="text"
            id="filterTitle"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Filter by title" v-model="todoStore.filterTitle" />
      </div>
      <div class="form-input ml-3 mb-2">
        <select
          id="filterAuthor"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="todoStore.filterAuthor">
          <option selected value="">Filter by author</option>
          <option
            :value="author.id"
            v-for="(author, index) of todoStore.authors"
            :key="index">{{ author.display_name }}</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();
</script>

<style lang="scss">
.filter-form {
  form {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: flex-end;

    .form-input {
      max-width: 200px;
      width: 100%;

      label {
        text-align: right;
      }
    }
  }
}

</style>
