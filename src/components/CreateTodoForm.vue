<template>
  <div class="create-task-form">
    <h2 class="mb-1">Create task</h2>
    <form @submit="formSubmit($event)">
      <div class="form-input mr-3 mb-2">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task title</label>
          <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" v-model="newTitle"
          @input="resetForm()" />
      </div>
      <div class="form-input mr-3 mb-2">
        <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select
          id="author"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="newAuthor"
          @change="resetForm()">
          <option selected disabled value="">Choose an author</option>
          <option
            :value="author.id"
            v-for="(author, index) of todoStore.authors"
            :key="index">{{ author.display_name }}</option>
        </select>
      </div>
      <div class="mb-2">
        <button  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      </div>
      <div v-if="formError !== ''" class="form-error my-2">{{ formError }}</div>
      <div v-if="successMessage !== ''" class="form-success my-2">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';
import { ref } from 'vue';

let formError = ref('');
let successMessage = ref('');
let newTitle = ref('');
let newAuthor = ref('');
const todoStore = useTodoStore();

const isFormValid = () => {
  if(newAuthor.value === '') {
    formError.value = "Invalid task author";
    return false;
  }
  if(newTitle.value === '') {
    formError.value = "Invalid title";
    return false;
  }
  return true;
};

const resetForm = () => {
  formError.value = '';
  successMessage.value = '';
};

const formSubmit = (e) => {
  e.preventDefault();
  formError.value = "";
  if(!isFormValid()) {
    return;
  }
  todoStore.createTask(newTitle.value, newAuthor.value);
  successMessage.value = "Task successfully created.";
  newTitle.value = '';
  newAuthor.value = '';
};
</script>

<style lang="scss">
.create-task-form {
  h2 {
    font-weight: 600;
    text-align: left;
  }
  form {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;

    .form-input {
      max-width: 250px;
      width: 100%;

      label {
        text-align: left;
      }
    }
    .form-error {
      width: 100%;
      font-size: 12px;
      margin-top: 5px;
      color: #e63030;
      text-align: left;
    }
    .form-success {
      width: 100%;
      font-size: 12px;
      margin-top: 5px;
      color: #109c16;
      text-align: left;
    }
  }
}

</style>
