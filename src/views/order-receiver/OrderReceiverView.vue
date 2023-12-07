<template>
    <!-- <EditOrder /> -->
    <div class="Noto-Serif-Khmer w-full h-[100vh] bg-[#eff3f6]">
        <ReceiverHeader/>

        <div class="my-3 mx-5 text-2xl">ការកម្មង់</div>
        <div class="grid grid-cols-3 gap-4 mx-5">
            <Waiting :get-all-waiting-order="getAllWaitingOrders" :orders="waitingOrders" :get-all-in-progress-order="getAllInProgressOrders"/>
            <InProgress :orders="inProgressOrders" :get-all-in-progress-order="getAllInProgressOrders" :get-all-done-order="getAllDoneOrders"/>
            <Done :orders="doneOrders"/>
        </div>
        <RouterView/> 
    </div>
</template>

<script>
    import ReceiverHeader from '../../components/order-receiver/ReceiverHeader.vue';
    import Waiting from '../../components/order-receiver/Waiting.vue';
    import InProgress from '../../components/order-receiver/In-Progress.vue';
    import Done from '../../components/order-receiver/Done.vue';
    import { RouterView } from 'vue-router';
    import axios from "axios";
    import EditOrder from '../../components/order-receiver/order-receiver-modal/EditOrder.vue';
    import socket from "../../WebSocketService";

    export default { 
        components: {ReceiverHeader, Waiting, InProgress, Done, RouterView, EditOrder},
        data() {
            return {
                apiUrl: import.meta.env.VITE_API_URL,
                waitingOrders: [],
                inProgressOrders: [],
                doneOrders: [],
            }
        },
        created() {
            socket.on('newOrder', (data) => {
                this.waitingOrders = data;
                for (let i = 0; i < this.waitingOrders.length; i++) {
                    this.waitingOrders[i].index = i;
                }
            });
        },
        mounted() {
            this.getAllWaitingOrders()
            this.getAllInProgressOrders()
            this.getAllDoneOrders()
        },
        methods: {
            getAllWaitingOrders() {
                axios.get(this.apiUrl+'/order/status/waiting?sortField=_id&sortOrder=asc')
                    .then(response => {
                        this.waitingOrders = response.data;
                        for (let i = 0; i < this.waitingOrders.length; i++) {
                            this.waitingOrders[i].index = i;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching waiting orders:', error);
                    });
            },
            getAllInProgressOrders() {
                axios.get(this.apiUrl+'/order/status/in-progress?sortField=_id&sortOrder=asc')
                    .then(response => {
                        this.inProgressOrders = response.data;
                        for (let i = 0; i < this.inProgressOrders.length; i++) {
                            this.inProgressOrders[i].index = i;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching in-progress orders:', error);
                    });
            },
            getAllDoneOrders() {
                axios.get(this.apiUrl+'/order/status/done?sortField=_id&sortOrder=asc&amount=15')
                    .then(response => {
                        this.doneOrders = response.data;
                        for (let i = 0; i < this.doneOrders.length; i++) {
                            this.doneOrders[i].index = i;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching done orders:', error);
                    });
            },
        }
    };

    
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&family=Noto+Sans+Khmer&family=Noto+Serif+Khmer&display=swap');

.Noto-Serif-Khmer {
    font-family: 'Noto Serif Khmer', serif;
}
</style>