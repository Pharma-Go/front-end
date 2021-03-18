<template>
  <label @dragover.prevent @drop.prevent="onDrop" class="c-upload">
    <slot name="progress" v-if="isSending" v-bind="this">
      <!-- <progress :value="progress * 100"></progress> -->
    </slot>
    <input
      type="file"
      class="d-none"
      @change="setFile($event.target.files[0])"
    />
    <slot name="file" v-if="file || url" v-bind="this">
      <div class="c-upload__image">
        <img :src="blobUrl || url" class="c-upload__image-photo fill-w" />

        <div class="c-upload__image-icon bg--secondaryBackground">
          <i
            class="c-upload__image-icon-content pgi pgi-upload text--primary"
          ></i>
        </div>
      </div>
    </slot>
    <slot name="placeholder" v-else>
      <div class="c-upload__placeholder bg--secondaryBackground">
        <i class="c-upload__placeholder-icon pgi pgi-upload text--primary"></i>
        <p class="c-upload__placeholder-text text--small text--primary">
          Clique ou arraste aqui para subir uma imagem
        </p>
      </div>
    </slot>
  </label>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: var(--spacing-4);
  width: calc(var(--spacing-16) * 2);
  height: calc(var(--spacing-16) * 2);
  margin: 0 auto;
  cursor: pointer;

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--spacing-2);
    padding: var(--spacing-4) var(--spacing-6);

    &-icon {
      transition: all 0.3s ease-in-out;
      @include font-size($font-size-xl);
    }

    &-text {
      transition: all 0.3s ease-in-out;
      margin-top: var(--spacing-2);
      margin-bottom: 0;
      text-align: center;
    }
  }

  &__image {
    height: 100%;

    &-photo {
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease-in-out;
      border-radius: var(--spacing-1);
    }

    &-icon {
      border-radius: 100%;
      transition: all 0.3s ease-in-out;
      width: var(--spacing-7);
      height: var(--spacing-7);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: calc(var(--spacing-5) / 2 * -1);
      right: calc(var(--spacing-7) / 2 * -1);

      &-content {
        @include font-size($font-size-md);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class PgContainer extends Vue {
  @Prop(String) public url!: string;

  @Watch("")
  public file: File = null;

  public isSending = false;
  public progress = 0;
  public blobUrl = "";

  public setFile(file: File): void {
    this.file = file;
    this.blobUrl = URL.createObjectURL(file);

    this.$emit("uploaded", file);
  }

  public onDrop(event: DragEvent): void {
    const file: File = event.dataTransfer.items[0].getAsFile();
    this.setFile(file);
  }

  public async submit(): Promise<any> {
    if (this.file) {
      this.isSending = true;

      return this.$api.medias.upload(this.file, progress => {
        this.progress = progress;
      });
    }
  }
}
</script>
