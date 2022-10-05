import {Box,Input,Center,Flex,Button, Stack} from "@chakra-ui/react"
import {useState, memo, useEffect} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";
import { useCallback } from "react";


export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [Time, setTime] = useState(0);
    const [syncFlag, setSyncFlag] = useState(false);
    //通常の定数で保管するとPlayerの挙動に問題が出るため、useStateを使用。
    const [ref,setRef] = useState(React.createRef())

    useEffect(() => {
        setInterval(() => {postMovie()},5000)
    },[])


    const postMovie = () => {
        fetch('/share', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: Url,
                time: Time
            })
        }).then( (res) =>{
            console.log("送信");
            }
        ).catch((error) => {
            console.error("error",error);
        })}
        
    const getMovie = () => {fetch("/share").then((res) => res.json()).then((data) => {
            console.log(data.time);
            setUrl(data.url);
            ref.current.seekTo(data.time);
            }
        )};

    return(
        <Flex>
            <Box w="75%" h="550px" >
                <Input placeholder="再生したい動画のurlを貼り付けてください" onChange={
                    (event) => {
                        setUrl(event.target.value);
                    }
                } />
                <Center>
                    <Box>
                        <ReactPlayer  height={450} url={Url}  controls={true} playing={true} ref={ref} onProgress={(state) => {
                            console.log("Progress");
                            setTime(state.playedSeconds);
                            // if(syncFlag)postMovie();
                        }} />
                        <Stack direction={"row"} spacing={4}>
                        <Button onClick={(event) => {
                            setSyncFlag(true);
                        }}>動画の共有開始</Button>
                        <Button onClick={(event) => {
                           setSyncFlag(false);
                        }}>動画の共有停止</Button>
                        <Button onClick={(event) => {
                            getMovie();
                        }}>動画を見る</Button>
                        </Stack>
                    </Box>
                </Center>
            </Box>
        <Aside />
        </Flex>
    );
});

