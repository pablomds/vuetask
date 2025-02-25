<template>
    <div class="flex flex-col gap-y-0.5">
        <label class="text-base" for="password">Password</label>
        <div class="flex items-center border border-[#323232] rounded-[10px] p-[10px] justify-between">
            <div class="flex gap-x-3">
                <Lock class="text-[#323232]/80" stroke-width=1 />
                <input type="password" class="outline-none w-full text-[#323232]" placeholder="********">
            </div>
            <div>
                <Eye class="text-[#323232]/80" stroke-width=1 />
            </div>
        </div>
    </div>
</template>