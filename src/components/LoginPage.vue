<template>
  <div class="container">
    <h2>Login</h2>
    <br>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <br>
    <div>
      If not registered already? Please register first...
      <p class="mt-4">
        <router-link class="btn btn-secondary" to='/register'>Click Here To Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const userData = {
        email: this.email,
        password: this.password
      };
      await axios.post('https://devgroceryapi.spericorn.com/api/auth/login', userData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).then(res => {
        localStorage.setItem('token', res.data.data.token);
      }).catch(err => {
        console.log("Error: ",err);
      });
      await this.$router.push('/profile');
    }
  }
}
</script>

<style scoped>

</style>