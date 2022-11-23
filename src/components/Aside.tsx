import { Box, Text, Input, Button } from "@chakra-ui/react";
import { MakeList } from "./MakeList";
import { memo, useState } from "react";
import { useEffect } from "react";
import React from "react";
import { FC } from "react";

export const Aside: FC = memo((props) => {
  const [comment, setComment] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      console.log("loaded!");
      fetch("http://localhost:8080/chat", {})
        .then((res) => res.json())
        .then((data) => {
          setChatData(data.chat);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, []);

  return (
    <Box w="25%" h="550px" padding="50px">
      <Text className="text-blue-500">Chat</Text>
      <MakeList chatData={chatData} />
      <Input
        placeholder="コメントを入力"
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button
        colorScheme="teal"
        onClick={(event) => {
          fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              comment: comment,
            }),
          }).then((res) => console.log("チャット送信！"));
        }}
      >
        送信
      </Button>
    </Box>
  );
});
