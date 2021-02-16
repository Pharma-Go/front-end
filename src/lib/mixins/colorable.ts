import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Colorable extends Vue {
  @Prop(String) public color!: string;
}