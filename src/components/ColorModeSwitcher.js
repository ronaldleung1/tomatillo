
import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { Moon, Sun } from 'react-feather';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(Moon, Sun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      position="fixed"
      top="1rem"
      right="1rem"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};