<template>
  <pg-address-settings
    class="pt-5"
    :form="form"
    @submit="onSubmit"
    :hasAddress="hasAddress"
    backUrl="/configuracoes/"
  ></pg-address-settings>
</template>

<script lang="ts">
import { Address, User } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({ computed: { ...mapState("user", ["user"]) } })
export default class PgProfileAddress extends Vue {
  public user!: User;

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
    if (this.user.address) {
      this.hasAddress = true;

      for (const key in this.form) {
        this.form[key] = this.user.address[key];
      }
    }
  }

  public async onSubmit(): Promise<void> {
    let addressId: string;

    if (this.hasAddress) {
      const address: Address = await this.$api.address.save({
        ...this.form,
        id: this.user.address.id,
        zipcode: this.form.zipcode.replaceAll("-", "")
      });

      addressId = address.id;
    } else {
      const address: Address = await this.$api.address.save({
        ...this.form,
        user: this.user.id,
        zipcode: this.form.zipcode.replaceAll("-", "")
      });

      addressId = address.id;
      await this.$api.users.save({
        id: this.user.id,
        address: addressId
      });
    }

    const user = await this.$api.users.getOne("me");

    await this.$store.dispatch("user/set", { user });
    this.$router.go(-1);
  }
}
</script>
