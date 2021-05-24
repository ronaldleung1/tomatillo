import {
  Box,
  Text,
  Button
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius={4} p={4}>
        <Text>This is a timer. Very impressive</Text>
      </Box>
    </>
  )
}