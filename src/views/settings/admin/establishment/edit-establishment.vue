<template>
  <pg-settings :title="active.name">
    <div class="c-edit-establishment__upload">
      <pg-upload ref="image" :url="active.imageUrl"></pg-upload>
    </div>
    <div class="c-edit-establishment__options mt-4">
      <pg-item-list
        :to="`${active.id}/horarios`"
        title="Horários"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
      <pg-item-list
        :to="`${active.id}/endereco`"
        class="mt-3"
        title="Endereço"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
      <pg-item-list
        :to="`${active.id}/produtos`"
        class="mt-3"
        title="Produtos"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
    </div>
  </pg-settings>
</template>

<style lang="scss">
.c-edit-establishment {
  &__upload {
    margin: 0 auto;
  }
}
</style>

<script lang="ts">
import { Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("establishment", ["active"])
  }
})
export default class PgAdminEditEstablishment extends Vue {
  public active!: Establishment;

  public async created(): Promise<void> {
    const establishment = await this.$api.establishments.getOne(
      this.$route.params.id
    );

    this.$store.dispatch("establishment/set", { active: establishment });
  }
}
</script>
