<template>
    <div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div class="w-[35%] bg-white rounded overflow-hidden shadow-sm">
            <div class="p-5">
                <div class="flex items-center justify-between pb-2.5 border-b border-b-[#ccc]">
                    <div class="text-xl font-semibold">កែប្រែការកម្មង់</div>
                    <button @click="cancel()" class="w-6 h-6 relative group">
                        <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                        <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
                    </button>
                </div>
    
                <div>
                    <div class="py-2.5 text-start">
                        <div class=" grid grid-cols-4 border border-black p-2 my-3">
                            <div>ការបញ្ជាទិញ</div>
                            <div>គ្រឿងបន្ថែម</div>
                            <div class="flex items-center justify-center">តម្លៃ</div>
                            <div class="flex items-center justify-center">សកម្មភាព</div>
                        </div>
                        <div v-for="orderLine in order.orderLines" :class="`grid grid-cols-4 border p-2 my-3 items-center duration-150`">
                            <div>{{ orderLine.product.name }} (x{{ orderLine.quantity }})</div>
                            <div>{{ orderLine.additionals }}</div>
                            <div class="flex justify-center">{{ ConvertToKhmerNumber(orderLine.totalPrice) }}៛</div>
                            <div class="flex justify-center">
                                <button v-if="order.orderLines.length > 1" @click="showRefundOneId = orderLine._id" class="text-[rgb(252,26,26)] bg-[#FAFAFA] font-bold border-[#fc1a1a] border p-1 px-2 rounded-full hover:bg-[#fc1a1a] hover:border-[#DFDFDF] hover:text-white">សងប្រាក់</button>
                                <RefundOne v-if="showRefundOneId == orderLine._id" :cancel="()=>{showRefundOneId=''}" :get-all-waiting-order="getAllWaitingOrder" :order="order" :order-line="orderLine"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" flex justify-between">
                    <div class=" text-xl ">
                        សរុប: <span class="font-bold">{{ ConvertToKhmerNumber(order.totalPrice) }}៛</span> 
                    </div>
                    <button @click="showRefund=true" class="text-[rgb(252,26,26)] bg-[#FAFAFA] font-bold border-[#fc1a1a] border p-1 px-2 rounded-full hover:bg-[#fc1a1a] hover:border-[#DFDFDF] hover:text-white">សងប្រាក់ទាំងអស់</button>
                    <Refund v-if="showRefund" :order="order" :cancel="()=>{showRefund=false}" :get-all-waiting-order="getAllWaitingOrder"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Refund from './Refund.vue';
import RefundOne from './RefundOne.vue';
import ConvertToKhmerNumber from '../../../mixins/ConvertToKhmerNumber';

export default {
    mixins: [ConvertToKhmerNumber],
    components: {
        Refund,
        RefundOne
    },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            showRefund: false,
            showRefundOneId: ''
        };
    },

    props: {
        cancel: {
            type: Function,
            required: true
        },
        order: {
            type: Object,
            required: true
        },
        getAllWaitingOrder: {
            type: Function,
            required: true
        }
    },

    methods: {
        makeUnavaileble(id, note) {
            if(!note.startsWith("Unavailble: ")){
                axios.put(this.apiUrl+"/order-line/update", {
                    _id: id,
                    note: "Unavailble: "+note
                })
                .then(res => {
                    this.getAllWaitingOrder()
                })
            }
            else {
                alert("This order is already unavailble")
            }
        },
        makeAvaileble(id, note) {
            if(note.startsWith("Unavailble: ")){
                axios.put(this.apiUrl+"/order-line/update", {
                    _id: id,
                    note: note.slice("Unavailble: ".length)
                })
                .then(res => {
                    this.getAllWaitingOrder()
                })
            }
            else {
                alert("This order is already availble")
            }
        }
    }
}
</script>