import { oauth, users } from "@/services";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import PgHome from "../views/home.vue";
import PgSearch from "../views/search/search.vue";
import PgEstablishment from "../views/establishment.vue";
import PgAuth from "../views/login/auth.vue";
import PgLogin from "../views/login/login.vue";
import PgRegister from "../views/login/register.vue";
import PgSettings from "../views/settings/settings.vue";
import PgAdminEstablishments from "../views/settings/admin/establishments.vue";
import PgAdminCreateEstablishment from "../views/settings/admin/establishment/create-establishment.vue";
import PgAdminEditEstablishment from "../views/settings/admin/establishment/edit-establishment.vue";
import PgHourAdminEstablishment from "../views/settings/admin/establishment/hour-establishment.vue";
import PgAddressEstablishmentSettings from "../views/settings/admin/establishment/address-establishment.vue";
import store from "@/store";

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
    path: "/buscar",
    name: "Search",
    component: PgSearch,
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  {
    path: "/configuracoes",
    name: "Settings",
    component: PgSettings,
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  {
    path: "/configuracoes/admin/estabelecimentos",
    name: "Admin Establishments",
    component: PgAdminEstablishments,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/admin/estabelecimentos/criar",
    name: "AdminCreateEstablishment",
    component: PgAdminCreateEstablishment,
    beforeEnter: ensureLogged,
    meta: {
      isEditing: false
    }
  },
  {
    path: "/configuracoes/admin/estabelecimentos/:id",
    name: "AdminCreateEstablishment",
    component: PgAdminEditEstablishment,
    beforeEnter: ensureLogged,
    meta: {
      isEditing: false
    }
  },
  {
    path: "/configuracoes/admin/estabelecimentos/:id/horarios",
    name: "HourAdminEstablishment",
    component: PgHourAdminEstablishment,
    beforeEnter: ensureLogged,
    meta: {
      isEditing: false
    }
  },
  {
    path: "/configuracoes/admin/estabelecimentos/:id/endereco",
    name: "AddressEstablishmentSettings",
    component: PgAddressEstablishmentSettings,
    beforeEnter: ensureLogged,
    meta: {
      isEditing: false
    }
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
