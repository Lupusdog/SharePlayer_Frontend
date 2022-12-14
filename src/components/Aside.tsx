import { Box, Text, Input, Button } from "@chakra-ui/react";
import { MakeChatList } from "./MakeChatList";
import { memo, useState } from "react";
import { useEffect } from "react";
import React from "react";
import { FC } from "react";

export const Aside: FC = memo((props) => {
  const [comment, setComment] = useState("");
  const [chatData, setChatData] = useState([]);

  //定期的にチャットデータを更新
  useEffect(() => {
    setInterval(() => {
      console.log("loaded!");
      fetch("https://www.shareplayer.site/chat")
        .then((res) => res.json())
        .then((data) => {
          setChatData(data.chat);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, []);

  return (
    <Box w="25%" h="550px" padding="50px">
      {/* チャット欄 */}
      <Text className="text-blue-500">Chat</Text>
      {/* バックエンドから受け取ったチャットデータでチャットリストを生成 */}
      <MakeChatList chatData={chatData} />
      {/* チャットに追加する項目を入力、ボタンで送信 */}
      <Input
        placeholder="コメントを入力"
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button
        colorScheme="teal"
        onClick={(event) => {
          fetch("https://www.shareplayer.site/chat", {
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
