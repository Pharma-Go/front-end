import Colorable from "../../mixins/colorable";
import { Component, Mixins, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component
export default class PgIcon extends Mixins(Colorable) {
  @Prop({
    type: String,
    default: "i"
  })
  public tag!: string;

  @Prop(Boolean) public left!: boolean;
  @Prop(Boolean) public right!: boolean;

  public render(h: CreateElement) {
    const name = this.$slots.default && this.$slots.default[0].text;

    return h(this.tag, {
      staticClass: "pg-icon",
      on: this.$listeners,
      directives: [{ name: "color", value: this.color }],
      class: [
        this.$pharmago.icons.prefix,
        `${this.$pharmago.icons.prefix}-${name}`,
        {
          "pg-icon--no-color": !this.color,
          "pg-icon--left": this.left,
          "pg-icon--right": this.right
        }
      ]
    });
  }
}
