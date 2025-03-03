<script setup>
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-vue-next';
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from "vue-router";
import { customToast } from '@/services/toastService';

import NavBar from '@/components/navbar.vue';
import axiosInstance from '@/utils/axios';

const router = useRouter();
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, "Password must at least have 6 characters").required('Password is required')
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const showPassword = ref(false);

const submitForm = handleSubmit(async (values) => {
  try {
    const response = await axiosInstance.post('/users/register', values); // Adjust the endpoint as necessary
    customToast.success("You're account was created! You can now login");
  } catch (error) {
    console.error('Form submission failed:', error);
    console.log('Error details:', error.response ? error.response.data : error);
    customToast.error("Register failed !");
  }
});

const goTo = () => router.push('/login')

</script>

<template>
    <div class="h-screen w-screen overflow-hidden flex flex-col justify-between px-6">
        <NavBar buttonLabel="Login" routePath="/login" />
        <form @submit.prevent="submitForm" class="flex flex-col items-center gap-y-6">
            <div class="bg-white rounded-[25px] w-[342px] md:w-[500px] flex flex-col gap-y-9 px-3 py-5 shadow-xl border-2 border-primary-black">
                <h1 class="text-4xl font-semibold text-primary-black text-center">Create an account</h1>
                <div class="flex flex-col gap-y-0.5">
                    <label class="text-base" for="name">Name <span v-if="nameError" class="text-red-500 text-sm italic">* {{ nameError }}</span></label>
                    <div class="flex items-center border border-primary-black rounded-[10px] p-[10px] gap-x-3">
                        <User class="text-primary-black/80" stroke-width={1} />
                        <input v-model="name" type="text" class="outline-none w-full text-primary-black" placeholder="John Doe">
                    </div>
                </div>
                <div class="flex flex-col gap-y-0.5">
                    <label class="text-base" for="email">Email <span v-if="emailError" class="text-red-500 text-sm italic">* {{ emailError }}</span></label>
                    <div class="flex items-center border border-primary-black rounded-[10px] p-[10px] gap-x-3">
                        <Mail class="text-primary-black/80" stroke-width={1} />
                        <input v-model="email" type="text" class="outline-none w-full text-primary-black bg-transparent peer autofill:bg-transparent focus:autofill:bg-transparent" placeholder="johndoe@gmail.com">
                    </div>
                </div>
                <div class="flex flex-col gap-y-0.5">
                    <label class="text-base" for="password">Password <span v-if="passwordError" class="text-red-500 text-sm italic">* {{ passwordError }}</span></label>
                    <div class="flex items-center border border-primary-black rounded-[10px] p-[10px] gap-x-3 justify-between">
                        <div class="flex gap-x-3 flex-grow">
                            <Lock class="text-primary-black/80" stroke-width={1} />
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" class="outline-none text-primary-black w-full" placeholder="********">
                        </div>
                        <div v-on:click="showPassword = !showPassword">
                            <Eye v-if="showPassword" class="text-primary-black/80 cursor-pointer" stroke-width={1} />
                            <EyeOff v-else class="text-primary-black/80 cursor-pointer" stroke-width={1} />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" class="w-full bg-primary-black shadow-md shadow-primary-black/50 cursor-pointer select-none text-white px-10 py-[10px] rounded-[10px] text-base">Register</button>
                </div>
            </div>
            <div class="text-center">
                <span class="text-lg text-white cursoir-pointer">Have an account ?</span> <span @click="goTo" class="text-lg underline text-white underline-offset-4 cursor-pointer">Login</span>
            </div>
        </form>
        <div/>
        <div class="custom-shape-divider-bottom-1740486853">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <defs>
                    <!-- Dégradé linéaire -->
                    <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#3A86FF" />
                        <stop offset="50%" stop-color="#8338EC" />
                        <stop offset="100%" stop-color="#DDD0C8" />
                    </linearGradient>
                </defs>

                <!-- Chemin principal avec dégradé -->
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    fill="url(#gradientFill)" />

                <!-- Même chemin avec motif superposé -->
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    fill="url(#dotPattern)" />
            </svg>
        </div>
    </div>
</template>