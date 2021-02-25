<template>
  <pg-settings
    title="Horários"
    :canBack="true"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}`"
  >
    <form @submit.prevent="onSubmit">
      <div class="c-establishment__field">
        <pg-input
          label="Horário de abertura"
          prependIcon="clock"
          v-model="form.opensAt"
        ></pg-input>
      </div>
      <div class="c-establishment__field mt-4">
        <pg-input
          label="Horário de fechamento"
          prependIcon="clock"
          v-model="form.closesAt"
        ></pg-input>
      </div>

      <pg-button class="mt-4 fill-w" v-color="'backgroundButton'" type="submit">
        <span class="text--contrast"> Salvar </span>
      </pg-button>
    </form>
  </pg-settings>
</template>

<script lang="ts">
import { Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({ computed: { ...mapState("establishment", ["active"]) } })
export default class PgHourAdminEstablishment extends Vue {
  public active!: Establishment;

  public form = {
    id: "",
    opensAt: "",
    closesAt: ""
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
    const establishment = await this.$api.establishments.save(this.form);
    const establishments = await this.$api.establishments.get();

    this.$store.dispatch("establishment/set", { active: establishment });
    this.$store.dispatch("establishment/set", { establishments });

    this.$router.go(-1);
  }
}
</script>
