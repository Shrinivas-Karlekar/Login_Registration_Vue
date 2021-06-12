import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import ProfilePage from "./components/ProfilePage";
import LandingPage from "./components/LandingPage";

Vue.use(VueRouter);

const routes= [
  {
    path: "/",
    component: LandingPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/register",
    component: RegistrationPage
  },
  {
    path: "/profile",
    component: ProfilePage
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
