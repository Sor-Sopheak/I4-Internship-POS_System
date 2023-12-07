<template>
  <div v-if="loading" class="w-full h-[92vh] grid place-items-center">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div v-else class="mt-8 mx-5 h-[89vh]">
    <div class="grid grid-cols-[50%,50%]">
      <div>
        <p class="text-3xl font-semibold">ការបញ្ជាទិញ</p>
        <p class="text-md text-gray-600 pt-3">
          ការបញ្ជាទិញសរុបមានចំនួន {{ ConvertToKhmerNumber(orders.length) }}
        </p>
      </div>
      <div class="flex justify-end items-end m-5 mt-6">
        <div
          @click="focusInput"
          class="flex justify-center items-center bg-white border border-gray-300 rounded px-2 h-[35px] w-96"
        >
          <img
            src="@/assets/images/Search.svg"
            alt="search icon"
            class="w-[17px] h-[17px]"
          />
          <input
            type="text"
            placeholder="ស្វែងរក"
            class="input-field text-md w-full pl-2"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-between w-1/3 text-xl mb-4">
      <button
        :class="`${orderType == 1 ? ' border-b border-b-black' : ''}`"
        @click="
          getAllOrders();
          orderType = 1;
        "
      >
        ការបញ្ជាទិញទាំងអស់
      </button>
      <button
        :class="`${orderType == 2 ? ' border-b border-b-black' : ''}`"
        @click="
          getDineInOrders();
          orderType = 2;
        "
      >
        ញាំក្នុងហាង
      </button>
      <button
        :class="`${orderType == 3 ? ' border-b border-b-black' : ''}`"
        @click="
          getTakeOutOrders();
          orderType = 3;
        "
      >
        ខ្ចប់
      </button>
    </div>
    <div class="bg-white w-full h-[62vh] rounded">
      <div class="p-2">
        <div
          class="grid grid-cols-[15%,35%,35%,15%] text-2xl font-semibold bg-[#e4e9ec] p-4 mb-3.5 rounded"
        >
          <div class="flex items-center">
            <p class="pr-2">លេខសម្គាល់</p>
            <button
              @click="
                idDesc = !idDesc;
                nameDesc = false;
                priceDesc = false;
                sortId();
              "
            >
              <img
                :class="`${idDesc ? 'rotate-180' : ''}`"
                src="@/assets/images/ArrowFillDown.svg"
                alt=""
                width="15"
                height="15"
              />
            </button>
          </div>
          <div class="flex justify-center items-center">
            <p class="pr-2">តម្លៃសរុប</p>
            <button
              @click="
                priceDesc = !priceDesc;
                idDesc = false;
                nameDesc = false;
                sortPrice();
              "
            >
              <img
                :class="`${priceDesc ? 'rotate-180' : ''}`"
                src="@/assets/images/ArrowFillDown.svg"
                alt=""
                width="15"
                height="15"
              />
            </button>
          </div>
          <div class="flex justify-center items-center">
            <p class="pr-2">កាលបរិច្ឆេទ</p>
            <button
              @click="
                dateDesc = !dateDesc;
                idDesc = false;
                priceDesc = false;
                sortDate();
              "
            >
              <img
                :class="`${dateDesc ? 'rotate-180' : ''}`"
                src="@/assets/images/ArrowFillDown.svg"
                alt=""
                width="15"
                height="15"
              />
            </button>
          </div>
          <p class="flex justify-end mr-6 items-right">ប្រភេទ</p>
        </div>
        <div v-for="order in displayOrder" :key="order._id">
          <div
            class="grid grid-cols-[15%,35%,35%,15%] border-2 mt-3 p-5 rounded items-center cursor-pointer text-lg"
            @click="{
              showOrderLineForm = order._id;
              selectedOrder = order;
            }"
          >
            <p>#{{ ConvertToKhmerNumber(order.orderNumber) }}</p>
            <p class="flex justify-center items-center mr-4">
              {{ ConvertToKhmerNumber(order.totalPrice) }}៛
            </p>
            <p class="flex justify-center items-center">
              {{ FormattedKhmerDate(order.createdAt) }}
            </p>
            <p
              :class="{
                'text-blue-500': order.type === 'ញាំក្នុងហាង',
                'text-red-500': order.type === 'ខ្ចប់',
              }"
              class="text-center flex -mr-14 justify-center"
            >
              {{ order.type }}
            </p>
          </div>
          <OrderLine
            v-if="selectedOrder != null"
            :order="selectedOrder"
            :order-lines="order.orderLines"
            :cancel-view-order-line="
              () => {
                showOrderLineForm = '';
                selectedOrder = null;
              }
            "
          />
        </div>
      </div>
    </div>

    <div class="flex justify-between m-2 mt-8 text-lg">
      <div class="pagination-info">{{ paginationInfo }}</div>
      <Pagination
        :pages="totalPages"
        :currentPage="currentPage"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>

