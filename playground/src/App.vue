<script setup lang="ts">
import { ref } from "vue"

const inputText = ref("")

interface Todolist {
  text: string
  completed: boolean
}

const todolist = ref<Todolist[]>([])

function addTodo() {
  todolist.value.push({ text: inputText.value, completed: false })
  inputText.value = ""
}

function deleteTodo(index: number) {
  todolist.value.splice(index, 1)
}
</script>

<template>
  <div>
    <span>todo thing: </span>
    <input type="text" v-model="inputText" />
    <button @click="addTodo">add</button>
  </div>

  <div>Todolist:</div>
  <div>
    <div
      v-for="(todo, i) in todolist"
      class="border-1 flex justify-between border-solid border-black px-4 py-2"
    >
      <span :class="[todo.completed && 'line-through']">{{ todo.text }}</span>

      <div>
        <button @click="todo.completed = !todo.completed">
          {{ todo.completed ? "restore" : "complete" }}
        </button>

        <button @click="deleteTodo(i)" class="bg-red">delete</button>
      </div>
    </div>
  </div>
</template>
