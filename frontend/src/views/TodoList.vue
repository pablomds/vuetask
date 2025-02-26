<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTodosStore } from '@/store/todoStore';
import { ChevronDown, FilePlus, Circle, Trash, Pencil } from 'lucide-vue-next';
import PrivateNavBar from '@/components/PrivateNavBar.vue';
const store = useTodosStore();

const todos = computed(() => store.todos);

const todoInitialState = {
    id: undefined,
    text: "",
    isFinished: false
}

let newTodo = ref(todoInitialState)
let addTaskFormDisplay = ref(false);

const addNewTodo = () => {
    const { text, id, isFinished } = newTodo.value;

    if (text.trim()) {
        if (id !== undefined && id !== null) {
            store.updateTodo(id, text, isFinished);
        } else {
            store.addTodo(text);
        }

        newTodo.value = { id: undefined, text: '', isFinished: false };
    }
    addTaskFormDisplay.value = false;
};

const editTodo = (todo: any) => {
    addTaskFormDisplay.value = true;
    newTodo.value = {
        id: todo.id,
        text: todo.text,
        isFinished: todo.isFinished
    }
};
</script>

<template>
    <div class="h-screen w-screen flex flex-col gap-y-11 px-6 pb-6 overflow-x-hidden">
        <PrivateNavBar />
        <div class="flex flex-col gap-y-11 md:px-36 lg:px-48 xl:px-60 2xl:px-80">
            <h1 class="text-5xl text-center text-primary-black font-semibold">
                TODO LIST
            </h1>
            <div class="flex flex-row justify-between">
                <button @click="addTaskFormDisplay = !addTaskFormDisplay" class="bg-primary-black text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base cursor-pointer">Add Task</button>
                <div class="w-[100px] flex flex-row justify-between px-2 py-[10px] rounded-[10px] bg-primary-black text-[#DDD0C8]"> 
                    All
                    <ChevronDown class="h-6 w-6" stroke-width={1} />
                </div>
            </div>
            <form v-if="addTaskFormDisplay" @submit.prevent="addNewTodo" class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-y-0.5">
                        <label class="text-base" for="password">New Task</label>
                        <div class="flex items-center border border-primary-black bg-white/50 rounded-[10px] p-[10px] gap-x-3 justify-between">
                            <div class="flex gap-x-3 flex-grow">
                                <FilePlus class="text-primary-black/80" stroke-width={1} />
                                <input v-model="newTodo.text" type="text" placeholder="Enter a new todo" class="outline-none text-primary-black w-full">
                            </div>
                        </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="bg-primary-black text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base max-w-[110px] cursor-pointer">Add</button>
                </div>
            </form>
            <ul v-if="todos.length" class="bg-white flex flex-col gap-y-6 p-[10px] rounded-[10px]">
                <li v-for="todo in todos" :key="todo.id" class="flex flex-row bg-[#DDD0C8]/50 rounded-[10px] p-[10px] items-center justify-between">
                    <div class="flex flex-row gap-x-2">
                        <Circle stroke-width={1} />
                        <span>{{ todo.text }}</span>
                    </div>
                    <div class="flex flex-row gap-x-2">
                        <div v-on:click="editTodo(todo)" class="bg-white rounded-[5px] p-2 cursor-pointer">
                            <Pencil class="w-4 h-4" stroke-width={1} />
                        </div>
                        <div class="bg-white rounded-[5px] p-2">
                            <Trash class="w-4 h-4" stroke-width={1} />
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-center" v-else>
                <span class="text-3xl text-primary-black font-semibold">Add your first Task !</span>
            </div>
        </div>
    </div>
</template>

