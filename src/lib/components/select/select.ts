import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

@Component
export default class PgSelect extends Vue {
  @Prop(String) public to!: string;

  public render(h: CreateElement) {
    return h("div", {});
  }
}
