<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTodosStore } from '@/store/todoStore';
import { ChevronDown, FilePlus, Circle, CircleCheck, Trash, Pencil } from 'lucide-vue-next'

import { getUserTodos, createTodo, updateTodo } from '@/controllers/todosControllers';
import PrivateNavBar from '@/components/PrivateNavBar.vue';

const todoStore = useTodosStore();

const todos = computed(() => todoStore.todos);

const todoInitialState = {
    id: 0,
    task: "",
    is_finished: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
}

let newTodo = ref(todoInitialState);
let showTaskForm = ref(false);

const addOrEditTodo = async () => {

    const { task, id, is_finished } = newTodo.value;
    try {
        if (task.trim()) {
            if (id !== 0) {
                todoStore.updateTodo({ id, task });
                await updateTodo({ id, task, is_finished });
            } else {
                const createdTodoId = await createTodo(newTodo.value);
                todoStore.addTodo({ id: createdTodoId ?? 0, task });
            }
        }
    } catch (error) {
        console.log('error on addOrEditTodo()',error)
    }
    newTodo.value = todoInitialState;
    showTaskForm.value = false;
};

const editTodo = (todo: any) => {
    showTaskForm.value = true;
    newTodo.value = {
        id: todo.id,
        task: todo.task,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
        is_finished: todo.is_finished
    };
};

const handleTodoIsFinished = async (todo: any) => {
    const { id, task, is_finished } = todo;
    todoStore.updateTodoIsFinished(id, !is_finished);
    await updateTodo({id, task, is_finished: !is_finished})
};

const fetchUserTodos = async () => {
    try {
        const todos = await getUserTodos();
        todoStore.addTodos(todos);
    } catch (error) {
        console.log('error on fetchUserTodos', error)
    }
};

const sortedTodoList = computed(() =>
  [...todos.value].sort((a: any, b: any) => {
    if (a.is_finished !== b.is_finished) {
      return a.is_finished - b.is_finished;
    }
    return b.id - a.id;
  })
);



onMounted(() => {
    fetchUserTodos();
});

</script>

<template>
    <div class="h-screen w-screen flex flex-col gap-y-11 px-6 pb-6 overflow-x-hidden">
        <PrivateNavBar />
        <div class="flex flex-col gap-y-11 md:px-36 lg:px-48 xl:px-60 2xl:px-80">
            <h1 class="text-5xl text-center text-primary-black font-semibold">
                TODO LIST
            </h1>
            <div class="flex flex-row justify-between">
                <button @click="showTaskForm = !showTaskForm" class="bg-primary-black text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base cursor-pointer">Add Task</button>
                <div class="w-[100px] flex flex-row justify-between px-2 py-[10px] rounded-[10px] bg-primary-black text-[#DDD0C8]"> 
                    All
                    <ChevronDown class="h-6 w-6" stroke-width={1} />
                </div>
            </div>
            <form v-if="showTaskForm" @submit.prevent="addOrEditTodo" class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-y-0.5">
                        <label class="text-base" for="password">New Task</label>
                        <div class="flex items-center border border-primary-black bg-white/50 rounded-[10px] p-[10px] gap-x-3 justify-between">
                            <div class="flex gap-x-3 flex-grow">
                                <FilePlus class="text-primary-black/80" stroke-width={1} />
                                <input v-model="newTodo.task" type="text" placeholder="Enter a new todo" class="outline-none text-primary-black w-full">
                            </div>
                        </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="bg-primary-black text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base max-w-[110px] cursor-pointer">Add</button>
                </div>
            </form>
            <ul v-if="todos.length" class="bg-white flex flex-col gap-y-6 p-[10px] rounded-[10px]">
                <li v-for="todo in sortedTodoList" :key="todo.id" class="flex flex-row bg-[#DDD0C8]/50 rounded-[10px] p-[10px] items-center justify-between">
                    <div  class="flex flex-row gap-x-2">
                        <div class="cursor-pointer" @click="handleTodoIsFinished(todo)">
                            <CircleCheck v-if="todo.is_finished" stroke-width={1} />
                            <Circle v-else stroke-width={1} />
                        </div>
                        <span :class="todo.is_finished && 'line-through decoration-primary-black'">{{ todo.task }}</span>
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

