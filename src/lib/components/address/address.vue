<template>
  <div class="c-address__header">
      <img
        class="c-address__header-image"
        :src="
          require($pharmago.theme.themes.isDark
            ? '../../../assets/address-dark.svg'
            : '../../../assets/address-light.svg')
        "
      />
      <div class="c-address__header-address">
        <p class="c-address__header-address-street text--small text--foreground">
          {{ address.street }}, {{ address.streetNumber }}, {{ address.district }},
          {{ address.city }} - {{ address.state }}
        </p>
        <p class="c-address__header-address-complement text--small text--foregroundTertiary">
          {{ address.complement }}
          <ul v-if="address.complement && address.reference" class="c-address__header-address-complement-divider bg--foreground"></ul>
          {{ address.reference }}
        </p>
      </div>
    </div>
</template>

<script lang="ts">
import { Address } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgAddress extends Vue {
  @Prop() public address: Address;
}
</script>