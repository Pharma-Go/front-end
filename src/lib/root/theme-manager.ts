import { darkTheme } from "./theme/dark/dark.theme";
import { lightTheme } from "./theme/light/light.theme";

export type Theme = Record<string, string>;

export interface ThemeList {
  dark?: Theme;
  light?: Theme;
  isDark?: boolean;
}

export class ThemeManager {
  public style = document.createElement("style");

  constructor(public themes: ThemeList = {}) {
    document.head.prepend(this.style);

    this.themes = Object.assign({}, { isDark: false }, this.themes ?? {});

    this.themes.dark = Object.assign({}, darkTheme, this.themes.dark ?? {});
    this.themes.light = Object.assign({}, lightTheme, this.themes.light ?? {});
  }

  public register(): void {
    let css = ":root {";
    for (const [theme, colors] of Object.entries(this.themes)) {
      for (const [name, color] of Object.entries(colors)) {
        css += `--${theme}-${name}:${color};`;
      }
    }

    css += "}";

    for (const [theme, colors] of Object.entries(this.themes)) {
      css += `.theme--${theme} {`;

      for (const name of Object.keys(colors)) {
        css += `--theme-${name}:var(--${theme}-${name});`;
      }

      css += "}";
    }

    for (const [theme, colors] of Object.entries(this.themes)) {
      for (const name of Object.keys(colors)) {
        css += `.theme--${theme} .text--${name} {color: var(--${theme}-${name});}`;
        css += `.theme--${theme}.text--${name} {color: var(--${theme}-${name}) !important;}`;

        css += `.theme--${theme} .bg--${name} {background-color: var(--${theme}-${name});}`;
        css += `.theme--${theme}.bg--${name} {background-color: var(--${theme}-${name}) !important;}`;

        css += `.theme--${theme} .var--${name} {--current-color: var(--${theme}-${name});}`;
        css += `.theme--${theme}.var--${name} {--current-color: var(--${theme}-${name}) !important;}`;
      }
    }

    this.style.innerText = css;
  }
}
