<template>
    <div v-if="loading" class="w-full h-[92vh] grid place-items-center">
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div v-else class="mt-8 mx-5 h-[88vh]">
        <div class="grid grid-cols-[50%,50%]">
            <div>
                <p class="text-3xl font-semibold">អ្នកប្រើប្រាស់</p>
                <p class="text-md text-gray-600 pt-3">អ្នកប្រើប្រាស់សរុបមានចំនួន​ {{ ConvertToKhmerNumber(users.length) }}
                </p>
            </div>
            <div class="flex justify-between items-center mt-6">
                <div class="h-[35px] w-96 border border-gray-300 rounded bg-white flex items-center justify-between my-5">
                    <div @click="focusInput" class="flex justify-center items-center px-2 w-full">
                        <img src="@/assets/images/Search.svg" alt="search icon" class="w-[17px] h-[17px]" />
                        <input type="text" placeholder="ស្វែងរក" v-model="searchString" @input="searchUser"
                            class="input-field text-md w-full pl-2" />
                    </div>
                </div>

                <button @click="showAddUserForm = true"
                    class="h-[35px] bg-[#1C355D] hover:bg-[#1c7db6] hover:-translate-y-1 hover:scale-110 flex justify-between items-center text-white px-2 rounded">
                    <img src="@/assets/images/AddFill.svg" alt="" width="20" height="20">
                    <p class="ml-3">បន្ថែមអ្នកប្រើប្រាស់ថ្មី</p>
                </button>

                <AddUser v-if="showAddUserForm" :cancel-add-user="() => { showAddUserForm = false }"
                    :get-all-users="getAllUsers" />
            </div>
        </div>
        <div class="bg-white w-full h-[65vh] rounded">
            <div class="p-2">
                <div class="grid grid-cols-[10%,30%,15%,30%,15%] text-2xl font-semibold bg-[#e4e9ec] p-4 mb-3.5 rounded">
                    <div class="flex items-center">
                        <p class="pr-2">លេខសម្គាល់</p>
                        <button @click="idDesc = !idDesc; sortId(); nameDesc = false; genderDesc = false; roleDesc = false">
                            <img :class="`${idDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="pr-2">ឈ្មោះ</p>
                        <button
                            @click="nameDesc = !nameDesc; sortName(); idDesc = false; genderDesc = false; roleDesc = false">
                            <img :class="`${nameDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="pr-2">ភេទ</p>
                        <button
                            @click="genderDesc = !genderDesc; sortGender(); idDesc = false; nameDesc = false; roleDesc = false">
                            <img :class="`${genderDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="pr-2">មុខងារ</p>
                        <button
                            @click="roleDesc = !roleDesc; sortRole(); idDesc = false; nameDesc = false; genderDesc = false">
                            <img :class="`${roleDesc ? 'rotate-180' : ''}`" src="@/assets/images/ArrowFillDown.svg" alt=""
                                width="15" height="15">
                        </button>
                    </div>
                    <p class="text-end mr-4">សកម្មភាព</p>
                </div>
                <div v-for="(user, index) in displayedUsers" :key="user.id"
                    class="grid grid-cols-[10%,30%,15%,30%,15%] border-2 mt-3 p-3 rounded items-center text-lg">
                    <p>#{{ ConvertToKhmerNumber(user.index + 1) }}</p>
                    <div class="flex items-center ml-20">
                        <div
                            :class="`${user._id == selectedImage ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-[35rem]' : ' w-12 h-12'} flex flex-col items-end`">
                            <img v-if="user._id == selectedImage" @click="selectedImage = ''"
                                src="@/assets/images/XBoldActive.svg" alt="" class="max-w-full w-7 cursor-pointer mt-8">
                            <div v-if="user.image">
                                <img @click="selectedImage = user._id"
                                    :src="this.apiUrl + '/static/get' + user.image.substring(1)" alt="" class="object-cover min-h-[50px] -mb-3"
                                    :class="` w-full h-5/6 object-cover rounded shadow-2xl mr-2 cursor-pointer`" />
                            </div>
                        </div>
                    
                    <p class="ml-4">{{ user.username }}</p>
                </div>
                <p v-if="user.gender" class="text-center pr-4">{{ user.gender }}</p>
                <p v-else class="text-center pr-4 text-2xl">.....</p>
                <p class="text-center">{{ user.role }}</p>
                <div class="flex justify-end">
                    <button @click="showEditUserForm = user._id" :cancel-edit-user="() => {showEditUserForm = ''}" class="bg-[#EFF3F6] rounded-full mx-2 hover:-translate-y-1 hover:scale-110 hover:bg-blue-200">
                        <img src="@/assets/images/Edit.svg" alt="" class="m-2">
                    </button>

                        <EditUser :user="user" :get-all-users="getAllUsers" v-if="showEditUserForm == user._id"
                            :cancel-edit-user="() => { showEditUserForm = '' }" />

                        <button @click="showDeleteUserMessage = user._id"
                            class="bg-[#EFF3F6] rounded-full mx-2 hover:-translate-y-1 hover:scale-110 hover:bg-red-200">
                            <img src="@/assets/images/Delete.svg" alt="" class="m-2">
                        </button>

                        <DeleteUser v-if="showDeleteUserMessage == user._id" :get-all-users="getAllUsers" :user="user"
                            :cancel-delete-user="() => { showDeleteUserMessage = '' }" />
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
import Pagination from "../../../components/pagination/UserPagination.vue";
import DeleteUser from "../../../components/admin/user-modal/DeleteUser.vue";
import EditUser from "../../../components/admin/user-modal/EditUser.vue";
import AddUser from "../../../components/admin/user-modal/AddUser.vue";
import ConvertToKhmerNumber from "../../../mixins/ConvertToKhmerNumber";
import axios from "axios";

