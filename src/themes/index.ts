import { extendTheme } from "@chakra-ui/react";
import type { ComponentStyleConfig } from "@chakra-ui/theme";

const fonts = {
  heading: "Open Sans, sans-serif",
  body: "Open Sans, sans-serif",
};

const styles = {
  global: {
    "html, body": {
      color: "#392453",
      bg: "brand.primary",
    },
  },
};

const colors = {
  brand: {
    primary: "#202F45",
    secondary: "#EA580C",
    secondaryLight: "rgba(234, 88, 12, 0.2)",
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
          bg: "brand.secondary",
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
        background: "inherit",
        border: "1px solid",
        borderColor: "#EA580C",
        color: "white",
        _focus: {
          borderColor: "#EA580C",
          boxShadow: "0 0 0 1px #EA580C",
        },
        _hover: {
          borderColor: "#EA580C",
          borderWidth: "1",
          boxShadow: "0 0 0 1px #EA580C",
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
      },
      _active: {
        borderSize: "1px",
        bg: "brand.secondary",
        color: "white",
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

export const theme = extendTheme({
  styles,
  colors,
  fonts,
  breakpoints,
  components: { Button, Switch, Input },
});
