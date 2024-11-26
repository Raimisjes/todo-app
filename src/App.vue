<script setup>
import TodoList from './components/TodoList.vue';
import CreateTodoForm from './components/CreateTodoForm.vue';
import FilterForm from './components/FilterForm.vue';
</script>

<template>
  <div class="h-full">
    <h1 class="text-center text-4xl font-bold mb-4">To-Do List</h1>
    <CreateTodoForm />
    <FilterForm />
    <div class="wrapper">
      <div class="list-holder gap-2 h-full">
        <TodoList />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  overflow: auto;
  max-height: calc(100vh - 200px);
  justify-content: center;

  .list-holder {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    scrollbar-width: thin; 
    scrollbar-color: #888 #f1f1f1;

    > div {
      min-width: 250px;
    }

  }
  &::-webkit-scrollbar {
    width: 8px;         
    height: 8px;              
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;  
    border-radius: 10px;      
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;   
    border-radius: 10px;       
    border: 3px solid #f1f1f1; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;  
  }

  &::-webkit-scrollbar-corner {
    background: #f1f1f1;     
  }
}
</style>