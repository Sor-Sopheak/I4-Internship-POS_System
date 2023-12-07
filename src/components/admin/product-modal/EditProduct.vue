<template>
    <loading v-if="isLoading"/>
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] max-w-[450px] bg-white rounded overflow-hidden shadow-sm">
        <div class="p-5">
            <div class="flex items-center justify-between pb-2.5 border-b-[#ccc] border-b">
                <div class="text-xl font-semibold">កែទំនិញ</div>
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
                            <label for="file" :style="{ backgroundImage: `url(${apiUrl}/static/get${product.image.substring(1)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" class="clicktext text-white rounded-full p-1.5" v-if="!image"><div class="text-white bg-gray-600/50 p-2">ចុចនៅទីនេះដើម្បីបញ្ចូលរូបភាព</div></label>
                            <img :src="image" alt="Selected Image" v-if="image" class="w-[200px] h-[200px] object-cover rounded-full" />
                            <input type="file" name="file" style="display: none" accept="image/*" ref="imageInput" @change="handleFileChange" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                        </div>
                    </div>
                    <div class="flex justify-between w-full border-b mb-4 border-b-gray-400  p-1.5">
                        <label for="categoryId" class="">ជ្រើសរើសប្រភេទទំនិញ:</label>
                        <select name="categoryId" v-model="categoryId" class="focus:outline-none w-[200px]">
                            <option value="" disabled>ប្រភេទទំនិញ</option>
                            <option v-for="category in categories" :value="category._id" :selected="category._id === categoryId" class="">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                    <input type="text" v-model="name" placeholder="បញ្ចូលឈ្មោះទំនិញ" class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                    <input type="text" v-model="price" placeholder="បញ្ចូលតម្លៃទំនិញ" required class="w-full mb-4 p-1.5 border-b border-b-gray-400 outline-none" />
                </div>
                <div class="flex items-center justify-end pt-2.5">
                    <button @click="updateProduct" class="ml-10 rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5" type="submit">រួចរាល់</button>
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
            categoryId: '',
            image: '',
            name: '',
            price: '',
            description: '',
            apiUrl: import.meta.env.VITE_API_URL,
            selectedFile: '',
            isLoading: false
        };
    },
    mounted() {
        this.name = this.product.name
        this.price = this.product.price
        this.categoryId = this.product.categoryId
    },
    props: {
        cancelEditProduct: {
            type: Function,
            required: true
        },
        product: {
            type: Object,
            required: true
        },
        getAllProducts: {
            type: Function,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {
        cancel() {
            this.cancelEditProduct()
        },

        openFileInput() {
            this.$refs.imageInput.click();
        },

        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.image = URL.createObjectURL(this.selectedFile);
        },
        
        updateProduct() {
            this.isLoading = true
            axios.put(this.apiUrl+'/product', {
                _id: this.product._id,
                name: this.name,
                price: parseInt(this.price),
                categoryId: this.categoryId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                if (this.selectedFile) {
                    let formData = new FormData()
                    formData.append('_id', res.data._id)
                    formData.append('image', this.selectedFile)
                    axios.put(this.apiUrl+'/product', formData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                        }
                    })
                    .then(res => {
                        this.getAllProducts()
                        this.cancel()
                        this.isLoading = false
                    })
                }
                else {
                    this.getAllProducts()
                    this.cancel()
                }
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
