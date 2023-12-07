<template>
    <loading v-if="isLoading" />
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] max-w-[450px] max-h-fit bg-white rounded overflow-x-scroll hide-scroll shadow-sm">
        <div class="p-5">
            <div class="flex items-center justify-between pb-2.5 border-b-[#ccc] border-b">
                <div class="text-xl font-semibold">កែអ្នកប្រើប្រាស់</div>
                <button @click="cancel()" class="w-6 h-6 relative group -mt-6 -mr-2">
                    <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                    <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
                </button>
            </div>

            <div>
                <div class="py-2.5 flex flex-col items-start text-start">
                    <div>
                        <div id="profile" @click="openFileInput">
                            <div class="dashes"></div>
                            <label for="file" :style="{ backgroundImage: `url(${apiUrl}/static/get${user.image.substring(1)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" class="clicktext text-white rounded-full p-1.5" v-if="!image"><div class="text-white bg-gray-600/50 p-2">ចុចនៅទីនេះដើម្បីបញ្ចូលរូបភាព</div></label>
                            <img :src="image" alt="Selected Image" v-if="image" class="w-[200px] h-[200px] object-cover rounded-full" />
                            <input type="file" name="file" style="display: none" accept="image/*" ref="imageInput" @change="handleFileChange" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                        </div>
                    </div>
                    <input type="text" v-model="username" placeholder="បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />

                    <div class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none">
                        <label for="gender">ភេទ :</label>
                        <div class="flex justify-between w-3/5 mt-2">
                            <div class="flex justify-start">
                                <input v-model="gender" type="radio" name="gender" value="ប្រុស"> ប្រុស
                            </div>
                            <div class="flex justify-start mr-6">
                                <input v-model="gender" type="radio" name="gender" value="ស្រី"> ស្រី
                            </div>
                        </div>
                    </div>
                    <div class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none">
                        <label for="role">តួនាទី :</label>
                        <div class="flex justify-between w-3/4 mt-2">
                            <div class="flex justify-start">
                                <input v-model="role" type="radio" name="role" value="អ្នកគ្រប់គ្រងទិន្នន័យ">​អ្នកគ្រប់គ្រងទិន្នន័យ
                            </div>
                            <div class="flex justify-start">
                                <input v-model="role" type="radio" name="role" value="អ្នកទទួលការកម្មង់">អ្នកទទួលការកម្មង់
                            </div>
                        </div>
                    </div>
                </div>
                    <button @click="showChangePassword = true" class=" text-blue-400 mb-1">
                        <div class="ml-3">ផ្លាស់ប្តូរពាក្យសម្ងាត់</div>
                    </button>
                    <div :class="`${showChangePassword ? 'border border-black rounded-md h-32' : 'h-0'} overflow-hidden duration-300 flex flex-col items-end w-full`">
                        <button @click="showChangePassword = false; password=''; repeat_password=''" class="flex justify-end"><img src="@/assets/images/XBold.svg" alt="" class="w-5 group-hover:opacity-50 transition-opacity"></button>
                        <input type="password" v-model="password" placeholder="បញ្ចូលពាក្យសម្ងាត់" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                        <input type="password" v-model="repeat_password" placeholder="បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                    </div>
                <div class="flex items-center justify-end pt-2.5">
                    <button @click="updateUser" class="ml-10 rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5" type="submit">រួចរាល់</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

    
<script>
import axios from 'axios'
import loading from '../../loading.vue';

export default {
    components: {
        loading
    },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            username: '',
            image: '',
            password: '',
            repeat_password: '',
            gender: '',
            role: '',
            selectedFile: '',
            showChangePassword: false,
            isLoading: false
        };
    },
    mounted() {
        this.username = this.user.username
        this.gender = this.user.gender
        this.role = this.user.role
    },
    props: {
        cancelEditUser: {
            type: Function,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        getAllUsers: {
            type: Function,
            required: true
        },
    },
    methods: {
        cancel() {
            this.cancelEditUser()
        },

        openFileInput() {
            this.$refs.imageInput.click();
        },

        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.image = URL.createObjectURL(this.selectedFile);
        },

        addEdit() {
            this.showEditUserForm = false;
        },
        updateUser() {
            this.isLoading = true
            let formData = new FormData()
            formData.append('_id', this.user._id)
            formData.append('image', this.selectedFile)
            formData.append('username', this.username)
            formData.append('gender', this.gender)
            formData.append('role', this.role)
            if(this.password != '' && this.repeat_password!= '') {
                formData.append('password', this.password)
                formData.append('repeat_password', this.repeat_password)
            }
            
            
            axios.put(this.apiUrl+'/user', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                this.getAllUsers()
                this.cancel()
                this.isLoading = false
            })
            .catch(err => {
                if(err.response.data.message === "Token is not valid"){
                    alert(err.response.data.message + ". Please log in again");
                    localStorage.removeItem('tokenAdmin')
                    this.$router.push("/")
                }
                else {
                    alert(err.response.data.message);
                    this.isLoading = false
                }
            })
        }
    },
};
</script>
