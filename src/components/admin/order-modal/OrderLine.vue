<template>
<div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
    <div class="w-[80%] max-w-[800px] bg-white rounded overflow-hidden shadow-sm">
        <div class="p-5">
            <div>
                <div class="flex items-center justify-between pb-4 w-full">
                    <div class="w-10/12">
                        <p class="text-2xl font-semibold">
                            <span>លេខសម្គាល់:&nbsp;</span> <span class="text-[#1c355d]">#{{ ConvertToKhmerNumber(order.orderNumber) }}</span>
                        </p>
                        <div class="w-11/12 flex justify-between">
                            <p class="text-base text-gray-500">
                                <span>កាលបរិច្ឆេទ:&nbsp;</span> <span>{{ FormattedKhmerDate(order.createdAt) }}</span>
                            </p>
                            <p class="text-xl font-semibold mr-14">
                                <span>តម្លៃសរុប:&nbsp;</span> <span class="text-[#1c355d]">${{ ConvertToKhmerNumber(order.totalPrice) }}</span>
                            </p>
                        </div>

                    </div>
                    <button @click="{
                        console.log(order);
                        cancel();
                    }" class="w-6 h-6 relative group -mt-12.5 -mr-2">
                        <img src="@/assets/images/XBold.svg" alt="" class="max-w-full group-hover:opacity-50 transition-opacity">
                        <img src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100">
                    </button>
                </div>

                <div v-if="Object.keys(orderLines[0]).length != 0"  class="grid grid-cols-2 grid-flow-row gap-2 overflow-y-auto h-[200px] hide-scroll">
                    <div  v-for="(order, index) in orderLines">
                        <div class="flex border border-[#ccc] rounded p-1 h-fit">
                            <img v-if="order.product" :src="this.apiUrl + '/static/get' + order.product.image.substring(1)" alt="not availeble" class="w-[50px] h-full object-cover rounded-sm">
                            <img v-else src="https://cdn-icons-png.flaticon.com/512/20/20773.png" alt="" class="w-[50px] h-full object-cover rounded-sm">
                            <div class="flex justify-between items-center w-full mx-4 text-[15px]">

                                <div>
                                    <p v-if="order.product" class=" leading-none">
                                        <span class=" font-semibold text-lg">{{ order.product.name }}</span>
                                        <br/>
                                        <span class=" text-xs">{{ order.additionals }}</span>
                                    </p>
                                    <p v-else class=" font-semibold text-lg">Deleted Product</p>
                                    <p><span class="text-gray-500">ចំនួន:</span> <span>{{ ConvertToKhmerNumber(order.quantity) }}</span> </p>
                                </div>
                                <div class="">
                                    <p>
                                        <span class="text-gray-500">{{ order.price.name }}:</span> <span>{{ ConvertToKhmerNumber(order.price.price) }}៛</span>
                                    </p>
                                    <p>
                                        <span class="text-gray-500">តម្លៃសរុប:</span> <span>{{ ConvertToKhmerNumber(order.totalPrice) }}៛</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import FormatDate from "../../../mixins/FormatDateAndTime";
import axios from 'axios'

export default {
    mixins: [ ConvertToKhmerNumber, FormatDate ],

    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,

        };
    },
    props: {
        cancelViewOrderLine: {
            type: Function,
            required: true
        },
        orderLines: {
            type: Array,
            required: true
        },
        order: {
            type: Object,
            required: true
        },
    },
    methods: {
        cancel() {
            this.cancelViewOrderLine()
        },
    },
};
</script>

