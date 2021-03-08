<template>
  <div
    class="c-invoice pa-4"
    v-if="active && active.id && establishment && establishment.id"
  >
    <div class="c-invoice__header mb-4">
      <div
        @click.prevent="$router.back"
        class="c-invoice__header-back bg--secondaryBackground"
      >
        <i
          class="c-invoice__header-back-icon pgi pgi-chevron-left text--primary"
        ></i>
      </div>
      <h1>{{ getEstablishmentName() }}</h1>
      <div class="c-invoice__header-feedback">
        <i
          class="c-invoice__header-feedback-icon pgi pgi-star text--primary"
        ></i>
      </div>
    </div>

    <div class="mb-7" v-if="active.delivererAccepted">
      <transition name="enter-transition">
        <pg-lottie
          v-if="showCheck"
          :options="defaultOptions"
          :height="200"
          :width="200"
          v-on:animCreated="handleAnimation"
        />
      </transition>
      <transition name="enter-transition">
        <div v-if="showMap">
          <div class="c-invoice__map" ref="map" id="map"></div>
          <p class="text--small text--foregroundTertiary mt-1">
            *Localizações aproximadas
          </p>
        </div>
      </transition>
    </div>
    <div class="mb-7 mt-4" v-else>
      <div class="c-invoice__icon text--center d-flex flex-col align-center">
        <i class="text--attention pgi pgi-clock mb-4"></i>
        <p class="text--center mb-0">
          A <strong>{{ getEstablishmentName() }}</strong> está processando seu
          pedido!
        </p>
        <p class="text--center text--bold text--foreground">
          Quando sair para entrega você será notificado ;)
        </p>
      </div>
    </div>

    <div class="c-invoice__details">
      <div class="c-invoice__details-item mb-4">
        <p class="mb-0 text--bold text--foreground text--normal">
          Pedido: #{{ active.id.substring(0, 5) }}
        </p>
        <p class="mb-0 text--foregroundTertiary text--small">
          Pago em: {{ $dayjs(active.paymentDate).format("DD/MM/YYYY") }}
        </p>
      </div>
      <div
        class="c-invoice__details-product"
        v-for="product in active.itemProducts"
        :key="product.product.id"
      >
        <pg-product-card
          :product="product.product"
          :isQuantity="true"
          :price="product.price"
        >
          <template v-slot:quantity>
            <p
              class="c-invoice__details-product-quantity bg--primary text--contrast text--bold"
            >
              {{ product.quantity || 0 }}
            </p>
          </template>
        </pg-product-card>
      </div>
      <div class="c-invoice__details-item mt-4">
        <p class="mb-0 text--foreground text--normal">Subtotal</p>
        <p class="mb-0 text--foregroundTertiary text--normal">
          R$ {{ active.total | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-item mt-1">
        <p class="mb-0 text--foreground text--normal">Taxa de entrega</p>
        <p class="mb-0 text--foregroundTertiary text--normal">
          R$ {{ 500 | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-item mt-1">
        <p class="mb-0 text--foreground text--bold text--medium">Total</p>
        <p class="mb-0 text--foreground text--bold text--medium">
          R$ {{ (active.total + 500) | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-payment my-2 py-2">
        <p class="mb-0 text--foreground text--normal">
          {{ active.paymentCard.method | formatPaymentMethod }}
        </p>
        <p class="mb-0 text--foreground text--normal">
          {{ active.paymentCard | cardDigits }}
        </p>
      </div>
      <div class="c-invoice__details-address">
        <pg-address :address="active.buyer.address"></pg-address>
      </div>
    </div>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-invoice {
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-back,
    &-feedback {
      width: var(--spacing-7);
      height: var(--spacing-7);
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &-icon {
        @include font-size($font-sm);
      }
    }

    &-back {
      padding-right: 3px;
    }
  }

  &__details {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-product {
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--dark-foregroundSecondary);

      .c-product-card__items-product {
        border: none;
      }

      &-quantity {
        margin: 0;
        width: var(--spacing-4);
        height: var(--spacing-4);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-1);
        border-radius: 100%;
      }
    }

    &-payment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--dark-foregroundSecondary);
      border-bottom: 1px solid var(--dark-foregroundSecondary);
    }
  }

  &__icon {
    @include font-size($font-xl * 1.5);
  }

  &__map {
    width: 100%;
    height: calc(var(--spacing-1) * 34);
    border-radius: var(--spacing-4);
    background: var(--theme-foregroundTertiary);

    .mapboxgl-canvas {
      border-radius: var(--spacing-4);
    }
  }
}

.enter-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.marker-icon {
  background-position: center;
  background-size: 18px 18px;
  width: 18px;
  height: 18px;
  left: 6px;
  top: 6px;
  position: absolute;
  text-align: center;
  transform: rotate(45deg);
}

.marker {
  height: 30px;
  width: 30px;
}

.marker-content {
  border-radius: 50% 50% 50% 0;
  height: 30px;
  left: 50%;
  margin: -15px 0 0 -15px;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  width: 30px;
}
.marker-content::before {
  background: #ffffff;
  border-radius: 50%;
  content: "";
  height: 24px;
  margin: 3px 0 0 3px;
  position: absolute;
  width: 24px;
}
</style>

<script lang="ts">
import { Establishment, Invoice } from "@/lib/models";
import establishment from "@/store/establishment";

import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import * as animationData from "../../assets/check-circle.json";

@Component({
  computed: {
    ...mapState("invoice", ["active"])
  }
})
export default class PgInvoicePage extends Vue {
  public active!: Invoice;
  public establishment: Establishment = {} as Establishment;

  public showCheck = false;
  public showMap = false;
  public mountedMap = false;
  public anim!: any;
  public defaultOptions = {
    animationData: animationData,
    autoplay: true
  };
  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public map!: any;
  public delivererMarker!: any;

  public async created(): Promise<void> {
    const active = await this.$api.invoices.getOne(this.$route.params.id);
    await this.$store.dispatch("invoice/set", { active });

    if (this.active.delivererAccepted && !this.active.delivered) {
      this.showMap = true;
    }

    const product = await this.$api.products.getOne(
      this.active.itemProducts[0].product.id
    );

    const establishment = await this.$api.establishments.getOne(
      product.establishment.id
    );

    this.establishment = establishment;

    this.sockets.subscribe("delivererAccept", async invoiceId => {
      if (this.active.id === invoiceId) {
        const active: Invoice = await this.$api.invoices.getOne(invoiceId);
        await this.$store.dispatch("invoice/set", { active });

        this.snackbar = {
          color: "success",
          icon: "pgi-added",
          text: "O seu pedido está a caminho ;)",
          visible: true
        };

        setTimeout(() => {
          this.showCheck = true;

          setTimeout(() => {
            this.showCheck = false;

            setTimeout(() => {
              this.showMap = true;
            }, 600);
          }, 2500);
        }, 300);
      }
    });

    // @ts-ignore
    const tt = window.tt;

    this.sockets.subscribe("gpsToClient", async payload => {
      if (this.active.id === payload.invoiceId) {
        if (this.delivererMarker) {
          this.delivererMarker.remove();
        }

        const lngLat = payload.lngLat;

        this.createMarker(tt, "https://i.imgur.com/oLvZpYi.png", lngLat);
      }
    });
  }

  public updated(): void {
    console.log(this.showMap, !this.mountedMap);
    if (this.showMap && !this.mountedMap) {
      this.mountMap();
      this.mountedMap = true;
    }
  }

  public rad(x: any) {
    return (x * Math.PI) / 180;
  }

  public getDistance(lat1, lng1, lat2, lng2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(lat2 - lat1);
    const dLong = this.rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1)) *
        Math.cos(this.rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  public toRad(value: number) {
    return (value * Math.PI) / 180;
  }

  public toDeg(value: number) {
    return value * (180 / Math.PI);
  }

  //-- Define middle point function
  public middlePoint(lat1, lng1, lat2, lng2) {
    //-- Longitude difference
    const dLng = this.toRad(lng2 - lng1);

    //-- Convert to radians
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);
    lng1 = this.toRad(lng1);

    const bX = Math.cos(lat2) * Math.cos(dLng);
    const bY = Math.cos(lat2) * Math.sin(dLng);
    const lat3 = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
    );
    const lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    return [this.toDeg(lng3), this.toDeg(lat3)];
  }

  public mountMap(): void {
    //@ts-ignore
    const tt = window.tt;

    const userPoint = [
      this.active.buyer.address.lat,
      this.active.buyer.address.lon
    ];
    const establishmentPoint = [
      this.establishment.address.lat,
      this.establishment.address.lon
    ];

    const center = this.middlePoint(
      userPoint[0],
      userPoint[1],
      establishmentPoint[0],
      establishmentPoint[1]
    );

    this.map = tt.map({
      key: "TW8iyFv1j35PCm5918lTZVGvvaRUQLYe",
      container: "map",
      center: new tt.LngLat(center[0], center[1]),
      zoom: 13.1
    });

    this.createMarker(tt, "https://i.imgur.com/vxr38PP.png", [
      userPoint[1],
      userPoint[0]
    ]);

    this.createMarker(tt, "https://i.imgur.com/ViFST5f.png", [
      establishmentPoint[1],
      establishmentPoint[0]
    ]);
  }

  public beforeDestroyed(): void {
    this.sockets.unsubscribe("delivererAccept");
    this.sockets.unsubscribe("gpsToClient");
  }

  private createMarker(tt: any, icon: string, lngLat: number[]): void {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    const markerContentElement = document.createElement("div");
    markerContentElement.className = "marker-content";
    markerContentElement.style.backgroundColor = "#4736B9";
    markerElement.appendChild(markerContentElement);

    const iconElement = document.createElement("div");
    iconElement.className = "marker-icon";
    iconElement.style.backgroundImage = "url(" + icon + ")";
    markerContentElement.appendChild(iconElement);
    new tt.Marker({ element: markerElement, anchor: "bottom" })
      .setLngLat(lngLat)
      .addTo(this.map);
  }

  public handleAnimation(anim: any): void {
    this.anim = anim;
  }

  public getEstablishmentName(): string {
    return this.establishment.name;
  }
}
</script>
