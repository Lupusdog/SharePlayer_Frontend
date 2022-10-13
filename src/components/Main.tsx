import { Box, Input, Center, Flex, Button, Stack } from "@chakra-ui/react";
import { useState, memo } from "react";
import React from "react";
import ReactPlayer from "react-player";
import { Aside } from "./Aside";
import { FC } from "react";

export const Main: FC = memo(() => {
  const [Url, setUrl] = useState("");
  const [Time, setTime] = useState(0);
  const [syncFlag, setSyncFlag] = useState<boolean>(false);
  //通常の定数で保管するとPlayerの挙動に問題が出るため、useStateを使用。
  const [ref, setRef] = useState(React.createRef<ReactPlayer>());

  const postMovie = () => {
    fetch("https://shareplayer-backend.herokuapp.com/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: Url,
        time: Time,
      }),
    })
      .then((res) => {
        console.log("送信");
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const getMovie = () => {
    fetch("https://shareplayer-backend.herokuapp.com/share")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.time);
        console.log(data.url);
        setUrl(data.url);
        if (!ref.current) {
          console.log("refに問題!");
        }
        ref.current?.seekTo(data.time);
      });
  };

  return (
    <Flex>
      <Box w="75%" h="auto">
        <Input
          mb={6}
          placeholder="再生・共有したい動画のurlを貼り付けてください"
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
        <Center>
          <Box>
            <ReactPlayer
              displayheight={500}
              url={Url}
              controls={true}
              playing={true}
              ref={ref}
              onProgress={(state) => {
                console.log("Progress");
                setTime(state.playedSeconds);
                if (syncFlag) {
                  postMovie();
                }
              }}
            />
            <Stack direction={"row"} spacing={4}>
              <Button
                colorScheme="teal"
                onClick={(event) => {
                  console.log("共有開始");
                  setSyncFlag(true);
                  console.log(syncFlag);
                }}
              >
                動画の共有開始
              </Button>
              <Button
                colorScheme="teal"
                onClick={(event) => {
                  console.log("共有停止");
                  setSyncFlag(false);
                  console.log(syncFlag);
                }}
              >
                動画の共有停止
              </Button>
              <Button
                colorScheme="teal"
                onClick={(event) => {
                  getMovie();
                }}
              >
                共有された動画を見る
              </Button>
            </Stack>
          </Box>
        </Center>
      </Box>
      <Aside />
    </Flex>
  );
});
