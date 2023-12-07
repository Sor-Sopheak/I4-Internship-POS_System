<template>
<div class="Noto-Serif-Khmer h-full">

    <div class="w-full bg-[#e2e8ed]">
        <div class="grid h-full grid-cols-[15%,85%] text-black">
            <SideBar />
            <div>
                <Header />
                <RouterView />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SideBar from "../../components/admin/SideBar.vue";
import Header from "../../components/admin/Header.vue";
import {
    RouterView
} from "vue-router";

export default {
    components: {
        SideBar,
        Header,
        RouterView
    },

    data() {
        return {
            isDark: true,
        }
    },
};
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&family=Noto+Sans+Khmer&family=Noto+Serif+Khmer&display=swap');
    .Noto-Serif-Khmer {
        font-family: 'Noto Serif Khmer', serif;
    }

    .dark {
        background-color: black;
        color: white;
    }
</style>
