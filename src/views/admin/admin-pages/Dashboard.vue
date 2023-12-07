<template>
  <div v-if="loading" class="w-full h-[92vh] grid place-items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
</div>
  <div v-else class=" h-[92vh] ">
    <div>
      <div class="flex z-20 overflow-x-scroll hide-scroll w-full">
        <div v-for="category in categories" :key="category._id" @click=" getCategoryProductsWithOrderLines(category._id, category.name)" class="flex bg-gradient-to-b from-[#1c355d61] to-[#1c355d00] min-w-fit max-w-fit shadow-lg rounded-lg m-4 p-2.5 h-[86px] cursor-pointer">
            <div class="grid grid-cols-[30%,70%] place-items-center">
                <img :src="apiUrl+'/static/get'+category.image. substring(1)" alt="" class="w-14 h-14 object-contain flex justify-center items-center mx-4" />
                <div class="flex items-center justify-end">
                    <div>
                        <div class="flex justify-between">
                            <div>
                                <p class="text-gray-700">{{ category.name }}</p>
                                <p class="text-sm">{{ConvertToKhmerNumber(category.orderAmount)}}</p>
                            </div>
                            <div class="bg-white w-14 h-9 rounded-full flex justify-center items-center text-center">
                                <p class="text-xs">{{ConvertToKhmerNumber( (category.orderAmount/totalOrder  * 100).toFixed(2) )}}%</p>
                            </div>
                        </div>
                        <p class="text-xs mt-2 text-gray-500">ការបញ្ជាទិញ{{ category.name }}ជាមធ្យម</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="h-[78vh] overflow-y-auto hide-scroll">
      <div class="grid grid-cols-2 gap-1">
        <Top5Product />
        <TrendChart />
      </div>
        <ProductInCategory :products="products" :category-name="categoryName" />
    </div>
  </div>
</template>

<script>
import Top5Product from "../../../components/admin/dashboard/Top5Product.vue";
import TrendChart from "../../../components/admin/dashboard/TrendChart.vue";
import ProductInCategory from "../../../components/admin/dashboard/ProductInCategory.vue";
import axios from 'axios';
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";

export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      products: [],
      categories: [],
      totalOrder: 0,
      categoryName: "",
      loading: true,
    };
  },

  mixins: [ConvertToKhmerNumber],
  
  components: {
    Top5Product,
    TrendChart,
    ProductInCategory,
  },
  mounted() {
        this.getAllCategories();
    },

    methods: {
        getAllCategories() {
            axios.get(this.apiUrl+'/category/all/order-line')
                .then(response => {
                    this.categories = response.data;
                    this.categories.forEach(element => {
                        this.totalOrder = this.totalOrder + element.orderAmount
                    });
                    this.loading = false;

                    if(this.categories.length){
                      const fristCate = this.categories[0];
                      this.getCategoryProductsWithOrderLines(fristCate["_id"], fristCate["name"]);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        },

        getCategoryProductsWithOrderLines(categoryId, categoryName) {
            axios.get(this.apiUrl+'/product/category/order-line/'+categoryId)
            .then(res => {
                this.products = res.data
                this.categoryName = categoryName
                console.log(this.products);

            })
            .catch(error => {
                console.error(error);
            })
        },

    }
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
