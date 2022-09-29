import {Box,Input,Center,Flex,Button,Stack} from "@chakra-ui/react"
import {useState,memo,useEffect,useCallback} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";
import { response } from "express";


export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [Time, setTime] = useState(0);
    const [syncFlag, setSyncFlag] = useState(false);
    // const [shareTime,setShareTime] = useState(0);
    //通常の定数で保管するとPlayerの挙動に問題が出るため、useStateを使用。
    const [ref,setRef] = useState(React.createRef())

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("Interval");
    //         fetch('/share', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 url: Url,
    //                 time: Time
    //             })
    //         }).then((res) =>{
    //             console.log("送信");
    //             }
    //         ).catch((error) => {
    //             console.log("送信失敗", error);
    //         })},3000)
    //         },[])


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
        }).then((res) =>{
            // if(!response.ok) {
            //     console.error("サーバーエラー");
            // }
            console.log("送信");
            }
        ).catch((error) => {
            console.log("送信失敗", error);
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
                            console.log(syncFlag);
                            if(syncFlag)postMovie()
                        }} />
                        <Stack spacing={4} direction="row">
                        <Button colorScheme="green" size="md" onClick={(event) => {
                            setSyncFlag(true);
                            console.log("fire!");                            
                        }
                        }>動画の共有開始(HOST)</Button>
                        <Button colorScheme="green" size="md" onClick={(event) => {
                            setSyncFlag(false);
                            console.log("stop!");
                        }
                        }>動画の共有停止(HOST)</Button>
                        <Button colorScheme="green" size="md" onClick={(event) => {
                            getMovie();
                            console.log("gotcha!");
                        }}>動画の取得(Guest)</Button>
                        </Stack>
                    </Box>
                </Center>
            </Box>
        <Aside />
        </Flex>
    );
});

