<template>
    <div class="border-2 bg-[#FAFAFA] border-[#FF8A00] border-opacity-50 rounded-md h-[81vh] p-4">
        <div class="flex justify-between mb-5">
            <div class="flex items-center w-3/4">
                <img src="@/assets/images/Comming.svg" alt="" width="32" height="32"/>
                <p class="ml-3 text-2xl text-[#3D3D3D]">ការបញ្ជាទិញមកដល់</p>
            </div>
            <div class="bg-[#FF8A00] px-5 text-center rounded-3xl text-2xl text-white border-2 border-[#E7E7E7]">
                {{ ConvertToKhmerNumber(countWaitingOrders) }}
            </div>
        </div>
        <div>
            <div class="max-h-[68vh] overflow-y-scroll scroll -mr-3">
                <div v-for="order in orders" :key="order._id" class="border border-[#E4E4E4] rounded-lg p-2 mb-3 mr-1">
                    <div class="flex justify-between text-center">
                        <div class="px-5 rounded-full text-xl text-[#2F2F2F] border border-[#E7E7E7] h-8">
                            #{{ ConvertToKhmerNumber(formatIndex(order.orderNumber)) }} 
                            <!-- {{ order._id }} -->
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
                                <div v-for="(orderLine, index) in order.orderLines" :key="orderLine._id" :class="`border py-2 px-4 duration-150`">
                                    <div class="flex">
                                        <p>{{ ConvertToKhmerNumber(index + 1) }}.&#160;</p>
                                        <p v-if="orderLine.product">{{ orderLine.product.name }} ({{ orderLine.price.name }}) (x{{ ConvertToKhmerNumber(orderLine.quantity) }})</p>
                                        <!-- <p v-if="orderLine.product">{{ orderLine._id }} ({{ orderLine.totalPrice }}) (x{{ ConvertToKhmerNumber(orderLine.quantity) }})</p> -->
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

                            <div class="flex items-center justify-between self-end">
                                <button @click="rejectedOrderId = order._id" class="text-[#c55b5b] bg-[#FAFAFA] font-bold border-[#c55b5b] border p-1 px-2 ml-2 rounded-full hover:bg-[#c55b5b] hover:border-[#DFDFDF] hover:text-white">
                                    បដិសេធ
                                </button>
                                <EditOrder v-if="order._id == rejectedOrderId" :order="order" :get-all-waiting-order="getAllWaitingOrder()" :cancel="()=>{rejectedOrderId = ''}"/>
                                <button @click="changeOrderStatus(order._id)" class="text-[#5DC55B] bg-[#FAFAFA] font-bold border-[#5DC55B] border p-1 px-2 ml-2 rounded-full hover:bg-[#5DC55B] hover:border-[#DFDFDF] hover:text-white">
                                    ទទួល
                                </button>
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
import EditOrder from "./order-receiver-modal/EditOrder.vue";
import axios from "axios";

export default {
    mixins: [ConvertToKhmerNumber],

    components: {
        EditOrder,
    },

    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            rejectedOrderId: '',
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
        getAllWaitingOrder: {
            type: Function,
            required: true
        }
    },

    computed: {
        countWaitingOrders() {
            return this.orders.filter(order => order.status === 'waiting').length;
        },
    },

    methods: {
        getAllWaitingOrders() {
            axios.get(this.apiUrl+'/order/status/waiting?sortField=_id&sortOrder=asc')
                .then(response => {
                    this.orders = response.data.filter(order => {
                        return order.payments.some(payment => payment.payment_status === 'paid');
                    });
                    for (let i = 0; i < this.orders.length; i++) {
                        this.orders[i].index = i;
                    }
                })
                .catch(error => {
                    console.error('Error fetching waiting orders:', error);
                });
        },

        changeOrderStatus(orderId) {
            const requestData = {
                _id: orderId,
                status: 'in progress',
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
                        orderToUpdate.status = 'in progress';
                    }
                    this.getAllInProgressOrder()
                    this.getAllWaitingOrder()
                    this.isLoading = false
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