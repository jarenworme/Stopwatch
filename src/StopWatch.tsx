import { Heading, Stack, VStack, HStack, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import StopWatchButton from './StopWatchButton'
import React, { useState, useEffect } from "react";


export default function StopWatch() {
    // init arrat to use for state of laps
    const initLaps: Array<[number, string]> = [];

    // define states for variables used
    const [laps, setLaps] = useState(initLaps);
    const [numLaps, setNumLaps] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // addsthe current time value and lap number as a member of the laps array, to be dynamically rendered
    const addLap = () => {
        let temp = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
        setLaps((prevLaps) => [...prevLaps, [numLaps, temp]]);
        setNumLaps(numLaps => numLaps + 1);
    };

    // translate time into its derivatives to be displayed separately
    const hours = Math.floor(time/360000).toString().padStart(2, "0");
    const minutes = Math.floor((time%360000) / 6000).toString().padStart(2, "0");
    const seconds = Math.floor((time%6000) / 100).toString().padStart(2, "0");
    const milliseconds = (time%100).toString().padStart(3, "0");
  
    // set interval updates every 10ms so the stopwatch is continuous
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRunning){
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 10);
        } else {
            // was in the orignal but threw an error here, code works without it
            //clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
  
    // functions to alter the clock functions by handling button presses
    const handleStart = () => {
        if (!isRunning){
            setIsRunning(isRunning => !isRunning);
        }
      };

    const handleStop = () => {
        if (isRunning){
            setIsRunning(isRunning => !isRunning);
        }
    };
  
    // sets all values back to their initial states
    const handleReset = () => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
      setNumLaps(0);
    };


    return(
        <Stack w="full" mx="0" p="0" direction={["column", "column", "column", "row"]} spacing='8' minHeight={"100vh"} bg="#eef0eb" position={"relative"}>
            <VStack alignItems="space-between" w='100%' spacing="1.5" h="100%" m="0">
                <Heading mt="2rem" as="h1" color="#153243" textAlign="center" fontWeight="bold" fontSize="4xl">
                    Stopwatch by Jaren Worme
                </Heading>
                <VStack mx="2rem" my="6rem">                
                    <Heading as="h1" color="#284b63" textAlign="center" fontWeight="bold" fontSize="7xl">
                        <span>{ hours } : { minutes } : { seconds } : { milliseconds }</span>
                    </Heading>
                </VStack>
                <HStack width="60%" m="0 20%">
                    <StopWatchButton label='start' back='#153243' disableCondition={isRunning} onClick={handleStart}></StopWatchButton>
                </HStack>
                <HStack m="3% 15%" width="70%">
                    <StopWatchButton label='reset' back='#b4b8ab' disableCondition={false} onClick={handleReset} ></StopWatchButton>
                    <StopWatchButton label='stop' back='#b4b8ab' disableCondition={false} onClick={handleStop} ></StopWatchButton>
                    <StopWatchButton label='lap' back='#b4b8ab' disableCondition={false} onClick={addLap} ></StopWatchButton>
                </HStack>
                <VStack minH="5%" mt="0" alignItems="center" mb="1.5rem">
                    <Text color="#153243" fontSize={"large"} >{numLaps>0 ? "laps:" : "laps will be displayed below here"}</Text>
                    {  laps.map((item) => {
                        return  <HStack color="#153243" fontSize={"large"} justifyContent="space-between" w='60%'>
                                    <Text textAlign="left">{item[0]}</Text>
                                    <Text textAlign="right">{item[1]}</Text>
                                </HStack>;
                    }) }
                </VStack>
                <VStack padding="0" my="5px" h="2.5rem" fontSize="2xs" >
                    <HStack my="1rem" bottom="0" position="absolute" spacing="2rem">
                        <Text color="#153243" fontStyle="italic" my="0">&copy; Jaren Worme 2024</Text>
                        <Link color="#153243" href="https://www.jarenworme.com/" isExternal>
                            jarenworme.com
                            <ExternalLinkIcon/>
                        </Link>
                    </HStack>
                </VStack>
            </VStack>
        </Stack>        
    )
}
