const core = {
  white: {
    base: "#FCFCFC",
    light: "#FFFF",
  },

  black: {
    base: "#121826",
  },

  // FIXME: add differents color shades.
  // grey: {
  //   base: "#6C737F",
  //   lightest: "#F9FAFB",
  //   light: "#F3F4F6",
  // },

  success: {
    base: "#22C55E",
    light: "#DCFCE7",
    lightest: "#F0FDF4",
  },

  info: {
    base: "#0EA5E9",
    light: "#E0F2FE",
    lightest: "#F0F9FF",
  },

  error: {
    base: "#EF4444",
    light: "#FEE2E2",
    lightest: "#FEF2F2",
  },

  warning: {
    base: "#F59E0B",
    light: "#FEF3C7",
    lightest: "#FFFBEB",
  },
};

const brand = {
  primary: {
    base: "#7B61FF",
    light: "#F5F4FC",
  },
};

export const colors = {
  core,
  brand,

  icon: {
    grey: "#6C737F",
    black: core.black.base,
    success: core.success.base,
    info: core.info.base,
    warning: core.warning.base,
    primary: brand.primary.base,
  },

  /**
   * @deprecated
   */
  v1: {
    // FIXME
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D2D5DA",
      400: "#9DA3AE",
      500: "#6C737F",
      600: "#4D5662",
      700: "#394250",
      800: "#212936",
      900: "#121826",
    },
  },
};
