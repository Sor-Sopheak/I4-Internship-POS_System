<template>
    <div v-if="loading" class="w-full h-[92vh] grid place-items-center">
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div v-else class="mt-6 mx-5 h-[89vh]">
        <div class="grid grid-cols-[47%,53%]">
            <div>
                <p class="text-3xl font-semibold">គ្រឿងបន្ថែម</p>
                <p class="text-md text-gray-600 pt-3">ការគ្រឿងបន្ថែមសរុបមានចំនួន {{ ConvertToKhmerNumber(additionals.length)
                }}</p>
            </div>
            <div class="flex justify-between items-center mt-6">
                <div
                    class="h-[35px] w-96 border-solid border border-gray-300 rounded bg-white flex items-center justify-between my-5">
                    <div @click="focusInput" class="flex justify-center items-center px-2 w-full">
                        <img src="@/assets/images/Search.svg" alt="search icon" class="w-[17px] h-[17px]" />
                        <input type="text" placeholder="ស្វែងរក" v-model="searchString" @input="searchAdditional"
                            class="input-field text-md w-full pl-2" />
                    </div>
                </div>

                <button @click="showAddAdditionalForm = true"
                    class=" h-[35px] bg-[#1C355D] hover:bg-[#1c7db6] flex justify-between items-center text-white px-2 rounded  hover:-translate-y-1 hover:scale-110">
                    <img src="@/assets/images/AddFill.svg" alt="" width="20" height="20">
                    <div class="ml-3">បន្ថែមគ្រឿងបន្ថែមថ្មី</div>
                </button>

                <AddAdditional v-if="showAddAdditionalForm" :get-all-additionals="getAllAdditionals"
                    :cancel-add-additional="() => { showAddAdditionalForm = false }" />

            </div>
        </div>
        <div class="bg-white w-full h-[65vh] rounded">
            <div class="p-2">
                <div class="grid grid-cols-5 text-2xl font-semibold bg-[#e4e9ec] p-4 mb-3.5 rounded">
                    <div class="flex items-center">
                        <p class="pr-2">លេខសម្គាល់</p>
                        <button @click="idDesc = !idDesc; nameDesc = false; priceDesc = false; sortId()">
                            <img :class="`${idDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <p class="text-center">រូបតំណាង</p>
                    <div class="flex justify-center items-center">
                        <p class="pr-2">ឈ្មោះគ្រឿងបន្ថែម</p>
                        <button @click="nameDesc = !nameDesc; idDesc = false; priceDesc = false; sortName()">
                            <img :class="`${nameDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="pr-2">តម្លៃ</p>
                        <button @click="priceDesc = !priceDesc; idDesc = false; nameDesc = false; sortPrice()">
                            <img :class="`${priceDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <p class="text-end mr-4">សកម្មភាព</p>
                </div>
                <div v-for="(additional, index) in displayAdditionals" :key="additional._id"
                    class="grid grid-cols-5 border-2 mt-3 p-3 rounded items-center text-lg">
                    <p>#{{ ConvertToKhmerNumber(additional.index + 1) }}</p>
                    <div class="flex justify-center items-center">
                        <div
                            :class="`${additional._id == selectedImage ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-[35rem]' : ' w-12 h-12'} flex flex-col items-end`">
                            <img v-if="additional._id == selectedImage" @click="selectedImage = ''"
                                src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full w-7 cursor-pointer">
                            <img @click="selectedImage = additional._id"
                                :src="this.apiUrl + '/static/get' + additional.image.substring(1)" alt=""
                                :class="` w-full h-full object-cover rounded shadow-2xl mr-2 cursor-pointer`" />
                        </div>
                    </div>
                    <div class="text-center">
                        <p>{{ additional.name }}</p>
                    </div>
                    <div class="text-center">
                        <p>{{ ConvertToKhmerNumber(additional.price) }}៛</p>
                    </div>
                    <div class="flex justify-end">
                        <button @click="showEditAdditionalForm = additional._id"
                            class="bg-[#EFF3F6] rounded-full mx-2  hover:-translate-y-1 hover:scale-110 hover:bg-blue-200">
                            <img src="@/assets/images/Edit.svg" alt="" class="m-2">
                        </button>

                        <EditAdditional v-if="showEditAdditionalForm == additional._id"
                            :get-all-additionals="getAllAdditionals" :additional="additional"
                            :cancel-edit-additional="() => { showEditAdditionalForm = '' }" />

                        <button @click="showDeleteAdditionalMessageId = additional._id"
                            class="bg-[#EFF3F6] rounded-full mx-2  hover:-translate-y-1 hover:scale-110 hover:bg-red-200">
                            <img src="@/assets/images/Delete.svg" alt="" class="m-2">
                        </button>

                        <DeleteAdditional v-if="showDeleteAdditionalMessageId == additional._id"
                            :get-all-additionals="getAllAdditionals" :additional="additional"
                            :cancel-delete-additional="() => { showDeleteAdditionalMessageId = '' }" />
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-between m-2 mt-8 text-lg">
            <div class="pagination-info">{{ paginationInfo }}</div>
            <Pagination :pages="totalPages" :currentPage="currentPage" @page-changed="changePage" />
        </div>
    </div>
