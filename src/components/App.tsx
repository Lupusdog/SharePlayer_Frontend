import { Center, Box } from "@chakra-ui/react";
import { memo } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import React from "react";
import { FC } from "react";

export const App: FC = memo(() => {
  return (
    <Center>
      <Box w="auto">
        <Header />
        <Main />
        <Footer />
      </Box>
    </Center>
  );
});
