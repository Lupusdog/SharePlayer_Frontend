import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to catch the root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <App />
  </ChakraProvider>
  // </React.StrictMode>
);
