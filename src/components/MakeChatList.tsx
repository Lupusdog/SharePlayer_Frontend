import { ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { memo } from "react";
import type { ChatData } from "../types/ChatData";

export const MakeChatList: FC<ChatData> = memo((props) => {
  return (
    <UnorderedList spacing={2}>
      {props.chatData.map((chat: { Name: string; Comment: string }) => (
        <ListItem>{chat.Name + ": " + chat.Comment}</ListItem>
      ))}
    </UnorderedList>
  );
});
