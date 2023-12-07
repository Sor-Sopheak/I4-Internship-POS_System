<template>
    <loading v-if="isLoading" />
    <div class="fixed top-0 left-0 z-9999 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div class="w-[80%] max-w-[770px] h-[350px] bg-white rounded overflow-hidden shadow-sm">
            <div class="p-5">
                <div class="flex items-center justify-between pb-6 border-b-[#ccc] border-b">
                    <div class="text-xl font-semibold">បញ្ចូលគឿងបន្ថែមក្នុង {{ product.name }}</div>
                    <button @click="cancel()" class="w-6 h-6 relative group -mt-6 -mr-2">
                        <img src="@/assets/images/XBold.svg" alt=""
                            class="max-w-full group-hover:opacity-50 transition-opacity">
                        <img src="@/assets/images/XBoldActive.svg" alt=""
                            class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
                    </button>
                </div>

                <div>
                    <div class="py-2.5 flex flex-col w-full items-start text-start">
                        <label for="categoryId" class="mb-2">ជ្រើសរើសគ្រឿងបន្ថែម:</label>

                        <div v-if="loading" class="w-full h-fit grid place-items-center">
                            <div class="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <ul class="mx-24 grid grid-cols-4 gap-3 overflow-y-auto max-h-[200px] hide-scroll">
                            <li v-for="additionalProduct in additionalProducts" :key="additionalProduct._id"
                                @click="createProductAdditionalRelation(additionalProduct._id)"
                                :style="{ backgroundImage: `url(${apiUrl}/static/get${additionalProduct.image.substring(1)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }"
                                class="hover:bg-gray-200 p-2 border my-1 text-white text-center cursor-pointer h-24 max-w-24">
                                <span class=" bg-[#00000040] p-1">{{ additionalProduct.name }}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <hr />
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
            additionalProducts: '',
            categoryId: '',
            apiUrl: import.meta.env.VITE_API_URL,
            loading: true,
            name: '',
            isLoading: false
        };
    },
    props: {
        cancelAddAdditionalToProduct: {
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
    },

    mounted() {
        this.getAllAdditionalProducts();
    },

    methods: {
        cancel() {
            this.cancelAddAdditionalToProduct()
        },

        getAllAdditionalProducts() {
            axios.get(this.apiUrl + '/additional-product/all')
                .then(response => {
                    this.additionalProducts = response.data;
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        },

        createProductAdditionalRelation(id) {
            this.isLoading = true
            axios.post(this.apiUrl + '/additional-product-relation/create', {
                productId: this.product._id,
                additionalProductId: id
            }, {
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
                    alert(err.response.data.message);
                    this.isLoading = false
                })
        }
    },
};
</script>
<style scoped>
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #000;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}</style>