<template>
    <div class="bg-white m-4 rounded-2xl p-4 shadow-sm">
        <p class="mb-2 text-xl">៥ទំនិញដែលទទួលបានការកម្មង់ច្រើនជាងគេ</p>
        <div v-if="loading" class="w-full h-fit grid place-items-center">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-else>
            <div v-for="(product, index) in products" class="grid grid-cols-[23%,65%,12%] border-b my-2.5 p-2">
                <div class="text-start">{{ ConvertToKhmerNumber(index + 1) }}</div>
                <div class="text-gray-600 text-start mx-12">{{ product.name }}</div>
                <div class="text-[#426fb8] flex justify-between -ml-2">
                    <p>{{ ConvertToKhmerNumber(product.orderAmount) }}</p>
                    <p>កម្មង់</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ConvertToKhmerNumber from '../../../mixins/ConvertToKhmerNumber';
import axios from 'axios';

export default {
    mixins: [ConvertToKhmerNumber],
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            products: '',
            loading: true,
        }
    },
    methods: {
        getAllProductOrder() {
            axios.get(this.apiUrl + '/product/all/order-line')
                .then(res => {
                    this.products = res.data
                    this.products = this.products.slice(0, 5);
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.getAllProductOrder()
    }
}
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