</template>

<script>
import Pagination from "../../../components/pagination/AdditionalPagination.vue";
import DeleteAdditional from "../../../components/admin/additional-modal/DeleteAdditional.vue";
import EditAdditional from "../../../components/admin/additional-modal/EditAdditional.vue";
import AddAdditional from "../../../components/admin/additional-modal/AddAdditional.vue";
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import axios from 'axios';

export default {
    components: {
        Pagination,
        DeleteAdditional,
        EditAdditional,
        AddAdditional
    },

    mixins: [ConvertToKhmerNumber],
    data() {
        return {
            additionals: '',
            itemsPerPage: 5,
            currentPage: 1,

            showAddAdditionalForm: false,
            showEditAdditionalForm: '',
            showDeleteAdditionalMessageId: '',
            apiUrl: import.meta.env.VITE_API_URL,
            selectedImage: '',
            idDesc: false,
            nameDesc: false,
            priceDesc: false,
            searchString: '',
            loading: true
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.additionals.length / this.itemsPerPage);
        },
        displayAdditionals() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.additionals.slice(startIndex, endIndex);
        },
        paginationInfo() {
            const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endItem = Math.min(this.currentPage * this.itemsPerPage, this.additionals.length);

            const formattedStartItem = this.ConvertToKhmerNumber(startItem.toString().padStart(2, '0'));
            const formattedEndItem = this.ConvertToKhmerNumber(endItem.toString().padStart(2, '0'));

            return `បង្ហាញ ${formattedStartItem}-${formattedEndItem} នៃ ${this.ConvertToKhmerNumber(this.additionals.length)}`;
        }
    },
    mounted() {
        this.getAllAdditionals();
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
            this.$router.push({
                name: "additional",
                query: {
                    page: this.currentPage
                }
            });
        },

        getAllAdditionals() {
            this.loading = true
            axios.get(this.apiUrl + '/additional-product/all')
                .then(response => {
                    this.additionals = response.data;
                    for (let i = 0; i < this.additionals.length; i++) {
                        this.additionals[i].index = i;
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        },
        sortId() {
            this.idDesc ? this.additionals.sort((a, b) => b._id.localeCompare(a._id)) : this.additionals.sort((a, b) => a._id.localeCompare(b._id))
        },
        sortName() {
            this.nameDesc ? this.additionals.sort((a, b) => b.name.localeCompare(a.name)) : this.additionals.sort((a, b) => a.name.localeCompare(b.name))
        },
        sortPrice() {
            this.priceDesc ? this.additionals.sort((a, b) => b.price - a.price) : this.additionals.sort((a, b) => a.price - b.price)
        },
        searchAdditional() {
            if (this.searchString == '') {
                this.getAllAdditionals()
            }
            else {
                axios.get(this.apiUrl + '/additional-product/search/' + this.searchString)
                    .then(response => {
                        this.additionals = response.data;
                        for (let i = 0; i < this.additionals.length; i++) {
                            this.additionals[i].index = i;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        }
    },
    watch: {
        $route(to, from) {
            this.currentPage = parseInt(to.query.page) || 1;
        },
    },
};
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
    background: #fff;
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