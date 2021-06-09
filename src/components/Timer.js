/*
 * The pomodoro timer component and its corresponding logic
 * Start/stop, reset, and mode change functionality
 */
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
  // timer state, sort of analogous to a component's instance variables

  const [mode, setMode] = useState("Pomodoro");
  // settings for how long the timer should be for each mode (in seconds)
  const [modeTime, setModeTime] = useState({
    "Pomodoro": 25*60,
    "Short Break": 5*60,
    "Long Break": 15*60
  })

  // length of timer setting
  const [timerLen, setTimerLen] = useState(mode);
  // current time on timer in seconds
  const [seconds, setSeconds] = useState(timerLen);
  const [isActive, setIsActive] = useState(false);

  const bdr = useColorModeValue("gray.200", "gray.700")

  // Changes the timer from start to pause and vice-versa
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(timerLen);
    setIsActive(false);
  }

  // whenever the timer mode changes, the timer length is set to the mode's corresponding length
  useEffect(() => {
    setTimerLen(modeTime[mode]);
  }, [mode])

  // timer resets itself when the mode is switched
  useEffect(() => {
    reset();
  }, [timerLen])
  
  // main counting apparatus
  useEffect(() => {
    let interval = null;
    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000); // delay of 1000 milliseconds
    } else if(isActive) {
      // automatically switches mode at end of timer
      if(mode === "Pomodoro")
        setMode("Short Break");
      else
        setMode("Pomodoro");
      reset();
    } else if (!isActive && seconds !== 0) {
      // clears time interval when paused (for good practice)
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <TimerMode mode={mode} onClick={setMode} my={4} />
      <Box minW={96} borderWidth={2} borderColor={bdr} borderRadius={4} p={8}>
        <Text fontSize="6xl" textAlign="center">
          { // minutes
            Math.floor(seconds/60)
          }:{ // seconds (accounts for trailing zeros)
            seconds%60 < 10 ? `0${seconds%60}` : seconds%60
          }
        </Text>
        <Stack spacing={4} mt={4} direction="row" justifyContent="center" align="center">
          <Button colorScheme="whatsapp" minWidth={32} onClick={toggle}>
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