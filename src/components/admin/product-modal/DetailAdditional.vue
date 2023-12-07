<template>
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-full max-w-[450px] bg-white rounded overflow-hidden shadow-sm p-5">
        <div class="flex justify-end items-center mb-4">
            <button @click="cancel()" class="w-6 h-6 -mr-2 relative group">
                <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
            </button>
        </div>
        <div class="flex items-center justify-between pb-4 w-full">
            <div class="text-xl font-semibold">
                គ្រឿងបន្ថែម
            </div>

            <button @click="showAddAdditionalToProductForm = true" class=" h-[35px] bg-gray-200 hover:bg-[#1c7db6] hover:text-white flex justify-between items-center text-gray-600 px-2 rounded-lg  hover:-translate-y-0.5 hover:scale-55">
                <img src="@/assets/images/AddFillBlue.svg" alt="" width="20" height="20" class="">
                <div class="ml-3">បញ្ចូលគ្រឿងបន្ថែមទៅក្នុងទំនិញ</div>
            </button>
            <AddAdditionalToProduct v-if="showAddAdditionalToProductForm" :product="product" :get-all-products="getAllProducts" :cancel-add-additional-to-product="() => {showAddAdditionalToProductForm = ''}"/>

        </div>

        <div class="grid grid-row gap-2 overflow-y-auto h-auto max-h-[500px] hide-scroll">
            <div v-for="(additional, index) in additionalProducts" :key="additional._id">
                <div class="flex border border-[#ccc] rounded p-1">
                    <img :src="this.apiUrl + '/static/get' + additional.image.substring(1)" alt="" width="80" height="70" class="max-w-[70px] h-auto rounded-sm object-cover">
                    <div class="flex justify-between w-[65%] mx-6 my-4 text-[15px]">

                        <div class="flex flex-col justify-between ">
                            <p><span>លេខសម្គាល់:</span> <span class="text-gray-500">#{{ ConvertToKhmerNumber(index + 1) }}</span> </p>
                            <p><span>ឈ្មោះ:</span> <span class="text-gray-500">{{ additional.name }}</span></p>
                            <p><span>តម្លៃ :</span> <span class="text-gray-500">{{ ConvertToKhmerNumber(additional.price) }}៛</span></p>
                        </div>
                    </div>

                    <button @click="showDeleteAdditionalFromProductId = additional._id" class="bg-[#EFF3F6] rounded-full h-fit w-fit hover:bg-red-200">
                        <img src="@/assets/images/Delete.svg" alt="" width="20" height="20" class="m-1">
                    </button>
                    <DeleteAdditionalFromProduct v-if="showDeleteAdditionalFromProductId == additional._id" :get-all-products="getAllProducts" :additional="additional" :cancel-delete-additional-from-product="() => {showDeleteAdditionalFromProductId = ''}"/>

                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import AddAdditionalToProduct from '../../admin/product-modal/AddAdditionalToProduct.vue';
import DeleteAdditionalFromProduct from './DeleteAdditionalFromProduct.vue';
import ConvertToKhmerNumber from '../../../mixins/ConvertToKhmerNumber';
export default {

    components: {
        AddAdditionalToProduct, 
        DeleteAdditionalFromProduct,
    },

    mixins: [ConvertToKhmerNumber],

    data() {
        return {
           
            additionals: '',

            showAddAdditionalToProductForm: false,
            showDeleteAdditionalFromProductId: '', 
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },

    props: {
        cancelViewAdditionalProduct: {
            type: Function,
            required: true
        },
        getAllProducts: {
            type: Function,
            required: true
        },
        additionalProducts: Array,
        convertToKhmerNumber: Function,
        convertCurrency: Function,
        product: {
            type: Object,
            required: true
        },

    },
    methods: {
        cancel() {
            this.cancelViewAdditionalProduct()
        },
    },
    mounted() {
        // console.log(this.additionalProducts);
    }
};
</script>
