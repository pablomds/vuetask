<script setup>
import { useRouter } from "vue-router";
const route = useRouter();
defineProps({
  buttonLabel: String,
  routePath: String,
})

const goTo = (path) => route.push(path)

</script>

<template>
    <div class="px-4 pt-6">
        <div class="flex flex-col">
            <div class="flex justify-between">
                <div class="flex items-center gap-x-1">
                    <ZenTaskIcon class="w-9 h-9"/>
                    <div class="text-3xl font-semibold text-[#323232]">VueTask</div>
                </div>
                <button @click="goTo(routePath)" class="bg-[#323232] text-white px-10 py-[10px] rounded-[10px] shadow-md shadow-primary-black/50 text-base cursor-pointer">{{buttonLabel}}</button>
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