<template>
    <loading v-if="isLoading" />
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-full max-w-[450px] bg-white rounded overflow-hidden shadow-sm p-5">
        <div class="flex justify-end items-center mb-4">
            <button @click="cancel()" class="w-6 h-6 -mr-2 relative group">
                <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
            </button>
        </div>
        <div class="flex items-center justify-between pb-4 w-full mb-3">
            <div class="text-xl font-semibold">
                តម្លៃទំនិញ
            </div>

            <button @click="showAddPrice = true" class=" h-[35px] bg-gray-200 hover:bg-[#1c7db6] hover:text-white flex justify-between items-center text-gray-600 px-2 rounded-lg  hover:-translate-y-0.5 hover:scale-55">
                <img src="@/assets/images/AddFillBlue.svg" alt="" width="20" height="20" class="">
                <div class="ml-3">បញ្ចូលតម្លៃទៅក្នុងទំនិញ</div>
            </button>

        </div>

        <div class="grid grid-row gap-2 overflow-y-auto h-auto max-h-[500px] hide-scroll">
            <div :class="`${showAddPrice ? 'border border-black rounded-md p-1' : 'h-0'} overflow-hidden duration-300 flex flex-col items-end`">
                <button @click="showAddPrice = false" class="flex justify-end"><img src="@/assets/images/XBold.svg" alt="" class="w-5 group-hover:opacity-50 transition-opacity"></button>
                <div class="grid grid-cols-3 gap-1">
                    <input v-model="name" type="text" placeholder="ឈ្មោះ" class="border-b border-b-black p-1 outline-none">
                    <input v-model="price" type="number" placeholder="តម្លៃ" min="1" class="border-b border-b-black p-1 text-center outline-none">
                    <div class="flex justify-center">
                        <button @click="addPriceToProduct" class=" h-[35px] bg-[#1c7db6] hover:text-white flex w-fit justify-center items-center text-gray-600 px-2 rounded-lg  hover:-translate-y-0.5 hover:scale-55">
                            <img src="@/assets/images/AddFillBlue.svg" alt="" width="20" height="20" class="">
                            <div class="ml-3 text-white">បញ្ចូល</div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 border-b pb-1 border-b-black">
                <span class="text-black">ឈ្មោះ</span>
                <span class="text-black text-center">តម្លៃ</span>
                <span class="text-black text-end">សកម្មភាព</span>
            </div>
            <div v-for="(price, index) in prices" :key="price._id">
                <div class="grid grid-cols-3 border border-[#ccc] rounded p-1">
                    <span class="text-gray-500">{{ price.name }}</span>
                    <span class="text-gray-500 text-center">{{ ConvertToKhmerNumber(price.price) }}៛</span>
                    <div class=" flex justify-end">
                        <button @click="showDeletePrice = price._id;" :class="`${showDeletePrice === price._id ? 'w-0' : ''} bg-[#EFF3F6] rounded-full hover:bg-red-200 mx-1 overflow-hidden`">
                            <img src="@/assets/images/Delete.svg" alt="" width="20" height="20" class="m-1">
                        </button>
                        <button @click="deletePriceFromProduct(price._id)" :class="`${showDeletePrice === price._id ? ' w-16' : 'w-0'} bg-[#EFF3F6] rounded-full duration-150 overflow-hidden hover:bg-red-200 flex text-gray-500 mx-1`">
                            <img src="@/assets/images/Delete.svg" alt="" width="20" height="20" class="m-1">
                            <span class="mr-2">លុប</span>
                        </button>
                        <button @click="showDeletePrice = ''" :class="`${showDeletePrice === price._id ? '' : 'w-0'} duration-150 h-6 -mr-1 group mx-1 overflow-hidden`">
                            <img src="@/assets/images/XBold.svg" alt="" class="w-5 group-hover:opacity-50 transition-opacity">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import ConvertToKhmerNumber from '../../../mixins/ConvertToKhmerNumber';
import loading from '../../loading.vue';
export default {

    components: {
        loading
    },

    mixins: [ConvertToKhmerNumber],

    data() {
        return {
           
            additionals: '',
            showAddPrice: false,
            showDeletePrice: '',
            apiUrl: import.meta.env.VITE_API_URL,
            name: '',
            price: '',
            isLoading: false
        };
    },

    props: {
        cancelViewProductPrice: {
            type: Function,
            required: true
        },
        getAllProducts: {
            type: Function,
            required: true
        },
        prices: Array,
        convertToKhmerNumber: Function,
        convertCurrency: Function,
        product: {
            type: Object,
            required: true
        },

    },
    methods: {
        cancel() {
            this.cancelViewProductPrice()
        },
        addPriceToProduct() {
            if(this.price > 1) {
                this.isLoading = true
                axios.post(this.apiUrl+'/price/create', {
                    productId: this.product._id,
                    name: this.name,
                    price: this.price
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                    }
                })
                .then(res => {
                    this.name = ''
                    this.price = ''
                    this.getAllProducts()
                    this.showAddPrice = false
                    this.isLoading = false
                })
                .catch(err => {
                    alert(err.response.data.message);
                    this.isLoading = false
                })
            }
            else {
                alert("Price must not be 0 or negative!!!")
            }
        },
        deletePriceFromProduct(id) {
            this.isLoading = true
            axios.delete(this.apiUrl+'/price/'+id, 
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                this.showDeletePrice = ''
                this.getAllProducts()
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
    mounted() {
        // console.log(this.additionalProducts);
    }
};
</script>
