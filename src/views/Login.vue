<template>
  <loading v-if="isLoading"/>
    <div class="body bg-gray-100 flex items-center justify-center min-h-screen">
        <div id="wrapper" class="shadow-md rounded-xl px-8 py-6 w-1/3">
        <h2 class="text-2xl font-bold mb-6 text-white">ចូលប្រើប្រាស់</h2>
        <form method="post" @submit="login">
          <div class="mb-4">
            <label class="block text-black text-md font-bold mb-2" for="username">ឈ្មោះអ្នកប្រើប្រាស់</label>
            <input v-model="username" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="បញ្ចូលឈ្មោះបស់អ្នក">
          </div>
          <div class="mb-6">
            <label class="block text-black text-md font-bold mb-2" for="password">ពាក្យសម្ងាត់</label>
            <input v-model="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" @click="">ចូល</button>
          </div>
        </form>
      </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import loading from '../components/loading.vue';

    export default {
      components: {
        loading
      },
        data() {
          return {
            username: '',
            password: '',
            apiUrl: import.meta.env.VITE_API_URL,
            isLoading: false
          };
        },
        name: "Login",
        mounted() {
        },
        methods: {
          login (event) {
            this.isLoading = true
            event.preventDefault(); 

            let data = {
              username: this.username,
              password: this.password
            }
            
            axios.post(this.apiUrl+"/auth/login", data)
              .then(response => {
                let res = response.data;
                
                if(res.user.role === 'អ្នកគ្រប់គ្រងទិន្នន័យ') {
                  localStorage.setItem('tokenAdmin', res.access_token)
  
                  this.username = '';
                  this.password = '';
                  
                  this.$router.push("/dashboard")
                }
                else if (res.user.role === 'អ្នកទទួលការកម្មង់') {
                  localStorage.setItem('tokenReceiver', res.access_token)
  
                  this.username = '';
                  this.password = '';
                  
                  this.$router.push("/order-receiver")
                }
                this.isLoading = false
              })
              .catch(error => {
                alert(error.response.data.message);
                this.isLoading = false
              });
          }
        }
    }
</script>
<style scoped>
    .body{
      background-image: url("https://images.squarespace-cdn.com/content/v1/59f6af428c56a8c070e33354/1563397786708-IFSQCT4AHKZS4XZTP5VP/cafe.png?format=2500w");
      background-repeat: no-repeat;
      background-size: cover;
    }
    #wrapper{
      backdrop-filter: blur(20px);
    }
</style>