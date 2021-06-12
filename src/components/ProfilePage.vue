<template>
  <div class="jumbotron">
    <div v-if="userDetails">
      <h1>Profile Details</h1>
      <h2>Hello, {{ userDetails.username }}</h2>
      <hr class="mt-4">
      <p>First Name: {{ userDetails.username }}</p>
      <p>Phone Number: {{ userDetails.phone }}</p>
      <p>Email Address: {{ userDetails.email }}</p>
      <p class="lead">
        <button class="btn btn-primary btn-sm" @click="clearData">Log out</button>
      </p>
    </div>
    <div v-else>
      You are not logged in. Please<router-link class="btn btn-link" to='/login'>click here</router-link>to login!
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfilePage",
  data() {
    return {
      userDetails: null
    }
  },
  async created() {
    await axios.get('https://devgroceryapi.spericorn.com/api/user', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }).then( res => {
      this.userDetails = res.data.data.userData;
    }).catch(err => {
      console.log("Unable to fetch user details: ", err);
    });
  },
  methods: {
    clearData() {
      localStorage.removeItem('token');
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>

</style>