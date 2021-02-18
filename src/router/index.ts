import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PgHome from "../views/home.vue";
import PgAuth from "../views/login/auth.vue";
import PgLogin from "../views/login/login.vue";
import PgRegister from "../views/login/register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: PgAuth,
    children: [
      {
        path: "/",
        component: PgLogin
      },
      {
        path: "cadastro",
        component: PgRegister
      }
    ]
  },
  {
    path: "/home",
    name: "Home",
    component: PgHome
  }
];

const router = new VueRouter({
  routes
});

export default router;