export default {
    components: {
        Pagination,
        DeleteUser,
        AddUser,
        EditUser,
    },

    mixins: [ConvertToKhmerNumber],

    data() {
        return {
            users: '',
            itemsPerPage: 5,
            currentPage: 1,

            showAddUserForm: false,
            showEditUserForm: '',
            showDeleteUserMessage: '',
            apiUrl: import.meta.env.VITE_API_URL,
            selectedImage: '',
            idDesc: false,
            nameDesc: false,
            genderDesc: false,
            roleDesc: false,
            searchString: '',
            loading: true,
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },

    mounted() {
        this.getAllUsers();
    },

    computed: {
        totalPages() {
            return Math.ceil(this.users.length / this.itemsPerPage);
        },
        displayedUsers() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.users.slice(startIndex, endIndex);
        },
        paginationInfo() {
            const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endItem = Math.min(this.currentPage * this.itemsPerPage, this.users.length);

            const formattedStartItem = this.ConvertToKhmerNumber(startItem.toString().padStart(2, '0'));
            const formattedEndItem = this.ConvertToKhmerNumber(endItem.toString().padStart(2, '0'));

            return `បង្ហាញ ${formattedStartItem}-${formattedEndItem} នៃ ${this.ConvertToKhmerNumber(this.users.length)}`;
        },
    },

    methods: {
        changePage(page) {
            this.currentPage = page;
            this.$router.push({
                name: "user",
                query: {
                    page: this.currentPage
                }
            });
        },

        getAllUsers() {
            this.loading = true
            axios.get(this.apiUrl + '/user/all')
                .then(response => {
                    this.users = response.data;
                    for (let i = 0; i < this.users.length; i++) {
                        this.users[i].index = i;
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.error(error);
                })
        },
        sortId() {
            this.idDesc ? this.users.sort((a, b) => b._id.localeCompare(a._id)) : this.users.sort((a, b) => a._id.localeCompare(b._id))
        },
        sortName() {
            this.nameDesc ? this.users.sort((a, b) => b.username.localeCompare(a.username)) : this.users.sort((a, b) => a.username.localeCompare(b.username))
        },
        sortGender() {
            this.genderDesc ? this.users.sort((a, b) => b.gender.localeCompare(a.gender)) : this.users.sort((a, b) => a.gender.localeCompare(b.gender))
        },
        sortRole() {
            this.roleDesc ? this.users.sort((a, b) => b.role.localeCompare(a.role)) : this.users.sort((a, b) => a.role.localeCompare(b.role))
        },
        searchUser() {
            if (this.searchString == '') {
                this.getAllUsers()
            }
            else {
                axios.get(this.apiUrl + '/user/search/' + this.searchString)
                    .then(response => {
                        this.users = response.data;
                        for (let i = 0; i < this.users.length; i++) {
                            this.users[i].index = i;
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

