<template>
    <div class="fixed top-0 left-0 z-9998 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div class="w-[80%] max-w-[450px] bg-white rounded overflow-hidden shadow-sm">
            <div class="p-5">
                <div class="flex items-center justify-between pb-2.5 border-b border-b-[#ccc]">
                    <div class="text-xl font-semibold">បញ្ជាក់ការលុប</div>
                </div>
    
                <div>
                    <div class="py-2.5 flex items-start text-start m-4 text-gray-500">
                        តើអ្នកពិតជាចង់លុបការកម្មង់ដែលមានលេខសម្គាល់<span class="text-black underline"> #{{ order.orderNumber }} </span> នេះមែនឬ?
                    </div>
                    <div class="flex items-center justify-end pt-2.5 border-t border-t-[#ccc]">
                        <button @click="cancel()" class="rounded bg-[#1C355D] hover:bg-[#2691d9] text-white px-3 py-1.5">Cancel</button>
                        <button @click="deleteDoneOrder" class=" ml-4 rounded bg-[#fc1a1a] hover:bg-[#d12439] text-white px-3 py-1.5" type="submit">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            showDeleteDoneOrderMessage: false,
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },

    props: {
        cancelDeleteDoneOrder: {
            type: Function,
            required: true
        }, 
        order: Object,
        getAllDoneOrders: {
            type: Function,
            required: true
        },
    },

    methods: {
        cancel() {
            this.cancelDeleteDoneOrder()
        },
        deleteDoneOrder() {
            axios.delete(this.apiUrl+'/order/status')
        }
    }
}
</script>