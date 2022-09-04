import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import type { ComponentStyleConfig } from "@chakra-ui/theme";

const fonts = {
  heading: "Open Sans, sans-serif",
  body: "Open Sans, sans-serif",
};

const styles = {
  global: {
    "html, body": {
      // color: "#392453",
      color: "#217F31",
      bg: "brand.primary",
    },
  },
};

const colors = {
  brand: {
    // primary: "#202F45",
    main: "#26354B",

    primary: "#26354B",
    // secondary: "#EA580C",

    secondary: "#E7D6C3",
    greenCard: "#4cae4f",
    // secondaryLight: "rgba(234, 88, 12, 0.2)",
    secondaryLight: "#E7D6C350",
    800: "#26354B",
  },
  bgBody: {
    primary: "brand.primary",
  },
};

const breakpoints = {
  xs: "120px",
  sm: "320px",
  md: "900px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1536px",
};

// Components

const Switch: ComponentStyleConfig = {
  variants: {
    base: {},
    brand: {
      track: {
        bg: "#87878B",
        _checked: {
          bg: "brand.primary",
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "brand",
  },
};

const Input: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        background: "white",
        border: "1px solid",
        borderColor: "brand.secondary",
        color: "brand.primary",
        _focus: {
          borderColor: "transparent",
          boxShadow: "0 0 0 1px transparent",
        },
        _hover: {
          borderColor: "transparent",
          borderWidth: "1",
          boxShadow: "0 0 0 1px transparent",
        },
      },
    },

    unstyled: {
      field: {
        background: "transparent",
        borderRadius: "md",
        height: "auto",
        paddingX: 0,
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      color: "white",
      bg: "brand.secondary",
      _hover: {
        bg: "brand.secondary",
      },
      _active: {
        bg: "brand.secondary",
        color: "white",
      },
    },
    outline: {
      color: "white",
      bg: "brand.secondaryLight",
      borderColor: "brand.secondary",
      _hover: {
        bg: "brand.secondary",
        color: "brand.primary",
      },
      _active: {
        borderSize: "1px",
        bg: "brand.secondary",
        color: "brand.primary",
      },
    },

    ghost: {
      _hover: {
        bg: "transparent",
      },
      _active: {
        bg: "transparent",
      },
    },
  },
};

const Radio: ComponentStyleConfig = {
  baseStyle: {
    color: "red",
    bgColor: "red",
  },
};

const Modal = {
  baseStyle: {
    dialog: {
      maxHeight: "calc(100vh - 50px)",
      overflowY: "auto",
    },
  },
};

export const theme = extendTheme(
  {
    styles,
    colors,
    fonts,
    breakpoints,
    components: { Button, Switch, Input, Modal, Radio },
  },
  withDefaultColorScheme({
    colorScheme: "green",
  })
);
