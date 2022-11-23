import {
  Box,
  Heading,
  Flex,
  Center,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { memo, useState } from "react";

export const Header: FC = memo(() => {
  const [name, setName] = useState("No Name");

  return (
    <Flex>
      <Center>
        <Box padding="50px">
          <Heading as="h1" size="xl">
            SharePlayer
          </Heading>
          <Text>Youtube,Twitch,SoundCloud,Facebook,etc...</Text>
        </Box>
        <Box>
          <Input
            w="150%"
            placeholder="ユーザー名を入力してください"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Button
            margin="auto"
            colorScheme="teal"
            onClick={(event) => {
              fetch("https://www.shareplayer.site/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  name: name,
                }),
              });
            }}
          >
            登録
          </Button>
        </Box>
      </Center>
    </Flex>
  );
});
