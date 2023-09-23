import {Box, ChakraProvider}from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import {Router} from"./router/Router";
import { Footer } from "./components/organisms/layout/Footer";

export default function App() {
  return (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </ChakraProvider>
  );
}
