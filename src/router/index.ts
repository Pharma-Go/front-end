import { oauth } from "@/services";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import PgHome from "../views/home.vue";
import PgEstablishment from "../views/establishment.vue";
import PgAuth from "../views/login/auth.vue";
import PgLogin from "../views/login/login.vue";
import PgRegister from "../views/login/register.vue";

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
    path: "/estabelecimento",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  }
];

const router = new VueRouter({
  routes
});

export default router;
