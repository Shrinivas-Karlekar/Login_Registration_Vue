<template>
  <div class="card text-center">
    <div class="card-header">
      Welcome on-board
    </div>
    <div class="card-body">
      <h5 class="card-title">Login/Registration App</h5>
      <p class="card-text">Please login to access your profile page</p>
      <router-link class="btn btn-primary" to='/login'>Login</router-link>
      <p class="mt-4">New User?</p>
      <router-link class="btn btn-secondary" to='/register'>Register</router-link>
    </div>
    <div class="card-footer text-muted">
      At your service
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage"
}
</script>

<style scoped>
</style>