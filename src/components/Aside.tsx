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
    fetch("https://shareplayer-backend.herokuapp.com/chat")
      .then((res) => res.json())
      .then((data) => setChatData(data.chat));
    setInterval(() => {
      console.log("loaded!");
      fetch("/chat")
        .then((res) => res.json())
        .then((data) => {
          setChatData(data.chat);
        });
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
        colorScheme="blue"
        onClick={(event) => {
          fetch("https://shareplayer-backend.herokuapp.com/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
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