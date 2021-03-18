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
      primary50: "#E0ECFE",
      primary100: "#B3D1FE",
      primary200: "#80B2FD",
      primary300: "#4D93FC",
      primary400: "#267BFB",
      primary: "#0064FA",
      primary600: "#005CF9",
      primary700: "#0052F9",
      primary800: "#0048F8",
      primary900: "#0036F6",
      contrast: "#FFFFFF"
    };

    const darkTheme = {
      ...primaryColors,
      primary: "#FFFFFF",
      contrast: "#373737",
      foreground: "#FFFFFF",
      foregroundSecondary: "#EFEFEF",
      foregroundTertiary: "#D9D9D9",
      background: "#101010",
      secondaryBackground: "#292929",
      elevation: "rgba(105, 105, 105, .25)",
      unfocusedField: "#FFFFFF",
      feedbackWarningMedium: "#FFFFFF",
      feedbackErrorMedium: "#BD2420",
      feedbackSuccessMedium: "#15B87A",
      link: "#FFFFFF",
      backgroundBottomBar: "#292929",
      backgroundSettings: "#292929",
      backgroundButton: "#101010",
      backgroundSecondaryButton: "#292929",
      backgroundGradient:
        "linear-gradient(238.21deg, #0064FA 19.22%, rgba(136, 49, 214, 0) 98.87%), #BD59EC;",
      overlay: "rgba(101, 101, 101, .35)",
      loadingBackground: "#FFFFFF38",
      loadingBackgroundActive: "#FFFFFF",
      buttonContrast: "#FFFFFF"
    };

    const lightTheme = {
      ...primaryColors,
      foreground: "#373737",
      foregroundSecondary: "#4E4E4E",
      foregroundTertiary: "#9E9E9E",
      background: "#FBFBFD",
      secondaryBackground: primaryColors.primary50,
      elevation: "rgba(105, 105, 105, .25)",
      unfocusedField: "#7C7C7C",
      feedbackWarningMedium: "#FFC355",
      feedbackErrorMedium: "#BD2420",
      feedbackSuccessMedium: "#15B87A",
      link: primaryColors.primary,
      backgroundBottomBar: primaryColors.primary,
      backgroundSettings: "#FFFFFF",
      backgroundButton: primaryColors.primary,
      backgroundSecondaryButton: primaryColors.primary,
      backgroundGradient:
        "linear-gradient(238.21deg, #4736B9 19.22%, rgba(136, 49, 214, 0) 98.87%), #BB27CC;",
      overlay: "rgba(0, 0, 0, .35)",
      loadingBackground: primaryColors.primary + "38",
      loadingBackgroundActive: primaryColors.primary,
      buttonContrast: "#FFFFFF"
    };

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
