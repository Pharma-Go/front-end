<template>
  <pg-settings title="Endereço" class="c-address">
    <form @submit.prevent="onSubmit">
      <div class="c-address__field">
        <pg-input
          label="CEP"
          prependIcon="clock"
          @input="onSearch"
          v-model="form.zipcode"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Rua"
          prependIcon="clock"
          v-model="form.street"
          :disabled="true"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Número"
          prependIcon="clock"
          v-model="form.streetNumber"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Bairro"
          prependIcon="clock"
          v-model="form.district"
          :disabled="true"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Cidade"
          prependIcon="clock"
          v-model="form.city"
          :disabled="true"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Estado"
          prependIcon="clock"
          v-model="form.state"
          :disabled="true"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Complemento"
          prependIcon="clock"
          v-model="form.complement"
        ></pg-input>
      </div>
      <div class="c-address__field">
        <pg-input
          label="Referência"
          prependIcon="clock"
          v-model="form.reference"
        ></pg-input>
      </div>

      <pg-button class="my-4 fill-w" v-color="'backgroundButton'" type="submit">
        <span class="text--contrast"> Salvar </span>
      </pg-button>
    </form>
  </pg-settings>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgSettingsAddress extends Vue {
  @Prop() public form!: any;

  public isLoading = false;

  public async onSearch(): Promise<void> {
    if (this.form.zipcode.length === 8) {
      this.isLoading = true;

      const informations = await this.$api.address.request({
        public: true,
        baseURL: `https://viacep.com.br/ws/${this.form.zipcode}/json/`
      });

      this.isLoading = false;
      this.form.street = informations.logradouro;
      this.form.district = informations.bairro;
      this.form.city = informations.localidade;
      this.form.state = informations.uf;
    }
  }

  public onSubmit(): void {
    this.$emit("submit");
  }
}
</script>
