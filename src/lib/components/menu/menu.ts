import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component
export default class PgMenu extends Vue {
  @Prop([String, Boolean]) public teleport!: string | boolean;
  @Prop({ type: String, default: "span" }) public tag!: string;

  public render(h: CreateElement) {
    return h(this.tag, { ref: "activator" }, [
      h(
        "pg-teleport",
        {
          props: {
            to: this.teleport
          }
        },
        this.$scopedSlots.content(this)
      )
    ]);
  }
}
