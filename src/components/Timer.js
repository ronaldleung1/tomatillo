import {
  Box,
  Stack,
  Text,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export const Timer = () => {
  const [timerLen, setTimerLen] = useState(25*60);
  const [seconds, setSeconds] = useState(timerLen);
  const [isActive, setIsActive] = useState(false);

  const bdr = useColorModeValue("gray.300", "gray.700")

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(timerLen);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <Box minW={96} borderWidth={2} borderColor={bdr} borderRadius={4} p={8}>
        <Text fontSize="6xl" textAlign="center">{seconds}s</Text>
        <Stack spacing={4} mt={4} direction="row" justifyContent="center" align="center">
          <Button colorScheme="blue" minWidth={32} onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button colorScheme="gray" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </>
  )
}