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

    const primaryColors = {
      primary50: "#E9E7F7",
      primary100: "#C8C3EA",
      primary200: "#A39BDC",
      primary300: "#7E72CE",
      primary400: "#6354C4",
      primary: "#4736B9",
      primary600: "#4030B2",
      primary700: "#3729AA",
      primary800: "#2F22A2",
      primary900: "#201693",
      contrast: "#FFFFFF",
    };

    const darkTheme = {
      ...primaryColors,
      foreground: "#FFFFFF",
      foregroundSecondary: "#EFEFEF",
      foregroundTertiary: "#D9D9D9",
      background: "#0d0d0d",
      elevation: "rgba(105, 105, 105, .25)",
      unfocusedField: "#FFFFFF",
    };

    const lightTheme = {
      ...primaryColors,
      foreground: "#373737",
      foregroundSecondary: "#4E4E4E",
      foregroundTertiary: "#9E9E9E",
      background: "#ffffff",
      elevation: "rgba(105, 105, 105, .25)",
      unfocusedField: "#7C7C7C",
      error: "#BD2420",
    };

    this.themes = Object.assign(
      {},
      { isDark: window.matchMedia("(prefers-color-scheme: dark)").matches },
      this.themes ?? {}
    );

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