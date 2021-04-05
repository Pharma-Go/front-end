<template>
  <pg-settings
    title="Horários"
    :canBack="true"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}`"
    class="pt-5"
  >
    <form @submit.prevent="onSubmit">
      <div class="c-establishment__field">
        <pg-input
          label="Horário de abertura"
          prependIcon="clock"
          v-model="form.opensAt"
          v-mask="hourMask"
        ></pg-input>
      </div>
      <div class="c-establishment__field mt-4">
        <pg-input
          label="Horário de fechamento"
          prependIcon="clock"
          v-model="form.closesAt"
          v-mask="hourMask"
        ></pg-input>
      </div>

      <pg-button
        class="mt-4 fill-w"
        v-color="'backgroundSecondaryButton'"
        type="submit"
      >
        <span class="text--buttonContrast"> Salvar </span>
      </pg-button>
    </form>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-settings>
</template>

<script lang="ts">
import { Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({ computed: { ...mapState("establishment", ["active"]) } })
export default class PgHourAdminEstablishment extends Vue {
  public active!: Establishment;
  public hourMask = "##:##";

  public form = {
    id: "",
    opensAt: "",
    closesAt: ""
  };

  public snackbar: any = {
    visible: false
  };

  public async created(): Promise<void> {
    if (!this.active.id) {
      const establishment = await this.$api.establishments.getOne(
        this.$route.params.id
      );

      this.$store.dispatch("establishment/set", { active: establishment });
    }

    this.form.id = this.active.id;
    this.form.opensAt = this.active.opensAt;
    this.form.closesAt = this.active.closesAt;
  }

  public async onSubmit(): Promise<void> {
    if (!this.form.opensAt) {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: "Digite um horário de abertura",
        visible: true
      };
      return;
    }

    if (!this.form.closesAt) {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: "Digite um horário de fechamento",
        visible: true
      };
      return;
    }

    const update = {
      ...this.form,
      opensAt: this.form.opensAt.replaceAll(":", ""),
      closesAt: this.form.closesAt.replaceAll(":", "")
    };

    const establishment = await this.$api.establishments.save(update);
    const establishments = await this.$api.establishments.get();

    this.$store.dispatch("establishment/set", { active: establishment });
    this.$store.dispatch("establishment/set", { establishments });

    this.$router.go(-1);
  }
}
</script>
