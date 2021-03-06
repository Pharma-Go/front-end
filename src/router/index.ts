import { oauth, users } from "@/services";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import PgHome from "../views/home.vue";
import PgSearch from "../views/search/search.vue";
import PgFavorites from "../views/favorites/favorites.vue";
import PgEstablishment from "../views/establishment.vue";
import PgAuth from "../views/login/auth.vue";
import PgLogin from "../views/login/login.vue";
import PgRegister from "../views/login/register.vue";
import PgRecoverPassword from "../views/recover-password/recover-password.vue";
import PgInvoicePage from "../views/invoice/invoice.vue";
import PgInvoices from "../views/invoice/invoices.vue";
import { settingsRoutes } from "./settings";
import store from "@/store";

Vue.use(VueRouter);

export async function ensureNotLogged(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>
) {
  if (await oauth.isAuthenticated()) {
    return next((to.query.redirect as string) || "/home");
  }

  next();
}

export async function ensureLogged(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>
) {
  if (await oauth.isAuthenticated()) {
    const hasUser = (store.state as any).user.user?.hasOwnProperty("id");

    if (!hasUser) {
      const user = await users.getOne("me");

      store.dispatch("user/set", { user });
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
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    component: PgInvoices,
    beforeEnter: ensureLogged
  },
  {
    path: "/recuperar-senha",
    name: "RecoverPassword",
    component: PgRecoverPassword
  },
  {
    path: "/buscar",
    name: "Buscar",
    component: PgSearch,
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  {
    path: "/favoritos",
    name: "Favoritos",
    component: PgFavorites,
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  {
    path: "/estabelecimento/:id",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  },
  {
    path: "/estabelecimento/:id",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  },
  {
    path: "/estabelecimento/:id",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  },
  {
    path: "/estabelecimento/:id/categoria/:category",
    name: "Estabelecimento",
    component: PgEstablishment,
    beforeEnter: ensureLogged
  },
  {
    path: "/pedidos/:id",
    name: "Invoice",
    component: PgInvoicePage,
    beforeEnter: ensureLogged
  },
  ...settingsRoutes
];

const router = new VueRouter({
  routes
});

export default router;
