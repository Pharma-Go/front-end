import { oauth, users } from "@/services";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import PgHome from "../views/home.vue";
import PgEstablishment from "../views/establishment.vue";
import PgAuth from "../views/login/auth.vue";
import PgLogin from "../views/login/login.vue";
import PgRegister from "../views/login/register.vue";
import store from "../store";

Vue.use(VueRouter);

async function ensureNotLogged(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>
) {
  if (await oauth.isAuthenticated()) {
    return next((to.query.redirect as string) || "/home");
  }

  next();
}

async function ensureLogged(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>
) {
  if (await oauth.isAuthenticated()) {
    const hasUser = store.getters["userStore/getUser"]?.hasOwnProperty("id");

    if (!hasUser) {
      const user = await users.getOne("me");
      store.dispatch("userStore/setUser", user);
    }
    return next();
  }

  next(`/?redirect=${to.fullPath}`);
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: PgAuth,
    children: [
      {
        path: "/",
        component: PgLogin,
        beforeEnter: ensureNotLogged
      },
      {
        path: "cadastro",
        component: PgRegister,
        beforeEnter: ensureNotLogged
      }
    ]
  },
  {
    path: "/home",
    name: "Home",
    component: PgHome,
    beforeEnter: ensureLogged
  },
  {
    path: "/estabelecimento/:id",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  }
];

const router = new VueRouter({
  routes
});

export default router;
