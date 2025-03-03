<template>
    <div class="flex flex-row items-center" :class="type">
      <div class="mr-3 text-xl">
        <span v-if="type === 'success'">✅</span>
        <span v-else-if="type === 'error'">❌</span>
        <span v-else-if="type === 'info'">ℹ️</span>
        <span v-else-if="type === 'warning'">⚠️</span>
      </div>
      <div class="flex-1">
        <div class="font-assistant font-semibold text-white">{{ message }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { toast } from 'vue3-toastify';
  
  export default defineComponent({
    name: 'CustomToast',
    props: {
      toastId: {
        type: [String, Number] as PropType<string | number>,
        required: true
      },
      message: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String as PropType<'success' | 'error' | 'info' | 'warning' | 'default'>,
        default: 'default'
      }
    },
    setup(props) {
      const closeToast = () => {
        toast.isActive(props.toastId);
      };
  
      return {
        closeToast
      };
    }
  });
  </script>
  