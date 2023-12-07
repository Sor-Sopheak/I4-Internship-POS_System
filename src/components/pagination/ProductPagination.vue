<template>
<div>
    <ul v-if="pages" class="list-reset flex">
        <li class="inline-block hover:bg-blue-lightest">
            <router-link :to="{ name: 'product', query: { page: currentPage - 1 } }" class="no-underline block" :class="{
                'bg-grey-lightest text-grey cursor-not-allowed': currentPage == 1,
              }" tag="a">
                <img src="@/assets/images/ArrowPrevious.svg" alt="" width="30" height="30">
            </router-link>
        </li>
        <li v-for="(page, index) in range" :key="index" class="inline-block hover:bg-blue-lightest" :class="{ '': index == range.length - 1 }">
            <router-link v-if="page != '...'" :to="{ name: 'product', query: { page: page } }" class="no-underline block py-1 px-1" :class="{ 'text-[#4280E3]': page == currentPage  }" tag="a">
                {{ ConvertToKhmerNumber(page) }}
            </router-link>
            <a v-else href="#" class="no-underline text-grey-darker block ">{{ page }}</a>
        </li>
        <li class="inline-block hover:bg-blue-lightest">
            <router-link :to="{ name: 'product', query: { page: currentPage + 1 } }" class="no-underline block" :class="{
                'bg-grey-lightest cursor-not-allowed':
                  currentPage >= pages,
              }" tag="a">
                <img src="@/assets/images/ArrowNext.svg" alt="" width="30" height="30">
            </router-link>
        </li>
    </ul>
</div>
</template>

    
<script>
import ConvertToKhmerNumber from '../../mixins/ConvertToKhmerNumber';

export default {
    name: "Pagination",

    mixins: [ConvertToKhmerNumber],

    props: {
        pages: {
            type: Number,
            default: 0,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            range: [],
        };
    },

    computed: {
        propsToWatch() {
            return this.pages, this.currentPage, Date.now();
        },
    },

    watch: {
        propsToWatch: {
            handler: "organisePageLinks",
            immediate: true,
        },
    },

    methods: {
        organisePageLinks() {
            this.range = [];
            for (let i = 1; i <= this.pages; i++) {
                if (
                    i == 1 || 
                    i == this.pages || 
                    i == this.currentPage || 
                    i == this.currentPage - 1 || 
                    i == this.currentPage + 1 || 
                    (i <= 4 && this.currentPage < 4) || 
                    (i >= this.pages - 3 && this.currentPage > this.pages - 3) 
                ) {
                    let index = this.range.length;
                    if (index > 0 && this.range[index - 1] < i - 1) {
                        this.range.push("...");
                    }
                    this.range.push(i);
                }
            }
        },

        getPage(page) {
            this.$emit("page-changed", page);
        },

        getPreviousPage() {
            this.getPage(this.currentPage - 1);
        },
        
        getNextPage() {
            this.getPage(this.currentPage + 1);
        },
    },
};
</script>
