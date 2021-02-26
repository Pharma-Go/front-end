import PgAdminSaveCategory from "@/views/settings/admin/category/category.vue";
import PgAdminEstablishments from "@/views/settings/admin/establishments.vue";
import PgAdminCreateEstablishment from "@/views/settings/admin/establishment/create-establishment.vue";
import PgAdminEditEstablishment from "@/views/settings/admin/establishment/edit-establishment.vue";
import PgHourAdminEstablishment from "@/views/settings/admin/establishment/hour-establishment.vue";
import PgAddressEstablishmentSettings from "@/views/settings/admin/establishment/address-establishment.vue";
import PgAdminEstablishmentProducts from "@/views/settings/admin/establishment/products/establishment-products.vue";
import PgAdminProduct from "@/views/settings/admin/establishment/products/establishment-product.vue";
import { ensureLogged } from "..";

export const adminSettings = [
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
    path: "/configuracoes/admin/estabelecimentos/:id/produtos",
    name: "AdminEstablishmentProducts",
    component: PgAdminEstablishmentProducts,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/admin/estabelecimentos/:id/produtos/criar",
    name: "AdminProduct",
    component: PgAdminProduct,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/admin/estabelecimentos/:id/produtos/:product",
    name: "AdminProduct",
    component: PgAdminProduct,
    beforeEnter: ensureLogged
  },
  {
    path:
      "/configuracoes/admin/estabelecimentos/:id/produtos/categoria/:category",
    name: "AdminEstablishmentProducts",
    component: PgAdminEstablishmentProducts,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/admin/categoria/criar",
    name: "AdminSaveCategory",
    component: PgAdminSaveCategory,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/admin/categoria/:id",
    name: "AdminSaveCategory",
    component: PgAdminSaveCategory,
    beforeEnter: ensureLogged
  }
];
