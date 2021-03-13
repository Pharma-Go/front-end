<template>
  <pg-settings title="Configurações">
    <div class="c-settings__content-header">
      <pg-upload
        @uploaded="onUploadedImage"
        ref="image"
        :url="user.imageUrl"
      ></pg-upload>
    </div>

    <div class="c-settings__content-personal">
      <h1 class="c-settings__content-personal-title text--foreground">
        Pessoal
      </h1>

      <div @click.prevent="changeTheme">
        <pg-item-list
          tag="div"
          title="Aparência"
          :icon="$pharmago.theme.themes.isDark ? 'sun' : 'moon'"
        ></pg-item-list>
      </div>

      <pg-item-list
        to="/configuracoes/perfil"
        title="Perfil"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>

      <pg-item-list
        to="/configuracoes/endereco"
        title="Endereço"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>

      <pg-item-list
        to="/configuracoes/cartoes"
        title="Formas de pagamento"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
    </div>

    <div class="c-settings__content-admin" v-if="user.role === 'admin'">
      <h1 class="c-settings__content-admin-title">Administrativo</h1>

      <pg-item-list
        to="/configuracoes/admin/estabelecimentos"
        title="Estabelecimentos"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>

      <pg-item-list
        to="/configuracoes/admin/pedidos"
        title="Pedidos"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>

      <pg-item-list
        to="/configuracoes/admin/receitas"
        title="Receitas"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
    </div>
  </pg-settings>
</template>

<style lang="scss">
@import "../../lib/styles/typography.scss";

.c-settings {
  &__content {
    &-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      &-image {
        width: var(--spacing-9);
        height: var(--spacing-9);
        border-radius: 100%;
        background-color: white;
        margin-bottom: var(--spacing-2);
      }

      &-label {
        display: flex;
        align-items: center;

        &-text {
          margin-bottom: 0;
          margin-right: var(--spacing-2);
        }
      }
    }

    &-personal,
    &-admin {
      margin-top: var(--spacing-4);
      margin-bottom: var(--spacing-6);

      &-title {
        margin-bottom: var(--spacing-3);
      }

      &-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-3);
        align-items: center;
        cursor: pointer;

        &-text {
          margin: 0;
        }

        &-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { PgUpload } from "@/lib/components";
import { User } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("user", ["user"])
  }
})
export default class PgAdminSettings extends Vue {
  public user!: User;
  public $refs!: { image: PgUpload };

  public async changeTheme(): Promise<void> {
    const user = await this.$api.users.save({
      id: this.user.id,
      isDark: !this.$pharmago.theme.themes.isDark
    });

    this.$store.dispatch("user/set", { user });
    this.$pharmago.theme.themes.isDark = !this.$pharmago.theme.themes.isDark;
  }

  public async onUploadedImage(): Promise<void> {
    let imageUrl: string;

    if (this.$refs.image.file) {
      const media = await this.$refs.image.submit();
      imageUrl = media.url;
    }

    const user = await this.$api.users.save({
      id: this.user.id,
      imageUrl
    });

    this.$store.dispatch("user/set", { user });
  }
}
</script>
