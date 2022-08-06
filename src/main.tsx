import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/open-sans";
import "./index.css";
import { theme } from "./themes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
