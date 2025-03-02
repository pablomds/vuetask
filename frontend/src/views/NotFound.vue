<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goTo = () => router.push('/login')
</script>

<template>
    <div class="w-screen h-screen overflow-hidden inset-0 flex flex-col justify-center items-center gap-y-8">
        <div class="text-2xl text-red-500">Page Not Found</div>
        <button @click="goTo()" class="bg-[#323232] text-white px-10 py-[10px] rounded-[10px] shadow-md shadow-primary-black/50 text-base cursor-pointer">Go back to login</button>
    </div>
</template>