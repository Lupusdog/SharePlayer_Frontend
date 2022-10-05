import {Box,Text,Input,Button} from "@chakra-ui/react"
import { MakeList } from "./MakeList"
import { memo,useState } from "react"
import { useEffect } from "react";

export const Aside = memo ((props) => {
  
  const [Comment, setComment] = useState("");
  const [ChatData, setChatData] = useState([{}]);

  useEffect(() => {
    fetch("https://pacific-hamlet-42593.herokuapp.com/chat").then(res => res.json()).then(data => setChatData(data.chat));
    setInterval(() => {
      console.log("loaded!");
      fetch("https://pacific-hamlet-42593.herokuapp.com/chat").then(res => res.json()).then(data => {setChatData(data.chat)
            console.log(data.chat)
      });
    }, 1000);
  }, []);

  return(
    <Box  w="25%" h="550px" padding="50px">
      <Text className="text-blue-500">Chat</Text>
        <MakeList chatData={ChatData} />
        <Input placeholder="コメントを入力" onChange={(event) => {
          setComment(event.target.value);
        }}/>
        <Button colorScheme="blue" onClick={(event) => {
          fetch("https://pacific-hamlet-42593.herokuapp.com/chat",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                comment: Comment
              })
          }).then((res) => console.log("チャット送信！"))
        }}>送信</Button>
    </Box>
  )
});