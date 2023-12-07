<template>
<div class="bg-white h-100vh">
    <div class="bg-[#1c355d] flex justify-between items-center text-center text-white h-[8vh] px-4 mb-6">
        <img src="@/assets/images/PoCo-logo.png" alt="logo" width="35" height="35">
        <img src="@/assets/images/MenuBar.svg" alt="menu bar" width="35" hieght="35" />
    </div>

    <div>
        <router-link :to="{ name: 'dashboard'}">
            <button @click="goUpMenu()" :class="` ${('dashboard' == this.$router.currentRoute.value.name) ? 'bg-[#1c355d] text-white font-semibold rounded-r-full w-[97%]':'bg-white'} text-lg text-gray-500 w-[97%]`">
                <div class="px-6 grid grid-cols-[40%,60%] my-2.5">
                    <div>
                        <img v-if="('dashboard' == this.$router.currentRoute.value.name)" src="@/assets/images/HomeActive.svg" alt="" width="32" height="34" />
                        <img v-else src="@/assets/images/Home.svg" alt="" width="32" height="34" />
                    </div>
                    <div class="text-start text-xl pt-1">
                        <p>ផ្ទាំងព័ត៌មាន</p>
                    </div>
                </div>
            </button>
        </router-link>

        <router-link :to="{ name: 'order' }">
            <button @click="goUpMenu()" :class="` ${('order' == this.$router.currentRoute.value.name) ? 'bg-[#1c355d] text-white font-semibold rounded-r-full':'bg-white'} text-lg text-gray-500 w-[97%]`">
                <div class="px-6 grid grid-cols-[40%,60%] my-2.5">
                    <div>
                        <img v-if="('order' == this.$router.currentRoute.value.name)" src="@/assets/images/OrderActive.svg" alt="" width="32" height="34" />
                        <img v-else src="@/assets/images/Order.svg" alt="" width="32" height="34" />
                    </div>

                    <div class="text-start text-xl pt-1">
                        <p>ការបញ្ជាទិញ</p>
                    </div>
                </div>
            </button>
        </router-link>

        <button :class="` ${(('category' == this.$router.currentRoute.value.name) || ('product' == this.$router.currentRoute.value.name) || ('additional' == this.$router.currentRoute.value.name)) ? 'bg-[#1c355d] text-white font-semibold rounded-se-3xl':'bg-white'} text-lg text-gray-500 w-[97%]`" @click="dropDownMenu()">
            <router-link :to="{ name: 'category' }" class="px-6 grid grid-cols-[40%,60%] my-2.5">
                <div>
                    <img v-if="(('category' == this.$router.currentRoute.value.name) || ('product' == this.$router.currentRoute.value.name) || ('additional' == this.$router.currentRoute.value.name))" src="@/assets/images/MenuActive.svg" alt="" width="32" height="34" />
                    <img v-else src="@/assets/images/Menu.svg" alt="" width="32" height="34" />
                </div>
                <div class="text-start text-xl pt-1">
                        <p>ម៉ឺនុយ</p>
                </div>
            </router-link>
        </button>

        <div :class="`bg-[#e0ebfd] w-[97%] rounded-ee-3xl text-lg`" v-if="isDropdownOpen">
            <div class="flex flex-col justify-center ml-8 pt-2 text-gray-500 text-lg w-full">
                <router-link :to="{ name: 'category' }">
                    <button :class="` ${('category' == this.$router.currentRoute.value.name) ? 'text-[#1c355d]' : 'text-gray-500'} px-2 flex justify-between my-1`">
                        <div class="pl-6 grid grid-cols-[20%,80%] my-2">
                            <div>
                                <img v-if="('category' == this.$router.currentRoute.value.name)" src="@/assets/images/CategoryActive.svg" alt="" width="38" height="40" />
                                <img v-else src="@/assets/images/Category.svg" alt="" width="38" height="40" />
                            </div>
                            <div class="ml-5 text-start text-lg">
                                <p>ប្រភេទ</p>
                            </div>
                        </div>
                    </button>
                </router-link>
                <router-link :to="{ name: 'product' }">
                    <button  :class="` ${('product' == this.$router.currentRoute.value.name) ? 'text-[#1c355d]' : 'text-gray-500'} px-2 flex justify-between my-1`">
                        <div class="pl-6 grid grid-cols-[30%,70%] my-2">
                            <div>
                                <img v-if="('product' == this.$router.currentRoute.value.name)" src="@/assets/images/ProductActive.svg" alt="" width="24" height="28" />
                                <img v-else src="@/assets/images/Product.svg" alt="" width="24" height="28" />
                            </div>
                            <div class="ml-3.5 text-start text-lg pl-1">
                                <p>ទំនិញ</p>
                            </div>
                        </div>
                    </button>
                </router-link>
                <router-link :to="{ name: 'additional' }">
                    <button :class="` ${('additional' == this.$router.currentRoute.value.name) ? 'text-[#1c355d]' : 'text-gray-500'} px-2 flex justify-between my-1`">
                        <div class="pl-6 grid grid-cols-[30%,70%] my-2">
                            <div>
                                <img v-if="('additional' == this.$router.currentRoute.value.name)" src="@/assets/images/AdditionalActive.svg" alt="" width="24" height="28" />
                                <img v-else src="@/assets/images/Additional.svg" alt="" width="24" height="28" />
                            </div>
                            <div class="ml-0.5 text-start text-lg pl-1">
                                <p class="w-[100px]">គ្រឿងបន្ថែម</p>
                            </div>
                        </div>
                    </button>
                </router-link>
            </div>
        </div>
        <router-link :to="{ name: 'user' }">
            <button @click="goUpMenu()" :class="` ${('user' == this.$router.currentRoute.value.name) ? 'bg-[#1c355d] text-white font-semibold rounded-r-full ':'bg-white'} text-lg text-gray-500 w-[97%]`">
                <div class="px-6 grid grid-cols-[40%,60%] my-2.5">
                    <img v-if="('user' == this.$router.currentRoute.value.name)" src="@/assets/images/UserActive.svg" alt="" width="32" height="34" />
                    <img v-else src="@/assets/images/User.svg" alt="" width="32" height="34" />

                    <div class="text-start text-xl pt-1">
                        <p>អ្នកប្រើប្រាស់</p>
                    </div>
                </div>
            </button>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isDropdownOpen: false,
            index: 1,
            indexMenu: 0
        };
    },

    methods: {
        dropDownMenu() {
            this.isDropdownOpen = true
        },
        goUpMenu() {
            this.isDropdownOpen = false
        },
    },

    mounted() {
        if (('category' == this.$router.currentRoute.value.name) || ('product' == this.$router.currentRoute.value.name) || ('additional' == this.$router.currentRoute.value.name)) {
            this.dropDownMenu()
        }
    }
};
</script>
