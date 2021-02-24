<template>
  <label @dragover.prevent @drop.prevent="onDrop">
    <slot name="progress" v-if="isSending" v-bind="this">
      <progress :value="progress * 100"></progress>
    </slot>
    <input
      type="file"
      class="d-none"
      @change="setFile($event.target.files[0])"
    />
    <slot name="file" v-if="file || url" v-bind="this">
      <img :src="blobUrl || url" class="fill-w" />

      <div v-if="file">{{ file.name }}</div>
    </slot>
    <slot name="placeholder" v-else>
      Clique ou arraste aqui para subir uma imagem
    </slot>
  </label>
</template>

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
