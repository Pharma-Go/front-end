<template>
  <div
    class="c-invoice pa-4 bg--background"
    v-if="hasInvoice && establishment && establishment.id"
  >
    <div class="c-invoice__header mb-4">
      <div
        @click.prevent="$router.back"
        class="c-invoice__header-back bg--secondaryBackground"
      >
        <i
          class="c-invoice__header-back-icon pgi pgi-chevron-left text--neutralDarkest"
        ></i>
      </div>
      <h1 class="text--md text--neutralDarkest">
        {{ getEstablishmentName() }}
      </h1>
      <div class="c-invoice__header-feedback">
        <i
          class="c-invoice__header-feedback-icon pgi pgi-star text--feedbackWarningMedium"
        ></i>
      </div>
    </div>

    <div v-if="active.delivered" class="mb-7">
      <transition name="enter-transition">
        <div v-if="showDelivered">
          <pg-lottie
            :options="checkOption"
            :height="150"
            :width="150"
            v-on:animCreated="handleAnimation"
          />
          <div
            class="c-invoice__icon text--center d-flex flex-col align-center"
          >
            <p
              class="text--center mb-0 mt-2 text--neutralDarkest text--bold text--xs"
            >
              Seu pedido foi entregue ;)
            </p>
          </div>
        </div>
      </transition>
    </div>

    <div v-else>
      <transition name="enter-transition">
        <div v-if="!active.strictAccepted" class="mb-7">
          <div
            class="c-invoice__icon text--center d-flex flex-col align-center"
          >
            <i class="text--feedbackWarningMedium pgi pgi-clock mb-4"></i>
            <p class="text--center text--neutralDarkest text--xs mb-0">
              A <strong>{{ getEstablishmentName() }}</strong> está verificando
              sua(s) receita(s)!
            </p>
            <p class="text--center text--bold text--neutralDarkest text--xs">
              Quando for aceito você será notificado ;)
            </p>
          </div>
        </div>
      </transition>

      <transition name="enter-transition">
        <div v-if="active.strictAccepted">
          <div class="mb-7" v-if="active.delivererAccepted && !showCancel">
            <transition name="enter-transition">
              <pg-lottie
                v-if="showCheck"
                :options="checkOption"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
            </transition>
            <transition name="enter-transition">
              <div v-if="showMap">
                <div class="c-invoice__map" ref="map" id="map"></div>
                <p class="text--xxxs text--neutralDarkestTertiary mt-1">
                  *Localizações aproximadas
                </p>
              </div>
            </transition>
          </div>
          <div class="mb-3 mt-4">
            <div v-if="!showCancel">
              <div v-if="!showMap && !showCheck">
                <div
                  class="c-invoice__icon text--center d-flex flex-col align-center"
                >
                  <i class="text--feedbackWarningMedium pgi pgi-clock mb-4"></i>
                  <p class="text--center mb-0 text--neutralDarkest text--xs">
                    A <strong>{{ getEstablishmentName() }}</strong> está
                    processando seu pedido!
                  </p>
                  <p
                    class="text--center text--bold text--neutralDarkest text--xs"
                  >
                    Quando sair para entrega você será notificado ;)
                  </p>
                </div>
              </div>
            </div>

            <div v-else>
              <pg-lottie
                :options="cancelOption"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
            </div>
          </div>

          <div
            class="c-invoice__actions d-flex justify-center mb-7"
            v-if="!showCancel && !active.delivered"
          >
            <div v-if="!isLoading" class="d-flex align-center justify-between">
              <pg-button class="fill-w" @click.prevent="onCancel">
                <span class="text--neutralDarkest"> Cancelar </span>
              </pg-button>

              <pg-button
                @click.prevent="onDelivered"
                class="fill-w ml-2"
                v-color="'primary500'"
              >
                <span class="text--textButtonMedium"> Entregue </span>
              </pg-button>
            </div>
            <pg-loading class="c-invoice__actions-loading" v-else></pg-loading>
          </div>
        </div>
      </transition>
    </div>

    <div class="c-invoice__details">
      <div class="c-invoice__details-item mb-4">
        <p class="mb-0 text--bold text--neutralDarkest text--xxs">
          Pedido: #{{ active.id.substring(0, 5) }}
        </p>
        <p
          class="mb-0 text--neutralDarkestTertiary text--xxxs"
          v-if="!showCancel && active.paymentStatus === 'paid'"
        >
          Pago em: {{ $dayjs(active.paymentDate).format("DD/MM/YYYY") }}
        </p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxxs" v-else>
          Cancelado em: {{ $dayjs(active.refunded).format("DD/MM/YYYY") }}
        </p>
      </div>
      <div
        class="c-invoice__details-product"
        v-for="product in active.itemProducts"
        :key="product.product.id"
      >
        <!-- <pg-product-card :product="product"></pg-product-card>
        <div
          v-if="product.prescriptionUrl"
          class="d-flex align-center justify-center"
        >
          <i class="pgi pgi-add text--primary500 text--xxxs mr-1"></i>
          <a
            :href="product.prescriptionUrl"
            target="_blank"
            class="text--xxxs text--neutralDarkestTertiary"
          >
            Ver receita médica
          </a>
        </div> -->
      </div>
      <div
        :class="[
          'c-invoice__details-item',
          'mt-4',
          { 'line--through': showCancel }
        ]"
      >
        <p class="mb-0 text--neutralDarkest text--xxs">Subtotal</p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxs">
          R$ {{ active.total | formatPrice }}
        </p>
      </div>
      <div
        :class="[
          'c-invoice__details-item',
          'mt-1',
          { 'line--through': showCancel }
        ]"
      >
        <p class="mb-0 text--neutralDarkest text--xxs">Taxa de entrega</p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxs">
          R$ {{ active.deliveryFeeAmount || 0 | formatPrice }}
        </p>
      </div>
      <div
        :class="[
          'c-invoice__details-item',
          'mt-1',
          { 'line--through': showCancel }
        ]"
      >
        <p class="mb-0 text--neutralDarkest text--bold text--xs">Total</p>
        <p class="mb-0 text--neutralDarkest text--bold text--xs">
          R$
          {{ (active.total + (active.deliveryFeeAmount || 0)) | formatPrice }}
        </p>
      </div>
      <div
        class="c-invoice__details-item mt-1"
        v-if="showCancel && active.feeAmount"
      >
        <p class="mb-0 text--neutralDarkest text--bold text--xs">
          Taxa de cancelamento
        </p>
        <p class="mb-0 text--neutralDarkest text--bold text--xs">
          R$ {{ active.feeAmount | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-payment my-2 py-2">
        <p class="mb-0 text--neutralDarkest text--xxs">
          {{ active.paymentCard.method | formatPaymentMethod }}
        </p>
        <p class="mb-0 text--neutralDarkest text--xxs">
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
@import "@/lib/styles/mq.scss";

.c-invoice {
  background: var(--theme-backgroundMedium);
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

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
        font-size: $font-size-sm;
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
      border-bottom: 1px solid var(--dark-neutralDark);

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
      border-top: 1px solid var(--dark-neutralDark);
      border-bottom: 1px solid var(--dark-neutralDark);
    }
  }

  &__icon {
    @include font-size($font-size-xl * 1.5);
  }

  &__map {
    width: 100%;
    height: calc(var(--spacing-1) * 34);
    border-radius: var(--spacing-4);
    background: var(--theme-neutralMedium);

    .mapboxgl-canvas {
      border-radius: var(--spacing-4);
    }
  }

  &__actions {
    &-loading {
      width: var(--spacing-4);
      height: var(--spacing-4);
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

import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import * as animationData from "../../assets/check-circle.json";
import * as cancelAnimationData from "../../assets/cancel.json";

@Component({
  computed: {
    ...mapState("invoice", ["active"])
  }
})
export default class PgInvoicePage extends Vue {
  get hasInvoice() {
    return this.active && this.active.id;
  }

  public active!: Invoice;
  public establishment: Establishment = {} as Establishment;

  public isLoading = false;
  public showCheck = false;
  public showCancel = false;
  public showDelivered = false;
  public showMap = false;
  public mountedMap = false;
  public anim!: any;
  public checkOption = {
    animationData: animationData,
    autoplay: true
  };

  public cancelOption = {
    animationData: cancelAnimationData,
    autoplay: true,
    loop: true
  };

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public map!: any;
  public delivererMarker!: any;

  public async created(): Promise<void> {
    if (
      !this.active ||
      !this.active?.id ||
      this.active?.id !== this.$route.params.id
    ) {
      const active = await this.$api.invoices.getOne(this.$route.params.id);
      await this.$store.dispatch("invoice/set", { active });
    }

    if (this.active && this.active.id) {
      const product = await this.$api.products.getOne(
        this.active.itemProducts[0].product.id
      );

      const establishment = await this.$api.establishments.getOne(
        product.establishment.id
      );

      this.establishment = establishment;

      if (this.active.delivererAccepted && !this.active.delivered) {
        this.showMap = true;
      }

      if (this.active.delivered) {
        await this.delay(500);
        this.showDelivered = true;
      }

      if (this.active.isFee && this.active.feeAmount) {
        this.showCancel = true;
      }
    }

    this.sockets.subscribe("strictAccept", async (invoice: Invoice) => {
      if (this.active.id === invoice.id) {
        const active: Invoice = await this.$api.invoices.getOne(invoice.id);
        await this.$store.dispatch("invoice/set", { active });
      }
    });

    this.sockets.subscribe("delivererAccept", async invoiceId => {
      if (this.active.id === invoiceId) {
        const active: Invoice = await this.$api.invoices.getOne(invoiceId);
        await this.$store.dispatch("invoice/set", { active });

        this.snackbar = {
          color: "feedbackSuccessMedium",
          icon: "pgi-added",
          text: "O seu pedido está a caminho ;)",
          visible: true
        };

        await this.delay(300);
        this.showCheck = true;

        await this.delay(2500);
        this.showCheck = false;

        await this.delay(600);
        this.showMap = true;
      }
    });

    this.sockets.subscribe("refundInvoice", async (invoice: Invoice) => {
      await this.$store.dispatch("invoice/set", { active: invoice });
      this.showCancel = true;
      this.isLoading = false;
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

  @Watch("showMap")
  public onShowMapChange(): void {
    if (this.showMap && !this.showCancel) {
      this.$nextTick(() => {
        this.mountMap();
      });
    }
  }

  public beforeDestroyed(): void {
    this.sockets.unsubscribe("strictAccept");
    this.sockets.unsubscribe("refundInvoice");
    this.sockets.unsubscribe("delivererAccept");
    this.sockets.unsubscribe("gpsToClient");
  }

  public async delay(time: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
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

  private createMarker(tt: any, icon: string, lngLat: number[]): void {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    const markerContentElement = document.createElement("div");
    markerContentElement.className = "marker-content";
    markerContentElement.style.backgroundColor = "#0064FA";
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

  public async onDelivered(): Promise<void> {
    this.isLoading = true;

    const invoice = await this.$api.invoices.deliveredInvoice(this.active.id);
    await this.$store.dispatch("invoice/set", { active: invoice });

    this.isLoading = false;

    await this.delay(500);
    this.showDelivered = true;
  }

  public async onCancel(): Promise<void> {
    this.isLoading = true;

    await this.$api.invoices.refundInvoice(this.active.id);
  }
}
</script>
