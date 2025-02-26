<script setup>
import { LogOut } from 'lucide-vue-next';
</script>

<template>
    <div class="px-4 pt-6">
        <div class="flex flex-col">
            <div class="flex justify-between">
                <div class="flex items-center gap-x-1">
                    <ZenTaskIcon class="w-9 h-9"/>
                    <div class="text-3xl font-semibold text-[#323232]">VueTask</div>
                </div>
                <LogOut class="h-6 w-6 text-[#323232]" />
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