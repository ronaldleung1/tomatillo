import {
  Box,
  Stack,
  Text,
  Button
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Box border="1px" minW="400px" borderColor="gray" borderRadius={4} p={8}>
        <Text fontSize="6xl" textAlign="center">00:00</Text>
        <Stack spacing={4} mt={4} direction="row" justifyContent="center" align="center">
          <Button colorScheme="teal">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button colorScheme="gray">
            Reset
          </Button>
        </Stack>
      </Box>
    </>
  )
}