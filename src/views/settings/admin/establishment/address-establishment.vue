<template>
  <pg-address-settings
    :form="form"
    @submit="onSubmit"
    :hasAddress="hasAddress"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}`"
    class="pt-5"
  ></pg-address-settings>
</template>

<script lang="ts">
import { Address, Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({ computed: { ...mapState("establishment", ["active"]) } })
export default class PgAddressAdminEstablishment extends Vue {
  public active!: Establishment;

  public hasAddress = false;

  public form = {
    zipcode: undefined,
    street: "",
    streetNumber: undefined,
    district: "",
    city: "",
    state: "",
    complement: "",
    reference: ""
  };

  public async created(): Promise<void> {
    if (!this.active.id) {
      const establishment = await this.$api.establishments.getOne(
        this.$route.params.id
      );

      this.$store.dispatch("establishment/set", { active: establishment });
    }

    if (this.active.address) {
      this.hasAddress = true;

      for (const key in this.form) {
        this.form[key] = this.active.address[key];
      }
    }
  }

  public async onSubmit(): Promise<void> {
    const establishmentData = { ...this.active };
    let addressId;
    let establishment;

    delete establishmentData.products;
    delete establishmentData.reviews;

    if (this.hasAddress) {
      const address: Address = await this.$api.address.save({
        ...this.form,
        id: this.active.address.id,
        zipcode: this.form.zipcode.replaceAll("-", "")
      });

      addressId = address.id;
      establishment = await this.$api.establishments.getOne(
        this.active.address.id
      );
    } else {
      const address: Address = await this.$api.address.save({
        ...this.form,
        establishment: this.active.id,
        zipcode: this.form.zipcode.replaceAll("-", "")
      });

      addressId = address.id;
      establishment = await this.$api.establishments.save({
        ...establishmentData,
        address: addressId
      });
    }

    const establishments = await this.$api.establishments.get();

    this.$store.dispatch("establishment/set", { active: establishment });
    this.$store.dispatch("establishment/set", { establishments });

    this.$router.go(-1);
  }
}
</script>
