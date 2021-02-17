import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";
import PgLogin from "../views/login/login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: PgLogin
  }
];

const router = new VueRouter({
  routes
});

export default router;
