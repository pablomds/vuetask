<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
const props = defineProps({
  options: Array,
  modelValue: String // for v-model binding
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

onClickOutside(dropdownRef, closeDropdown);

const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>

<template>
    <div 
      class="relative block w-[120px] rounded-[10px] px-2 py-[10px] bg-primary-black text-primary-beige cursor-pointer text-left select-none" 
      ref="dropdownRef"
    >
      <button class="w-full flex flex-row justify-between text-primary-beige cursor-pointer" @click="toggleDropdown">
        {{ modelValue || "Select" }}
        <ChevronDown class="h-6 w-6" stroke-width="1" />
      </button>
  
      <ul 
        v-if="isOpen" 
        class="absolute left-0 top-full mt-2 w-full flex flex-col bg-primary-black rounded-[10px] list-none z-50"
      >
        <li 
          v-for="(option, index) in options" 
          :key="index" 
          @click="selectOption(option)"
          class="p-4 cursor-pointer hover:bg-primary-beige/20"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
