<template>
<div class="bg-white mx-4 mt-3 rounded-2xl p-4">
    <div class="my-4">
        <p class="text-2xl -mt-2">{{ categoryName }}</p>
        <p class="text-gray-500 text-lg mt-1">នេះគឺជាបញ្ជីនៃការបញ្ជាទិញ{{ categoryName }}</p>
    </div>
    <div class="grid grid-cols-3 grid-flow-row gap-4 overflow-y-auto h-[200px] hide-scroll">
        <div v-for="product in products">
            <div class="flex border border-[#ccc] rounded p-1">
                <img :src="this.apiUrl + '/static/get' + product.image.substring(1)" alt="" class="w-24 h-20 object-cover rounded-sm">
                <div class="flex justify-between items-center w-full mx-4 text-[15px]">

                    <div class="flex flex-col justify-between h-full py-2 ml-2.5">
                        <p class=" font-semibold text-lg">{{ product.name }}</p>
                        <div class="flex">
                            <img src="@/assets/images/ChartBar.svg" alt="" class="w-5 h-5 mr-4">
                            <p> {{ ConvertToKhmerNumber(product.orderAmount) }}&nbsp; ការលក់សរុប</p>
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

export default {
    mixins: [ConvertToKhmerNumber],
    props: {
        products: {
            type: Array,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,

        }
    }
}
</script>
