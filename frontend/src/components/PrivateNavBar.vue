<script setup>
import { useRouter } from 'vue-router';
import { LogOut } from 'lucide-vue-next';
import { logOut } from '@/controllers/userControllers';

const route = useRouter()

const logOutUser = async () => {
    await logOut();
    route.push('/login');
};
</script>

<template>
    <div class="pt-6">
        <div class="flex flex-col">
            <div class="flex justify-between">
                <div class="flex items-center gap-x-1">
                    <ZenTaskIcon class="w-9 h-9"/>
                    <div class="text-3xl font-semibold text-[#323232]">VueTask</div>
                </div>
                <LogOut @click="logOutUser" class="h-6 w-6 text-[#323232]" />
            </div>
            <div class="text-xs font-semibold">Vue your tasks, do more, stress less!</div>
        </div>
    </div>
</template>

<script>
import ZenTaskIcon from "@/assets/vuetasticon.svg?component";

export default {
    components: {
        ZenTaskIcon
    }
};
</script>