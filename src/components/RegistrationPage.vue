<template>
  <div class="container">
    <h2>Registration</h2>
    <br>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="userName">User Name</label>
        <input type="text" class="form-control" id="userName" v-model="username" placeholder="User name">
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input type="text" class="form-control" id="phoneNumber" v-model="phone" placeholder="Phone Number">
      </div>
      <div class="p-3 mb-2 bg-warning text-dark" v-if="emailExist">
        <p>This email id already registered for other user.</p>
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" @change="checkEmail" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" :class='{valid:passwordValidation.valid}' id="password" v-model="password" placeholder="Password">
      </div>
      <div class="text-info" v-if="passwordValidation.errors.length > 0 && !submitted">
        <p v-for='error in passwordValidation.errors' v-bind:key="error">{{error}}</p>
      </div>
      <div class="p-3 mb-2 bg-warning text-dark" v-if="passwordMismatch">
        <p>Passwords don't match.</p>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password">
      </div>
      <div class="text-info" v-if="!allFieldsFilled">
        <p>All fields needs to be filled to register user!</p>
      </div>
      <button type="submit" class="btn btn-primary" v-if="allFieldsFilled && !passwordMismatch && passwordValidation.valid">Submit Registration</button>
    </form>
    <p class="mt-2">
      If already registered, Please<router-link class="btn btn-link" to='/login'>click here</router-link>to login.
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "RegistrationPage",
  data() {
    return {
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitted:false,
      emailExist: false,
      rules: [
        { message:"Password must have at least 8 characters.", regex:/.{8,}/ },
        { message:"Password must contain a Special Symbol.", regex:/[!@#$%^&*)(+=._-]/ }
      ],
    }
  },
  computed: {
    passwordMismatch () {
      if (this.passwordsFilled) {
        return (this.password !== this.confirmPassword)
      } else {
        return false
      }
    },
    allFieldsFilled () {
      return (this.username !== '' && this.phone !== '' && this.email !== '' && this.password !== '' && this.confirmPassword !== '')
    },
    passwordsFilled () {
      return (this.password !== '' && this.confirmPassword !== '')
    },
    passwordValidation () {
      let errors = []
      for (let condition of this.rules) {
        if (!condition.regex.test(this.password)) {
          errors.push(condition.message)
        }
      }
      if (errors.length === 0) {
        return { valid:true, errors }
      } else {
        return { valid:false, errors }
      }
    }
  },
  methods: {
     async checkEmail() {
       const res = await axios.post("https://devgroceryapi.spericorn.com/api/auth/checkMail", {email: this.email});
       this.emailExist = !res.data.success;
     },
    async registerUser() {
      const userDetails = {
        email : this.email,
        password : this.password,
        username: this.username,
        phone: this.phone
      }
      const res = await axios.post("https://devgroceryapi.spericorn.com/api/auth/register", userDetails);
      localStorage.setItem('token', res.data.data.token);
      await this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>