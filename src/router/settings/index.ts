import PgSettings from "@/views/settings/settings.vue";
import { ensureLogged } from "..";
import { adminSettings } from "./admin";
import { profileSettings } from "./profile";

export const settingsRoutes = [
  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: PgSettings,
    beforeEnter: ensureLogged,
    meta: {
      bottomBar: true
    }
  },
  ...profileSettings,
  ...adminSettings
];
