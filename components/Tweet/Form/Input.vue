<template>
    <div>
        <div class="flex items-center flex-shrink-0 p-4 pb-0">

            <div class="flex w-12 items-top">
                <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 
                rounded-full">
            </div>

            <div class="w-full p-2">
                <textarea
                v-model="text" 
                class="w-full h-10 text-lg text-gray-900 
                placeholder:text-gray-400 bg-transparent border-0 
                dark:text-white focus:ring-0"></textarea>
            </div>

        </div>

            <div>
                <button @click="handleFormSubmit">Tweet</button>
            </div>

    </div>
</template>
<script setup>

const emits = defineEmits(['onSubmit'])
const text = ref('')

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

function handleFormSubmit () {
    emits('onSubmit', {
        text: text.value
    })
}

</script>