<template>
    <div class="bg-white m-4 rounded-2xl p-4 shadow-sm">
        <p class="text-xl">តារាងការបញ្ជាទិញនៃប្រភេទអាហារ</p>
        <div v-if="loading" class="w-full h-fit grid place-items-center">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center">
            <Pie v-if="data.datasets[0].data" :data="data" :options="options" />
        </div>

    </div>
</template>

<script>
import ConvertToKhmerNumber from '../../../mixins/ConvertToKhmerNumber';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut, Pie } from 'vue-chartjs'
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    mixins: [ConvertToKhmerNumber],
    components: {
        Doughnut,
        Pie
    },
    data() {
        return {
            mycolor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            data: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: [],
                        data: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            apiUrl: import.meta.env.VITE_API_URL,
            loading: true,
        }
    },
    props: {
    },
    methods: {
        getCategoryOrderLine() {
            axios.get(this.apiUrl + '/category/all/order-line')
                .then(res => {
                    let respond = res.data
                    let arrayData = []
                    respond.forEach(element => {
                        this.data.labels.push(element.name)
                        arrayData.push(element.orderAmount)
                        this.generator()
                        this.data.datasets[0].backgroundColor.push(this.mycolor)
                    });
                    this.data.datasets[0].data = arrayData
                    this.loading = false
                })
        },
        generator: function () {
            this.mycolor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        }
    },
    mounted() {
        this.getCategoryOrderLine()
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