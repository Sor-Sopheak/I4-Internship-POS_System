<template>
    <div class="border-2 bg-[#FAFAFA] border-[#4B9600] border-opacity-50 rounded-md h-[81vh] p-4">
        <div class="flex justify-between mb-5">
            <div class="flex items-center w-3/4">
                <img src="@/assets/images/InProgress.svg" alt="" width="32" height="32"/>
                <p class="ml-3 text-2xl text-[#3D3D3D]">កំពុង​ដំណើរការ</p>
            </div>
            <div class="bg-[#4B9600] px-5 text-center rounded-3xl text-2xl text-white border-2 border-[#E7E7E7]">
                {{ ConvertToKhmerNumber(countInProgressOrders) }}
            </div>
        </div>
        <div>
            <div class="max-h-[68vh] overflow-y-scroll scroll -mr-3">
                <div v-for="order in orders" :key="order.id" class="border border-[#E4E4E4] rounded-lg p-2 mb-3 mr-1">
                    <div class="flex justify-between text-center">
                        <div class="px-5 rounded-full text-xl text-[#2F2F2F] border border-[#E7E7E7] h-8">
                            #{{ ConvertToKhmerNumber(formatIndex(order.orderNumber)) }} 
                        </div>
                        <div v-if="order.orderLines.length == 1" class="mb-4">
                            <div class="text-[#464646] font-extrabold text-2xl">{{ ConvertToKhmerNumber(order.totalPrice) }}៛</div>
                            <div class="bg-[#707070] text-white flex px-2 rounded-md">
                                <img src="@/assets/images/DineIn.svg" alt="" width="19" height="19"/>
                                <p class="ml-2">{{ order.type }}</p>
                            </div>
                        </div>
                        <div v-else class="-mb-2">
                            <div class="text-[#464646] font-extrabold text-2xl">{{ ConvertToKhmerNumber(order.totalPrice) }}៛</div>
                            <div class="bg-[#707070] text-white flex px-2 rounded-md">
                                <img src="@/assets/images/DineIn.svg" alt="" width="19" height="19"/>
                                <p class="ml-2">{{ order.type }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-if="Object.keys(order.orderLines[0]).length != 0" class="mx-2 flex justify-between text-sm">
                            <div>
                                <div v-for="(orderLine, index) in order.orderLines" :key="orderLine._id"  :class="`border py-2 px-4 duration-150 ${orderLine.note?.startsWith('Unavailble: ') ? 'bg-red-500 text-white' : ''}`">
                                    <div class="flex">
                                        <p>{{ ConvertToKhmerNumber(index + 1) }}.&#160;</p>
                                        <p v-if="orderLine.product">{{ orderLine.product.name }} ({{ orderLine.price.name }}) (x{{ ConvertToKhmerNumber(orderLine.quantity) }})</p>
                                        <p v-else class=" text-red-700">Deleted Product (x{{ ConvertToKhmerNumber(orderLine.quantity) }})</p>
                                    </div>

                                    <div v-if="orderLine.additionals">
                                        <div class="ml-7">
                                            .&#160;{{ orderLine.additionals }}
                                        </div>
                                    </div>

                                    <div v-if="orderLine.note" class="text-gray-500">
                                        ចំណាំ: {{ orderLine.note }}
                                    </div>
                                </div>
                            </div>
                            
                            <button @click="changeOrderStatus(order._id)" class="h-7 font-bold bg-[#F2FFF6] border-[#DFDFDF] border p-1 px-3 ml-2 rounded-full self-end hover:bg-[#166BEB] hover:text-white">
                                រូចរាល់
                            </button>
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

export default {
    mixins: [ConvertToKhmerNumber],

    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },

    props: {
        orders: {
            type: Array,
            required: true
        },
        getAllInProgressOrder: {
            type: Function,
            required: true
        },
        getAllDoneOrder: {
            type: Function,
            required: true
        }
    },

    computed: {
        countInProgressOrders() {
            return this.orders.filter(order => order.status === 'in progress').length;
        }
    },

    methods: {
        getAllInProgressOrders() {
            axios.get(this.apiUrl+'/order/status/in-progress?sortField=_id&sortOrder=asc')
                .then(response => {
                    this.orders = response.data.filter(order => {
                        return order.payments.some(payment => payment.payment_status === 'paid');
                    });
                    for (let i = 0; i < this.orders.length; i++) {
                        this.orders[i].index = i;
                    }
                })
                .catch(error => {
                    console.error('Error fetching in-progress orders:', error);
                });
        },

        changeOrderStatus(orderId) {
            const requestData = {
                _id: orderId,
                status: 'done',
            };

            axios
                .put(this.apiUrl+'/order/status', requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('tokenReceiver'),
                    }
                })
                .then((response) => {
                    console.log('Order status updated successfully:', response.data);
                    const orderToUpdate = this.orders.find((order) => order._id === orderId);
                    if (orderToUpdate) {
                        orderToUpdate.status = 'done';
                    }
                    this.getAllDoneOrder()
                    this.getAllInProgressOrder()
                })
                .catch((error) => {
                    if (error.response.data.message==="Token is not valid") {
                        alert('Error : ' + error.response.data.message + ", Please Log in again");
                        localStorage.removeItem('tokenReceiver')
                        this.$router.push("/")
                    }
                    else {
                        alert('Error updating order status: ' + error.response.data.message);
                        localStorage.removeItem('tokenReceiver')
                        this.$router.push("/")
                    }
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