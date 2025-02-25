<script setup>
import { Mail, Lock, Eye } from 'lucide-vue-next';
</script>

<template>
    <div class="h-screen w-screen flex flex-col justify-between px-6">
        <NavBar buttonLabel="Register" />
        <div class="flex flex-col items-center gap-y-6">
            <div class="bg-white rounded-[25px] w-[342px] md:w-[500px] flex flex-col gap-y-9 px-3 py-5">
                <h1 class="text-4xl font-semibold text-[#323232] text-center">Welcome !</h1>
                <div class="flex flex-col gap-y-0.5">
                    <label class="text-base" for="email">Email</label>
                    <div class="flex items-center border border-[#323232] rounded-[10px] p-[10px] gap-x-3">
                        <Mail class="text-[#323232]/80" stroke-width=1 />
                        <input type="text" class="outline-none w-full text-[#323232]" placeholder="johndoe@gmail.com">
                    </div>
                </div>
                <div class="flex flex-col gap-y-0.5">
                    <label class="text-base" for="password">Password</label>
                    <div class="flex items-center border border-[#323232] rounded-[10px] p-[10px] gap-x-3 justify-between">
                        <div class="flex gap-x-3 flex-grow">
                            <Lock class="text-[#323232]/80" stroke-width={1} />
                            <input type="password" class="outline-none text-[#323232] w-full" placeholder="********">
                        </div>
                        <div>
                            <Eye class="text-[#323232]/80 cursor-pointer" stroke-width={1} />
                        </div>
                    </div>
                </div>
                <div>
                    <button class="w-full bg-[#323232] text-white px-10 py-[10px] rounded-[10px] shadow-xl text-base">Login</button>
                </div>
            </div>
            <div class="text-center">
                <span class="text-lg text-white">Don't have an account ?</span> <span class="text-lg underline text-white underline-offset-4">Register</span>
            </div>
        </div>
        <div/>
        <div class="custom-shape-divider-bottom-1740486853">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    class="shape-fill"></path>
            </svg>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        NavBar
    }
}
</script>