<script>
import FormatDateAndTimeMixin from "../../../mixins/FormatDateAndTime";
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import Pagination from "../../../components/pagination/OrderPagination.vue";
import OrderLine from "../../../components/admin/order-modal/OrderLine.vue";
import axios from "axios";

export default {
  components: {
    Pagination,
    OrderLine,
  },

  mixins: [ConvertToKhmerNumber, FormatDateAndTimeMixin],

  data() {
    return {
      orders: [],
      dineIn: [],
      takeOut: [],
      allOrders: [],
      itemsPerPage: 5,
      currentPage: 1,
      apiUrl: import.meta.env.VITE_API_URL,

      showOrderLineForm: "",
      selectedOrder: null,
      orderType: 1,
      idDesc: false,
      dateDesc: false,
      priceDesc: false,
      loading: true,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },

    displayOrder() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.orders.slice(startIndex, endIndex);
    },

    paginationInfo() {
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(
        this.currentPage * this.itemsPerPage,
        this.orders.length
      );

      const formattedStartItem = this.ConvertToKhmerNumber(
        startItem.toString().padStart(2, "0")
      );
      const formattedEndItem = this.ConvertToKhmerNumber(
        endItem.toString().padStart(2, "0")
      );

      return `បង្ហាញ ${formattedStartItem}-${formattedEndItem} នៃ ${this.ConvertToKhmerNumber(
        this.orders.length
      )}`;
    },
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$router.push({
        name: "order",
        query: {
          page: this.currentPage,
        },
      });
    },

    fetchAllOrders() {
      this.loading = true;
      axios
        .get(this.apiUrl + "/order/all?sortField=_id&sortOrder=asc")
        .then((response) => {
          this.allOrders = response.data;
          for (let i = 0; i < this.allOrders.length; i++) {
            this.allOrders[i].index = i;
            if (this.allOrders[i].type == "ញាំក្នុងហាង") {
              this.dineIn.push(this.allOrders[i]);
            } else if (this.allOrders[i].type == "ខ្ចប់") {
              this.takeOut.push(this.allOrders[i]);
            }
          }
          this.orders = this.allOrders;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })

    },
    getAllOrders() {
      this.orders = this.allOrders;
    },
    getDineInOrders() {
      this.orders = this.dineIn;
    },
    getTakeOutOrders() {
      this.orders = this.takeOut;
    },
    viewOrderLine() {
      this.showOrderLineForm = false;
    },
    sortId() {
      this.idDesc
        ? this.orders.sort((a, b) => b._id.localeCompare(a._id))
        : this.orders.sort((a, b) => a._id.localeCompare(b._id));
    },
    sortDate() {
      this.dateDesc
        ? this.orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : this.orders.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    },
    sortPrice() {
      this.priceDesc
        ? this.orders.sort((a, b) => b.totalPrice - a.totalPrice)
        : this.orders.sort((a, b) => a.totalPrice - b.totalPrice);
    },
  },
  mounted() {
    this.fetchAllOrders();
    this.getAllOrders();
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
