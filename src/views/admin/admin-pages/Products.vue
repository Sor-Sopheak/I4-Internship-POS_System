<template>
    <loading v-if="isLoading" />
<div v-if="loading" class="w-full h-[92vh] grid place-items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
</div>
<div v-else class="mt-6 mx-5 h-[89vh]">
    <div class="grid grid-cols-[47%,53%]">
        <div>
            <p class="text-3xl font-semibold">ទំនិញ</p>
            <p class="text-md text-gray-600 pt-3">ការទំនិញសរុបមានចំនួន​ {{ ConvertToKhmerNumber(products.length) }}</p>
        </div>
        <div class="flex justify-between items-center mt-6">
            <div class="h-[35px] w-96 border border-gray-300 rounded bg-white flex items-center justify-between my-5">
                <div @click="focusInput" class="flex justify-center items-center px-2 w-full">
                    <img src="@/assets/images/Search.svg" alt="search icon" class="w-[17px] h-[17px]" />
                    <input type="text" v-model="searchString" @input="searchProduct" placeholder="ស្វែងរក" class="input-field text-md w-full pl-2" />
                </div>
            </div>

            <button @click="showAddProductForm = true" class="h-[35px] bg-[#1C355D] hover:bg-[#1c7db6] hover:-translate-y-1 hover:scale-110 flex justify-between items-center text-white px-2 rounded">
                <img src="@/assets/images/AddFill.svg" alt="" width="20" height="20">
                <p class="ml-3">បន្ថែមប្រភេទទំនិញថ្មី</p>
            </button>

            <AddProduct v-if="showAddProductForm" :cancel-add-product="() => {showAddProductForm = false}" :categories="categories" :get-all-products="getAllProducts" />
        </div>
    </div>
    <div class="bg-white w-full h-[65vh] rounded">
        <div class="p-2">
            <div class="grid grid-cols-[12%,25%,33%,15%,15%] text-2xl font-semibold bg-[#e4e9ec] p-4 mb-3.5 rounded">
                <div class="flex items-center">
                    <p class="pr-2">លេខសម្គាល់</p>
                    <button @click="idDesc = !idDesc; nameDesc = false; priceDesc = false; sortId()">
                        <img :class="`${idDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt="" width="15" height="15">
                    </button>
                </div>
                <div class="flex items-center justify-center w-4/5 ml-6">
                    <p class="pr-2">ឈ្មោះទំនិញ</p>
                    <button @click="nameDesc = !nameDesc; idDesc = false; priceDesc = false; sortName()">
                        <img :class="`${nameDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt="" width="15" height="15">
                    </button>
                </div>
                <p class="flex items-center justify-center ">គ្រឿងបន្ថែម</p>
                <div class="flex items-center justify-center text-center">
                    <p class="pr-2">តម្លៃទំនិញ</p>
                    <button @click="priceDesc = !priceDesc; idDesc = false; nameDesc = false; sortPrice()">
                        <img :class="`${priceDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt="" width="15" height="15">
                    </button>
                </div>
                <p class=" text-end w-full pr-4">សកម្មភាព</p>
            </div>
            <div v-for="(product, index) in displayProducts" :key="product._id" class="grid grid-cols-[10%,27%,33%,15%,15%] border-2 mt-3 p-3 rounded place-items-center text-lg">
                <div class="-ml-24">#{{ ConvertToKhmerNumber(product.index + 1) }}</div>
                <div class="flex items-center justify-start w-4/5 ml-32">
                        <div
                            :class="`${product._id == selectedImage ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-[35rem]' : ' w-12 h-12'} flex flex-col items-end`">
                            <img v-if="product._id == selectedImage" @click="selectedImage = ''"
                                src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full w-7 cursor-pointer">
                            <img @click="selectedImage = product._id"
                                :src="this.apiUrl + '/static/get' + product.image.substring(1)" alt=""
                                :class="` w-full h-full object-cover rounded shadow-2xl mr-2 cursor-pointer`" />
                        </div>
                    <p>{{ product.name }}</p>
                </div>
                <div class="w-full">
                    <div v-if="product.additionalProducts.length > 0" class="flex justify-center items-center px-6">
                        <div v-for="additionalProduct in product.additionalProducts" :key="additionalProduct._id">
                            <p class="truncate">{{ additionalProduct.name }}&nbsp;</p>
                        </div>
                        <div class="flex-grow"></div>
                        <button @click="showDetailAdditionalProductId = product._id" class="flex justify-end">
                            <img src="@/assets/images/DotThreeFill.svg" alt="" width="30" height="30">
                        </button>
                        <DetailAdditional v-if="showDetailAdditionalProductId == product._id" :get-all-products="getAllProducts" :additional-products="product.additionalProducts" :product="product" :ConvertToKhmerNumber="ConvertToKhmerNumber" :cancel-view-additional-product="() => {showDetailAdditionalProductId = ''}" />
                    </div>
                    <div v-else class="flex items-center justify-center px-6">
                        <p  class="text-gray-500">មិនមានគ្រឿងបន្ថែមសម្រាប់ទំនិញនេះទេ</p>
                        <div class="flex-grow"></div>
                        <button @click="showDetailAdditionalProductId = product._id">
                            <img src="@/assets/images/DotThreeFill.svg" alt="" width="30" height="30">
                        </button>
                        <DetailAdditional v-if="showDetailAdditionalProductId == product._id" :get-all-products="getAllProducts" :additionalProducts="product.additionalProducts" :product="product" :ConvertToKhmerNumber="ConvertToKhmerNumber" :cancel-view-additional-product="() => {showDetailAdditionalProductId = ''}" />
                    </div>
                    
                </div>

                <div>
                    <div class="flex items-center justify-center">
                        <div >
                            {{ ConvertToKhmerNumber(product.price) }}៛
                        </div>
                        <button @click="showDetailPriceProductId = product._id" class="ml-2">
                            <img src="@/assets/images/DotThreeFill.svg" alt="" width="30" height="30">
                        </button>
                        <DetailPrice v-if="showDetailPriceProductId == product._id" :get-all-products="getAllProducts" :prices="product.prices" :product="product" :ConvertToKhmerNumber="ConvertToKhmerNumber" :cancel-view-product-price="() => {showDetailPriceProductId = ''}" />
                    </div>
                </div>

                <div class="flex justify-end">
                    <div>
                        <button v-if="product.show == 'false'" @click="updateVisibility(product._id, 'true')" class="rounded-full mx-2 hover:-translate-y-1 hover:scale-110">
                            <img src="@/assets/images/Hide.svg" alt="" class="m-2">
                        </button>
                        <button v-if="product.show == 'true'" @click="updateVisibility(product._id, 'false')" class="rounded-full mx-2 hover:-translate-y-1 hover:scale-110">
                            <img src="@/assets/images/Show.svg" alt="" class="m-2">
                        </button>
                    </div>

                    <button @click="showEditProductForm = product._id" class="bg-[#EFF3F6] h-fit rounded-full mx-2 hover:-translate-y-1 hover:scale-110 hover:bg-blue-200">
                        <img src="@/assets/images/Edit.svg" alt="" class="m-2">
                    </button>

                    <EditProduct v-if="showEditProductForm == product._id" :categories="categories" :product="product" :get-all-products="getAllProducts" :cancel-edit-product="() => {showEditProductForm = ''}" />

                    <button @click="showDeleteProductMessageId = product._id" class="bg-[#EFF3F6] h-fit rounded-full mx-2 hover:-translate-y-1 hover:scale-110 hover:bg-red-200">
                        <img src="@/assets/images/Delete.svg" alt="" class="m-2">
                    </button>

                    <DeleteProduct v-if="showDeleteProductMessageId == product._id" :get-all-products="getAllProducts" :product="product" :cancel-delete-product="() => {showDeleteProductMessageId = ''}" />
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
import Pagination from "../../../components/pagination/ProductPagination.vue";
import DeleteProduct from "../../../components/admin/product-modal/DeleteProduct.vue";
import AddProduct from "../../../components/admin/product-modal/AddProduct.vue";
import EditProduct from "../../../components/admin/product-modal/EditProduct.vue";
import DetailAdditional from "../../../components/admin/product-modal/DetailAdditional.vue";
import DetailPrice from "../../../components/admin/product-modal/DetailPrice.vue"
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import axios from "axios";
import loading from "../../../components/loading.vue";

