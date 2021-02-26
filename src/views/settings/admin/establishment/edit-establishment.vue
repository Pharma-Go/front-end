<template>
  <pg-settings
    :title="active.name"
    :canBack="true"
    backUrl="/configuracoes/admin/estabelecimentos"
  >
    <div class="c-edit-establishment__upload">
      <pg-upload
        @uploaded="onUploadedImage"
        ref="image"
        :url="active.imageUrl"
      ></pg-upload>
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
import { PgUpload } from "@/lib/components";
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
  public $refs!: { image: PgUpload };

  public async created(): Promise<void> {
    const establishment = await this.$api.establishments.getOne(
      this.$route.params.id
    );

    this.$store.dispatch("establishment/set", { active: establishment });
  }

  public async onUploadedImage(): Promise<void> {
    let imageUrl: string;

    if (this.$refs.image.file) {
      const media = await this.$refs.image.submit();
      imageUrl = media.url;
    }

    const establishment = await this.$api.establishments.save({
      id: this.active.id,
      imageUrl
    });

    this.$store.dispatch("establishment/set", { active: establishment });
  }
}
</script>
