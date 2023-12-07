<template>
    <div class="border-2 bg-[#FAFAFA] border-[#B8B8B8] border-opacity-50 rounded-md h-[81vh] p-4">
        <div class="flex justify-between mb-5">
            <div class="flex items-center w-3/4">
                <img src="@/assets/images/Done.svg" alt="" width="32" height="32"/>
                <p class="ml-3 text-2xl text-[#3D3D3D]">រួចរាល់</p>
            </div>
            <div class="bg-[#5F5F5F] px-5 text-center rounded-3xl text-2xl text-white border-2 border-[#E7E7E7]">
                {{ ConvertToKhmerNumber(countDoneOrders) }}
            </div>
        </div>
        <div>
            <div class="max-h-[68vh] overflow-y-scroll scroll -mr-3 grid grid-cols-4 gap-2">
                <div v-for="order in orders" :key="order.id" class="border border-[#E4E4E4] rounded-lg p-2 mr-1">
                    <div class="flex justify-between text-center">
                        <div class="px-5 rounded-full text-xl font-bold text-[#2F2F2F] border border-[#E7E7E7] h-8">
                            #{{ ConvertToKhmerNumber(formatIndex(order.orderNumber)) }} 
                        </div>
                        <div v-if="order.orderLines.length == 1" class="mb-4">
                            <!-- <div class="text-[#464646] font-extrabold text-2xl">{{ ConvertToKhmerNumber(order.totalPrice) }}៛</div> -->
                            <div class="bg-[#707070] text-white flex px-2 rounded-md">
                                <img v-if="order.type === 'ខ្ចប់'" src="@/assets/images/TakeOut.svg" alt="" />
                                <img v-else src="@/assets/images/DineIn.svg" alt="" width="19" height="19"/>
                                <p class="ml-2">{{ order.type }}</p>
                            </div>
                        </div>
                        <div v-else class="-mb-2">
                            <!-- <div class="text-[#464646] font-extrabold text-2xl">{{ ConvertToKhmerNumber(order.totalPrice) }}៛</div> -->
                            <div class="bg-[#707070] text-white flex px-2 rounded-md">
                                <img v-if="order.type === 'ខ្ចប់'" src="@/assets/images/TakeOut.svg" alt="" />
                                <img v-else src="@/assets/images/DineIn.svg" alt="" width="19" height="19"/>
                                <p class="ml-2">{{ order.type }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
    
<script>
import ConvertToKhmerNumber from "../../mixins/ConvertToKhmerNumber";
import axios from "axios";
import socket from "../../WebSocketService";

export default {
    mixins: [ConvertToKhmerNumber],

    data() {
        return {
            orders: [],
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },

    mounted() {
        this.getAllDoneOrders();
    },

    created() {
        socket.on('doneOrder', (data) => {
            this.orders = data;
            for (let i = 0; i < this.orders.length; i++) {
                this.orders[i].index = i;
            }
        });
    },

    computed: {
        countDoneOrders() {
            return this.orders.filter(order => order.status === 'done').length;
        }
    },

    methods: {
        getAllDoneOrders() {
            axios.get(this.apiUrl+'/order/status/done?sortField=_id&sortOrder=asc&amount=15')
                .then(response => {
                    this.orders = response.data;
                    for (let i = 0; i < this.orders.length; i++) {
                        this.orders[i].index = i;
                    }
                })
                .catch(error => {
                    console.error('Error fetching done orders:', error);
                });
        },

        formatIndex(index) {
            if (index < 10) {
                return `00${index}`;
            } else if (index < 100) {
                return `0${index}`;
            } else {
                return `${index}`;
            }
        },
    }
}
</script>