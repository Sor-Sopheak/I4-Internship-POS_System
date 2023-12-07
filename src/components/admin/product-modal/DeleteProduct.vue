<template>
<loading v-if="isLoading"/>
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] mix-w-[450px] max-w-[570px] bg-white rounded overflow-hidden shadow-sm">
        <div class="p-5">
            <div class="flex items-center justify-between pb-2.5 mb-4 border-b border-b-[#ccc]">
                <div class="text-xl font-semibold">បញ្ជាក់ការលុប</div>
            </div>

            <div>
                <div class="py-2.5 flex items-start text-start text-gray-500">
                    តើអ្នកពិតជាចង់លុបទំនិញ​ឈ្មោះ <span class="text-black">{{ product.name }}</span> នេះមែនឬ?
                </div>
                <div class="flex items-center justify-end pt-2.5 mt-4 border-t border-t-[#ccc]">
                    <button @click="cancel()" class="rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5">Cancel</button>
                    <button @click="deleteProduct()" class=" ml-4 rounded bg-[#fc1a1a] hover:bg-[#d12439] text-white px-3 py-1.5" type="submit">Delete</button>
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
            isLoading: false
        };
    },
    props: {
        cancelDeleteProduct: {
            type: Function,
            required: true
        },
        product: Object,
        getAllProducts: {
            type: Function,
            required: true
        },
    },
    methods: {
        cancel() {
            this.cancelDeleteProduct()
        },
        deleteProduct() {
            this.isLoading = true
            axios.delete(this.apiUrl+'/product/'+this.product._id,
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
    }
};
</script>
