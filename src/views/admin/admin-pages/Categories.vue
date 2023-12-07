<template>
    <div v-if="loading" class="w-full h-[92vh] grid place-items-center">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else class="mt-6 mx-5 h-[89vh]">
        <div class="grid grid-cols-[47%,53%]">
            <div>
                <p class="text-3xl font-semibold">ប្រភេទទំនិញ</p>
                <p class="text-md text-gray-600 pt-3">ប្រភេទទំនិញសរុបមានចំនួន​ {{ ConvertToKhmerNumber(categories.length) }}
                </p>
            </div>
            <div class="flex justify-between items-center mt-6">
                <div
                    class="h-[35px] w-96 border-solid border border-gray-300 rounded bg-white flex items-center justify-between my-5">
                    <div @click="focusInput" class="flex justify-center items-center px-2 w-full">
                        <img src="@/assets/images/Search.svg" alt="search icon" class="w-[17px] h-[17px]" />
                        <input type="text" placeholder="ស្វែងរក" v-model="searchString" @input="searchCategory"
                            class="input-field text-md w-full pl-2" />
                    </div>
                </div>

                <button @click="showAddCategoryForm = true"
                    class=" h-[35px] bg-[#1C355D] hover:bg-[#1c7db6] flex justify-between items-center text-white px-2 rounded  hover:-translate-y-1 hover:scale-110">
                    <img src="@/assets/images/AddFill.svg" alt="" width="20" height="20">
                    <div class="ml-3">បន្ថែមប្រភេទទំនិញថ្មី</div>
                </button>

                <AddCategory v-if="showAddCategoryForm" :get-all-categories="getAllCategories"
                    :cancel-add-category="() => { showAddCategoryForm = false }" />

            </div>
        </div>
        <div class="bg-white w-full h-[65vh] rounded">
            <div class="p-2">
                <div class="grid grid-cols-[20%,30%,40%,10%] text-2xl font-semibold bg-[#e4e9ec] p-4 mb-3.5 rounded">
                    <div class="flex items-center">
                        <p class="pr-2">លេខសម្គាល់</p>
                        <button @click="idDesc = !idDesc; sortId(); nameDesc = false">
                            <img :class="`${idDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <div class="flex text-center">
                        <p class="pr-2">ឈ្មោះប្រភេទទំនិញ</p>
                        <button @click="nameDesc = !nameDesc; sortName(); idDesc = false">
                            <img :class="`${nameDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <p class="flex justify-center w-3/4">ពណ៌នាអំពីប្រភេទទំនិញ</p>
                    <p class="text-end mr-4">សកម្មភាព</p>
                </div>
                <div v-for="(category, index) in displayCategories" :key="category._id"
                    class="grid grid-cols-[20%,30%,40%,10%] border-2 mt-3 p-3 rounded items-center text-lg">
                    <p>#{{ ConvertToKhmerNumber(category.index + 1) }}</p>
                    <div class="flex ml-4 items-center">
                        <div
                            :class="`${category._id == selectedImage ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-[35rem]' : ' w-12 h-12'} flex flex-col items-end`">
                            <img v-if="category._id == selectedImage" @click="selectedImage = ''"
                                src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full w-7 cursor-pointer">
                            <img @click="selectedImage = category._id"
                                :src="this.apiUrl + '/static/get' + category.image.substring(1)" alt=""
                                :class="` w-full h-full object-cover rounded shadow-2xl mr-2 cursor-pointer`" />
                        </div>
                        <p>{{ category.name }}</p>
                    </div>
                    <div class="w-3/4 overflow-y-scroll mx-2 hide-scroll">
                        <p class="whitespace-nowrap">{{ category.description }}</p>
                    </div>
                    <div class="flex justify-end">
                        <button @click="showEditCategoryForm = category._id"
                            class="bg-[#EFF3F6] rounded-full mx-2  hover:-translate-y-1 hover:scale-110 hover:bg-blue-200">
                            <img src="@/assets/images/Edit.svg" alt="" class="m-2">
                        </button>

                        <EditCategory v-if="showEditCategoryForm == category._id" :category="category"
                            :get-all-categories="getAllCategories"
                            :cancel-edit-category="() => { showEditCategoryForm = '' }" />

                        <button @click="showDeleteMessageId = category._id"
                            class="bg-[#EFF3F6] rounded-full mx-2  hover:-translate-y-1 hover:scale-110 hover:bg-red-200">
                            <img src="@/assets/images/Delete.svg" alt="" class="m-2">
                        </button>

                        <DeleteCategory v-if="showDeleteMessageId == category._id" :get-all-categories="getAllCategories"
                            :category="category" :cancel-delete-category="() => { showDeleteMessageId = '' }" />
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
import Pagination from "../../../components/pagination/CategoryPagination.vue";
import DeleteCategory from "../../../components/admin/category-modals/DeleteCategory.vue";
import EditCategory from "../../../components/admin/category-modals/EditCategory.vue";
import AddCategory from "../../../components/admin/category-modals/AddCategory.vue";
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import axios from 'axios';

export default {
    components: {
        Pagination,
        DeleteCategory,
        EditCategory,
        AddCategory,
    },

    mixins: [ConvertToKhmerNumber],

    data() {
        return {
            categories: '',
            itemsPerPage: 5,
            currentPage: 1,

            showAddCategoryForm: false,
            showEditCategoryForm: '',
            showDeleteMessageId: '',
            apiUrl: import.meta.env.VITE_API_URL,
            idDesc: false,
            nameDesc: false,
            searchString: '',
            selectedImage: '',
            loading: true
        };
    },

    mounted() {
        this.getAllCategories();
    },

    computed: {
        totalPages() {
            return Math.ceil(this.categories.length / this.itemsPerPage);
        },
        displayCategories() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.categories.slice(startIndex, endIndex);
        },
        paginationInfo() {
            const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endItem = Math.min(this.currentPage * this.itemsPerPage, this.categories.length);

            const formattedStartItem = this.ConvertToKhmerNumber(startItem.toString().padStart(2, '0'));
            const formattedEndItem = this.ConvertToKhmerNumber(endItem.toString().padStart(2, '0'));

            return `បង្ហាញ ${formattedStartItem}-${formattedEndItem} នៃ ${this.ConvertToKhmerNumber(this.categories.length)}`;
        },
    },

    methods: {
        changePage(page) {
            this.currentPage = page;
            this.$router.push({
                name: "category",
                query: {
                    page: this.currentPage
                }
            });
        },
        getAllCategories() {
            this.loading = true
            axios.get(this.apiUrl + '/category/all')
                .then(response => {
                    this.categories = response.data;
                    for (let i = 0; i < this.categories.length; i++) {
                        this.categories[i].index = i;
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        },
        sortId() {
            this.idDesc ? this.categories.sort((a, b) => b._id.localeCompare(a._id)) : this.categories.sort((a, b) => a._id.localeCompare(b._id))
        },
        sortName() {
            this.nameDesc ? this.categories.sort((a, b) => b.name.localeCompare(a.name)) : this.categories.sort((a, b) => a.name.localeCompare(b.name))
        },
        searchCategory() {
            if (this.searchString == '') {
                this.getAllCategories()
            }
            else {
                axios.get(this.apiUrl + '/category/search/' + this.searchString)
                    .then(response => {
                        this.categories = response.data;
                        for (let i = 0; i < this.categories.length; i++) {
                            this.categories[i].index = i;
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
}
</style>