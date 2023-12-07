<template>
    <div class="Noto-Serif-Khmer w-full h-[100vh] bg-[#eff3f6]">
        <div class="my-3 mx-5 text-2xl">ការកម្មង់</div>
        <div class="mx-5">
            <!-- <Waiting/>
            <InProgress/> -->
            <Done/>
        </div>
        <RouterView/> 
    </div>
</template>

<script>
    import Waiting from '../../components/public-screen/Waiting.vue';
    import InProgress from '../../components/public-screen/In-Progress.vue';
    import Done from '../../components/public-screen/Done.vue';
    import { RouterView } from 'vue-router';

    export default { 
        components: {Waiting, InProgress, Done, RouterView},
    };

    
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&family=Noto+Sans+Khmer&family=Noto+Serif+Khmer&display=swap');

.Noto-Serif-Khmer {
    font-family: 'Noto Serif Khmer', serif;
}
</style>