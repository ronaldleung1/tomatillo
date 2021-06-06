import {
  Box,
  Stack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { TimerMode }from './TimerMode';
import { TaskList }from './TaskList';

import React, { useEffect, useState } from 'react';

export const Timer = () => {
  const [mode, setMode] = useState("Pomodoro");
  const [modeTime, setModeTime] = useState({
    "Pomodoro": 25*60,
    "Short Break": 5*60,
    "Long Break": 15*60
  })

  const [timerLen, setTimerLen] = useState(mode);
  const [seconds, setSeconds] = useState(timerLen);
  const [isActive, setIsActive] = useState(false);

  const bdr = useColorModeValue("gray.200", "gray.700")

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(timerLen);
    setIsActive(false);
  }

  useEffect(() => {
    setTimerLen(modeTime[mode]);
  }, [mode])

  useEffect(() => {
    reset();
  }, [timerLen])
  
  useEffect(() => {
    let interval = null;
    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if(isActive) {
      if(mode === "Pomodoro")
        setMode("Short Break");
      else
        setMode("Pomodoro");
      reset();
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <TimerMode mode={mode} onClick={setMode} my={4} />
      <Box minW={96} borderWidth={2} borderColor={bdr} borderRadius={4} p={8}>
        <Text fontSize="6xl" textAlign="center">
          {Math.floor(seconds/60)}
          :
          {seconds%60 < 10 ? `0${seconds%60}` : seconds%60}
        </Text>
        <Stack spacing={4} mt={4} direction="row" justifyContent="center" align="center">
          <Button colorScheme="blue" minWidth={32} onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button colorScheme="gray" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </Box>
      <TaskList my={4}/>
    </>
  )
}