<template>
<div @click="cancel()" class="cursor-pointer fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] max-w-[350px] h-[135px] bg-white rounded overflow-x-scroll hide-scroll shadow-sm">
        <div class="flex items-center p-5">
            <div class="relative" @click="openFileInput" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                <div v-if="user.image" class="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl">
                    <img :src="this.apiUrl + '/static/get' + user.image.substring(1)" alt="" class="w-full h-full object-cover" />
                    <input type="file" name="file" style="display: none" accept="image/*" ref="imageInput" @change="handleFileChange" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                </div>

                <div v-else class="relative w-24 h-24 text-4xl border-2 border-[#1c355d] font-bold shadow-2xl rounded-full flex items-center justify-center text-center overflow-hidden">
                    <span class="text-[#2691d9]">{{ user.username ? user.username[0].toUpperCase() : "" }}</span>
                    <span class="text-[#1c355d]">{{ user.username ? user.username.slice(-1).toUpperCase() : "" }}</span>
                    <input type="file" name="file" style="display: none" accept="image/*" ref="imageInput" @change="handleFileChange" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                </div>
                <div v-if="isHovered" class="absolute inset-x-0 bottom-0 h-12 w-24 flex items-center justify-center bg-gray-700 bg-opacity-20 rounded-b-full">
                    <img src="@/assets/images/Camera.svg" alt="" width="24" height="24" />
                </div>
            </div>

            <div class="ml-5">
                <p class="font-bold text-2xl mb-2">{{ user.username }}</p>
                <p class="text-[#1c355d] text-sm">{{ user.role }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            showProfile: false,
            isHovered: false,
            username: "",
            image: "",
            selectedFile: "",
        };
    },

    mounted() {
        this.username = this.user.username;
        this.role = this.user.role;
    },

    props: {
        cancelViewProfile: {
            type: Function,
            required: true,
        },

        user: {
            type: Object,
            required: true,
        },

        getProfile: {
            type: Function,
            required: true,
        },
    },

    methods: {
        cancel() {
            this.cancelViewProfile();
        },

        openFileInput() {
            this.$refs.imageInput.click();
        },

        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.image = URL.createObjectURL(this.selectedFile);
        },

        addEdit() {
            this.showProfile = false;
        },

        updateProfile() {
            let formData = new FormData();
            formData.append("_id", this.user._id);
            formData.append("image", this.selectedFile);
            formData.append("username", this.username);
            formData.append("gender", this.gender);
            formData.append("role", this.role);
            if (this.password != "" && this.repeat_password != "") {
                formData.append("password", this.password);
                formData.append("repeat_password", this.repeat_password);
            }

            axios
                .put(this.apiUrl + "/user", formData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokenReceiver"),
                    },
                })
                .then((res) => {
                    this.getAllUsers();
                    this.cancel();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
