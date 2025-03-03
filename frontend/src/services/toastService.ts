// toastService.ts
import { toast, type ToastOptions } from 'vue3-toastify';
import { h } from 'vue';
import CustomToast from '@/components/global/CustomToast.vue';

interface CustomToastOptions extends ToastOptions {
  title?: string;
}

export const customToast = {
  success(message: string, title: string = '', options: CustomToastOptions = {}) {
    return toast(
      (props: any) => {
        return h(CustomToast, {
          toastId: props.toastProps.toastId,
          message,
          title,
          type: 'success'
        });
      },
      {
        autoClose: 4000,
        ...options
      }
    );
  },
  
  error(message: string, title: string = '', options: CustomToastOptions = {}) {
    return toast(
      (props: any) => {
        return h(CustomToast, {
          toastId: props.toastProps.toastId,
          message,
          title,
          type: 'error'
        });
      },
      {
        autoClose: 5000,
        ...options
      }
    );
  },

  info(message: string, title: string = '', options: CustomToastOptions = {}) {
    return toast(
      (props: any) => {
        return h(CustomToast, {
          toastId: props.toastProps.toastId,
          message,
          title,
          type: 'info'
        });
      },
      {
        autoClose: 4000,
        ...options
      }
    );
  },

  warning(message: string, title: string = '', options: CustomToastOptions = {}) {
    return toast(
      (props: any) => {
        return h(CustomToast, {
          toastId: props.toastProps.toastId,
          message,
          title,
          type: 'warning'
        });
      },
      {
        autoClose: 4000,
        ...options
      }
    );
  }
};