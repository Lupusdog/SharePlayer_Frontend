import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { memo } from "react";

export const Footer: FC = memo(() => {
  return (
    <Box w="auto" h="auto">
      <Text>製作者:Lupusdog(https://twitter.com/Lupusdog_Ookami)</Text>
    </Box>
  );
});
