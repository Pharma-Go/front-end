<template>
  <router-link
    :to="route"
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
          <h2 class="c-establishment-card__content-title text--foreground">
            {{ establishment.name }}
          </h2>
          <p
            class="c-establishment-card__content-address text--small text--foregroundTertiary"
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

        <p class="c-establishment-card__content-hour text--primary text--small">
          <i
            class="c-establishment-card__content-hour-icon pgi pgi-clock mr-1"
          ></i>
          {{
            formatHour(establishment.opensAt) +
              " - " +
              formatHour(establishment.closesAt)
          }}
        </p>
      </div>
    </div>

    <div class="c-establishment-card__go bg--secondaryBackground">
      <i
        class="c-establishment-card__go-icon pgi pgi-chevron-left text--primary"
      ></i>
    </div>
  </router-link>
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
    margin-right: var(--spacing-4);
    object-fit: cover;
    border-radius: var(--spacing-1);
  }

  &__container {
    display: flex;
    align-items: center;
    flex: 9;
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
    height: var(--spacing-5);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    &-icon {
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
  @Prop(String) public route!: string;

  public formatHour(time: string) {
    const hour = time.substring(0, 2);
    const minute = time.substring(2, 4);

    return `${hour}:${minute}`;
  }
}
</script>
