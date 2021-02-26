import PgProfile from "@/views/settings/profile/profile.vue";
import PgProfilePassword from "@/views/settings/profile/profile-password.vue";
import PgProfileAddress from "@/views/settings/profile/profile-address.vue";
import PgProfileCards from "@/views/settings/profile/profile-cards.vue";
import PgProfileCard from "@/views/settings/profile/profile-card.vue";
import { ensureLogged } from "..";

export const profileSettings = [
  {
    path: "/configuracoes/perfil",
    name: "Profile",
    component: PgProfile,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/perfil/senha",
    name: "ProfilePassword",
    component: PgProfilePassword,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/endereco",
    name: "ProfileAddress",
    component: PgProfileAddress,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/cartoes",
    name: "ProfileCards",
    component: PgProfileCards,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/cartoes/criar",
    name: "ProfileCard",
    component: PgProfileCard,
    beforeEnter: ensureLogged
  },
  {
    path: "/configuracoes/cartoes/:card",
    name: "ProfileCard",
    component: PgProfileCard,
    beforeEnter: ensureLogged
  }
];
