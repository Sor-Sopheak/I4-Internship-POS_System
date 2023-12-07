<template>
    <loading v-if="isLoading" />
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] max-w-[450px] bg-white rounded overflow-hidden shadow-sm">
        <div class="p-5">
            <div class="flex items-center justify-between pb-2.5 border-b-[#ccc] border-b">
                <div class="text-xl font-semibold">កែគ្រឿងបន្ថែម</div>
                <button @click="cancel()" class="w-6 h-6 relative group -mt-4 -mr-2">
                    <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                    <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
                </button>
            </div>

            <div>
                <div class="py-2.5 flex flex-col items-start text-start">
                    <div>
                        <div id="profile" @click="openFileInput">
                            <div class="dashes"></div>
                            <label for="file" :style="{ backgroundImage: `url(${apiUrl}/static/get${additional.image.substring(1)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" class="clicktext text-white rounded-full p-1.5" v-if="!image"><div class="text-white bg-gray-600/50 p-2">ចុចនៅទីនេះដើម្បីបញ្ចូលរូបភាព</div></label>
                            <img :src="image" alt="Selected Image" v-if="image" class="w-[200px] h-[200px] object-cover rounded-full" />
                            <input type="file" name="file" style="display: none" accept="image/*" ref="imageInput" @change="handleFileChange" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                        </div>
                    </div>
                    <input type="text" v-model="name" placeholder="បញ្ចូលឈ្មោះគ្រឿងបន្ថែម" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                    <input type="text" v-model="price" placeholder="បញ្ចូលតម្លៃគ្រឿងបន្ថែម" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                </div>
                <div class="flex items-center justify-end pt-2.5">
                    <button @click="updateAdditional" class="ml-10 rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5" type="submit">យល់ព្រម</button>
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
            additionals: '',
            image: '',
            name: '',
            price: 0,
            apiUrl: import.meta.env.VITE_API_URL,
            isLoading: false
        };
    },
    props: {
        cancelEditAdditional: {
            type: Function,
            required: true
        },
        additional: {
            type: Function,
            required: true
        },
        getAllAdditionals: {
            type: Function,
            required: true
        },
    },
    mounted() {
        this.name = this.additional.name
        this.price = this.additional.price
    },
    methods: {
        cancel() {
            this.cancelEditAdditional()
        },

        openFileInput() {
            this.$refs.imageInput.click();
        },

        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.image = URL.createObjectURL(this.selectedFile);
        },
        updateAdditional() {
            this.isLoading = true
            let formData = new FormData()
            formData.append('_id', this.additional._id)
            formData.append('image', this.selectedFile)
            formData.append('name', this.name),
            formData.append('price', this.price)
            axios.put(this.apiUrl+'/additional-product', formData,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                this.getAllAdditionals()
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
