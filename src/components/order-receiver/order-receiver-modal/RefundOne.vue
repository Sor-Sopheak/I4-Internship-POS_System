<template>
    <loading v-if="isLoading" />
    <div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div class="w-[80%] max-w-[450px] bg-white rounded overflow-hidden shadow-sm">
            <div class="p-5">
                <div class="flex items-center justify-between pb-2.5 border-b border-b-[#ccc]">
                    <div class="text-xl font-semibold">បញ្ជាក់ការសងប្រាក់</div>
                </div>
                <div>
                    <div class=" m-2 text-gray-500">
                        <p class="">តើ​អ្នក​ប្រាកដ​ឬ​ទេ?</p>
                        <p class="">ចំនូនប្រាក់: <span class=" text-lg text-black">{{ ConvertToKhmerNumber(orderLine.totalPrice) }}៛</span></p>
                    </div>
                    <div class="flex items-center justify-end pt-2.5 border-t border-t-[#ccc]">
                        <button @click="cancel()" class="rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5">បោះបង់</button>
                        <button @click="refund(order._id, orderLine.totalPrice)" class=" ml-4 rounded bg-[#fc1a1a] hover:bg-[#d12439] text-white px-3 py-1.5" type="submit">សងប្រាក់</button>
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
    name: 'Refund',
    mixins: [ConvertToKhmerNumber],
    props: {
        cancel: {
            type: Function,
            required: true
        },
        order: {
            type: Object,
            required: true
        },
        orderLine: {
            type: Object,
            required: true
        },
        getAllWaitingOrder: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
        }
    },
    methods: {
        refund(id, amount){
            this.isLoading = true
            amount = amount/4000
            axios.post(this.apiUrl+'/payment/refund', {
                orderId: id,
                amount: amount
            })
            .then(res=>{
                axios.delete(this.apiUrl+'/order-line/'+this.orderLine._id, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('tokenReceiver'),
                    }
                })
                .then(res => {
                    this.getAllWaitingOrder()
                    this.cancel()
                    isLoading = false
                })
                .catch(err => {
                    console.error(err);
                    // alert(err.message)
                })
            })
            .catch(err => {
                console.error(err);
                // alert(err.message)
            })
        }
    }
}
</script>