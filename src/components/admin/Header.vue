<template>
    <loading v-if="isLoading" />
<div v-if="user">
    <div v-if="user" class="bg-white dark:bg-black h-[8vh] flex justify-end pr-6 shadow-sm border-b-[0.2px] border-gray-300">
        <div class="flex w-1/4 justify-between items-center">
            <div class="flex w-1/5 justify-between">
                <img src="@/assets/images/BellSnooze.svg" alt="" width="30" height="30"/>
                <img src="@/assets/images/Setting.svg" alt="" width="30" height="30" />
            </div>

            <img v-if="user.image" :src="this.apiUrl + '/static/get' + user.image.substring(1)" alt="" class="rounded-full w-11 h-11 shadow-2xl object-cover" />
            <div v-else class="w-10 h-10 border border-gray-400 font-bold shadow-2xl rounded-full flex items-center justify-center text-center">
                {{ user.username ? user.username[0].toUpperCase() : '' }}
                {{ user.username ? user.username.slice(-1).toUpperCase() : '' }}
            </div>

            <div class="flex w-1/2 justify-between">
                <div>
                    <p class="text-xl font-semibold">{{ user.username }}</p>
                    <p class="text-gray-500">{{ user.role }}</p>
                </div>
                <div class="flex justify-between duration-300 cursor-pointer" @click="dropDownProfile">
                    <img v-if="isDropdownOpen" src="@/assets/images/ArrowDown.svg" alt="" width="20" height="20" class="-mt-2" />
                    <img v-else-if="!isDropdownOpen" src="@/assets/images/ArrowUp.svg" alt="" width="20" height="20" class="-mt-2">
                </div>
                <div class="absolute z-50 mt-[51px] bg-white shadow-md border border-gray-300 rounded w-48 right-4 p-4" v-if="isDropdownOpen">
                    <div class="flex flex-col justify-center">
                        <div @click="showProfile = user._id" class="flex justify-between my-1 mb-2.5 cursor-pointer hover:text-[#1C355D]">
                            <img src="@/assets/images/ProfileIcon.svg" alt="" width="16" height="20" />
                            <div class="ml-4 w-4/5 text-start">
                                <p>ប្រូហ្វាល់</p>
                            </div>
                        </div>
                        <div class="flex justify-between my-1 cursor-pointer hover:text-[#1C355D]">
                            <div class=" flex justify-between items-center">
                                <img src="@/assets/images/MoonLight.svg" alt="" width="20" height="24" />
                                <div class="ml-3 w-4/5 text-start">
                                    <p>ម៉ូដងងឹត</p>
                                </div>
                            </div>
                            <div class="flex items-center w-1/4 right-0 h-[30px]">
                                <button @click="isDark = !isDark" class="flex p-2 rounded-full mx-auto 2xl:mx-0 2xl:space-x-4 focus:outline-none hover:text-[#1C355D] hover:bg-opacity-20">
                                    <div class="2xl:w-16">
                                        <div v-if="isDark">
                                            <img src="@/assets/images/ToggleOn.svg" alt="" width="20" height="24" />
                                        </div>
                                        <div v-else>
                                            <img src="@/assets/images/ToggleOff.svg" alt="" width="20" height="24" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <hr class="my-2" />
                        <div class="flex justify-between my-1 cursor-pointer hover:text-[#1C355D]">
                            <img src="@/assets/images/HelpCenter.svg" alt="" width="20" height="24" />
                            <div class="ml-3 w-4/5 text-start">
                                <p>មជ្ឈមណ្ឌល​ជំនួយ</p>
                            </div>
                        </div>
                        <hr class="my-2" />
                        <button @click="logout" class="flex justify-between my-1 hover:text-red-500 cursor-pointer relative group">
                            <img src="@/assets/images/Logout.svg" alt="" width="20" height="24" class="max-w-full h-6 group-hover:opacity-50">
                            <img src="@/assets/images/LogoutActive.svg" alt="" width="20" height="24" class="max-w-full h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100"/>
                            <div class="ml-3 w-4/5 text-start hover:text-red-500">
                                <p>ចាកចេញ</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <AdminProfile :user="user" :get-profile="getProfile" v-if="showProfile == user._id" :cancel-view-profile="() => {showProfile = ''}"/> 
</div>
</template>

<script>
import AdminProfile from '../admin/AdminProfile.vue';

import axios from 'axios';
import loading from '../loading.vue';
export default {
    components: {
        AdminProfile,
        loading
    },

    data() {
        return {
            user: null,
            isDropdownOpen: false,
            isDark: true,
            apiUrl: import.meta.env.VITE_API_URL,
            showProfile: false,
            isLoading: false
        };
    },

    mounted() {
        this.getProfile();
    },

    methods: {
        cancelDropdown() {
            this.isDropdownOpen = false;
        },

        dropDownProfile() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        logout() {
            this.isLoading = true
            axios.post(this.apiUrl+'/auth/logout',  {
                name: 'idk'
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                localStorage.removeItem('tokenAdmin')
                this.$router.push("/")
                this.isLoading = false
            })
            .catch(error => {
                localStorage.removeItem('tokenAdmin')
                this.$router.push("/")
            })
        },

        getProfile() {
            const token = localStorage.getItem('tokenAdmin');

            axios.get(this.apiUrl+'/auth/me', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            })
        }
    },
};
</script>
