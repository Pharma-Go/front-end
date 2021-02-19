<template>
  <div :class="[themeClass, 'c-establishment-card']">
    <img
      class="c-establishment-card__image"
      alt="Imagem do estabelecimento"
      src="../../../../assets/logo.png"
    />

    <div class="c-establishment-card__content">
      <div class="c-establishment-card__content-header">
        <h2 class="c-establishment-card__content-title">Drogasil</h2>
        <p
          class="c-establishment-card__content-address text--small text--foregroundTertiary"
        >
          Avenida Rudge, 315
        </p>
      </div>

      <p class="c-establishment-card__content-hour text--primary text--small">
        <i class="c-establishment-card__content-hour-icon pgi pgi-add mr-1"></i>
        06:00 - 23:00
      </p>
    </div>

    <router-link to="" class="c-establishment-card__go bg--secondaryBackground">
      <i
        class="c-establishment-card__go-icon pgi pgi-chevron-left text--primary"
      ></i>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "../../../styles/depth.scss";

.c-establishment-card {
  @include z-depth($level: 2, $omni: true);

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);

  &__image {
    width: var(--spacing-10);
    height: var(--spacing-10);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-header {
      display: flex;
      flex-direction: column;
    }

    &-title,
    &-address,
    &-hour {
      margin: 0;
    }

    &-hour {
      margin-top: var(--spacing-1);
      display: flex;
      align-items: center;
    }
  }

  &__go {
    width: var(--spacing-5);
    height: var(--spacing-5);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &-icon {
      transform: rotate(180deg);
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins } from "vue-property-decorator";

@Component
export default class PgEstablishmentCard extends Mixins(Themeable) {}
</script>