export default {
    components: {
        Pagination,
        DeleteProduct,
        EditProduct,
        AddProduct,
        DetailAdditional,
        DetailPrice,
        loading
    },

    mixins: [ConvertToKhmerNumber],

    data() {
        return {
            products: '',
            categories: '',
            itemsPerPage: 5,
            currentPage: 1,

            showAddProductForm: false,
            showEditProductForm: '',
            showDeleteProductMessageId: '',
            showDetailAdditionalProductId: '',
            showDetailPriceProductId: '',
            apiUrl: import.meta.env.VITE_API_URL,
            selectedImage: '',
            idDesc: false,
            nameDesc: false,
            priceDesc: false,
            searchString: '',
            loading: true,
            isLoading: false
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },
        displayProducts() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.products.slice(startIndex, endIndex);
        },
        paginationInfo() {
            const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endItem = Math.min(this.currentPage * this.itemsPerPage, this.products.length);

            const formattedStartItem = this.ConvertToKhmerNumber(startItem.toString().padStart(2, '0'));
            const formattedEndItem = this.ConvertToKhmerNumber(endItem.toString().padStart(2, '0'));

            return `បង្ហាញ ${formattedStartItem}-${formattedEndItem} នៃ ${this.ConvertToKhmerNumber(this.products.length)}`;
        },
    },

    mounted() {
        this.getAllProducts();
        this.getAllCategories();
    },

    methods: {
        changePage(page) {
            this.currentPage = page;
            this.$router.push({
                name: "product",
                query: {
                    page: this.currentPage
                }
            });
        },

        getAllProducts() {
            this.loading = true
            axios.get(this.apiUrl+'/product/all')
                .then(response => {
                    this.products = response.data;
                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].index = i;
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        },

        updateVisibility(id, visibility) {
            this.isLoading = true
            axios.put(this.apiUrl+'/product', {
                _id: id,
                show: visibility
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin'),
                }
            })
            .then(res => {
                this.getAllProducts()
                this.isLoading = false
            })
            .catch(error => {
                console.error(error);
            })
        },
        getAllCategories() {
            axios.get(this.apiUrl + '/category/all')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error(error);
                })
        },
        sortId() {
            this.idDesc ? this.products.sort((a, b) => b._id.localeCompare(a._id)) : this.products.sort((a, b) => a._id.localeCompare(b._id))
        },
        sortName() {
            this.nameDesc ? this.products.sort((a, b) => b.name.localeCompare(a.name)) : this.products.sort((a, b) => a.name.localeCompare(b.name))
        },
        sortPrice() {
            this.priceDesc ? this.products.sort((a, b) => b.price - a.price) : this.products.sort((a, b) => a.price - b.price)
        },
        searchProduct() {
            if(this.searchString == '') {
                this.getAllProducts()
            }
            else{
                axios.get(this.apiUrl+'/product/search/'+this.searchString)
                    .then(response => {
                        this.products = response.data;
                        for (let i = 0; i < this.products.length; i++) {
                            this.products[i].index = i;
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