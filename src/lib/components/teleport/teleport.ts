import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

export interface TeleportElement extends HTMLElement {
  _originalParent?: TeleportElement | null;
}

@Component
export default class PgTeleport extends Vue {
  @Prop({ type: [String, Boolean], default: ".pg-app" }) public to!:
    | string
    | boolean;

  public $refs!: { content: TeleportElement };
  public teleported = false;

  public mounted() {
    if (typeof this.to === "boolean" && !this.to) {
      return;
    }

    const target = document.querySelector(this.to as string);

    if (!target) {
      throw new Error("Não foi possível teleportar para " + this.to);
    }

    const el = this.$refs.content;
    el._originalParent = el.parentElement;

    target.appendChild(el);
  }

  public beforeDestroy() {
    this.$refs.content.remove();
  }

  public render(h: CreateElement) {
    return h(
      "div",
      {
        style: {
          display: "contents"
        }
      },
      [
        h(
          "div",
          { ref: "content", on: this.$listeners, attrs: this.$attrs },
          this.$slots.default
        )
      ]
    );
  }
}
