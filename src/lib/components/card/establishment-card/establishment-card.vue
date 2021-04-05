<template>
  <div
    @click.prevent="onClickCard"
    :class="[themeClass, 'c-establishment-card']"
    v-if="establishment"
  >
    <div class="c-establishment-card__container">
      <img
        v-if="establishment.imageUrl"
        class="c-establishment-card__image"
        alt="Imagem do estabelecimento"
        :src="establishment.imageUrl"
      />

      <div class="c-establishment-card__content">
        <div class="c-establishment-card__content-header">
          <h3 class="c-establishment-card__content-title">
            {{ establishment.name }}
          </h3>
          <p
            class="c-establishment-card__content-address"
            v-if="
              establishment.address &&
              establishment.address.street &&
              establishment.address.streetNumber &&
              establishment.address.district
            "
          >
            {{
              `${establishment.address.street} ${establishment.address.streetNumber}, ${establishment.address.district}`
            }}
          </p>
        </div>

        <p class="c-establishment-card__content-hour text--small">
          <i
            class="c-establishment-card__content-hour-icon pgi pgi-clock mr-1"
          ></i>
          {{
            `${formatHour(establishment.opensAt)} - ${formatHour(
              establishment.closesAt
            )}`
          }}
        </p>
      </div>
    </div>

    <div class="c-establishment-card__go">
      <i class="c-establishment-card__go-icon pgi pgi-chevron-left"></i>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/depth.scss";
@import "@/lib/styles/typography.scss";
@import "@/lib/styles/mq.scss";

.c-establishment-card {
  box-shadow: var(--theme-shadowLevel1);

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  cursor: pointer;
  background: var(--theme-backgroundMedium);

  &__image {
    width: var(--spacing-10);
    height: var(--spacing-10);
    margin-right: var(--spacing-4);
    object-fit: cover;
    border-radius: var(--spacing-1);

    @include mq($from: tablet-landscape) {
      width: var(--spacing-12);
      height: var(--spacing-12);
    }
  }

  &__container {
    display: flex;
    align-items: center;
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
      color: var(--theme-neutralDarkest);
    }

    &-title {
      font-size: $font-size-xs;

      @include mq($from: tablet-landscape) {
        font-size: $font-size-sm;
      }
    }

    &-address {
      font-size: $font-size-xxxs;
      color: var(--theme-neutralMedium);

      @include mq($from: tablet-landscape) {
        font-size: $font-size-xxs;
      }
    }

    &-hour {
      margin-top: var(--spacing-1);
      display: flex;
      align-items: center;
      color: var(--theme-linkMedium);
    }
  }

  &__go {
    flex: 0 0 var(--spacing-5);
    height: var(--spacing-5);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @include mq($from: tablet-landscape) {
      flex: 0 0 var(--spacing-7);
      height: var(--spacing-7);
    }

    &-icon {
      font-size: $font-size-xs;
      transform: rotate(180deg);
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Establishment } from "../../../models";

@Component
export default class PgEstablishmentCard extends Mixins(Themeable) {
  @Prop() public establishment!: Establishment;

  public formatHour(time: string) {
    const hour = time?.substring(0, 2);
    const minute = time?.substring(2, 4);

    return `${hour}:${minute}`;
  }

  public onClickCard(): void {
    this.$emit("clickCard", this.establishment);
  }
}
</script>
