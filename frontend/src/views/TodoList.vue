<script setup>
import { ChevronDown, FilePlus, Circle, Trash, Pencil } from 'lucide-vue-next';
import PrivateNavBar from '@/components/PrivateNavBar.vue';
</script>

<template>
    <div class="h-screen w-screen flex flex-col gap-y-11 px-6 bg-[#DDD0C8]">
        <PrivateNavBar />
        <div class="flex flex-col gap-y-11 md:px-36 lg:px-48 xl:px-60 2xl:px-80">
            <h1 class="text-5xl text-center text-[#323232] font-semibold">
                TODO LIST
            </h1>
            <div class="flex flex-row justify-between">
                <button class="bg-[#323232] text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base">Add Task</button>
                <div class="w-[100px] flex flex-row justify-between px-2 py-[10px] rounded-[10px] bg-[#323232] text-[#DDD0C8]"> 
                    All
                    <ChevronDown class="h-6 w-6" stroke-width={1} />
                </div>
            </div>
            <div class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-y-0.5">
                        <label class="text-base" for="password">New Task</label>
                        <div class="flex items-center border border-[#323232] bg-white/50 rounded-[10px] p-[10px] gap-x-3 justify-between">
                            <div class="flex gap-x-3 flex-grow">
                                <FilePlus class="text-[#323232]/80" stroke-width={1} />
                                <input type="text" class="outline-none text-[#323232] w-full" placeholder="Create a task">
                            </div>
                        </div>
                </div>
                <div class="flex justify-end">
                    <button class="bg-[#323232] text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base max-w-[110px]">Add</button>
                </div>
            </div>
            <div class="bg-white flex flex-col gap-y-6 p-[10px] rounded-[10px]">
                <div class="flex flex-row bg-[#DDD0C8]/50 rounded-[10px] p-[10px] items-center justify-between">
                    <div class="flex flex-row gap-x-2">
                        <Circle stroke-width={1} />
                        <span>Created Task</span>
                    </div>
                    <div class="flex flex-row gap-x-2">
                        <div class="bg-white rounded-[5px] p-2">
                            <Pencil class="w-4 h-4" stroke-width={1} />
                        </div>
                        <div class="bg-white rounded-[5px] p-2">
                            <Trash class="w-4 h-4" stroke-width={1} />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row bg-[#DDD0C8]/50 rounded-[10px] p-[10px] items-center justify-between">
                    <div class="flex flex-row gap-x-2">
                        <Circle stroke-width={1} />
                        <span>Created Task 2</span>
                    </div>
                    <div class="flex flex-row gap-x-2">
                        <div class="bg-white rounded-[5px] p-2">
                            <Pencil class="w-4 h-4" stroke-width={1} />
                        </div>
                        <div class="bg-white rounded-[5px] p-2">
                            <Trash class="w-4 h-4" stroke-width={1} />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row bg-[#DDD0C8]/50 rounded-[10px] p-[10px] items-center justify-between">
                    <div class="flex flex-row gap-x-2">
                        <Circle stroke-width={1} />
                        <span>Created Task 2</span>
                    </div>
                    <div class="flex flex-row gap-x-2">
                        <div class="bg-white rounded-[5px] p-2">
                            <Pencil class="w-4 h-4" stroke-width={1} />
                        </div>
                        <div class="bg-white rounded-[5px] p-2">
                            <Trash class="w-4 h-4" stroke-width={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

