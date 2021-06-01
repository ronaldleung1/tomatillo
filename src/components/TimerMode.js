
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { ChevronDown } from 'react-feather';

import React, { useState } from 'react';

export const TimerMode = ({onClick, props}) => {
  const [mode, setMode] = useState("Pomodoro");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDown size={12} />} {...props}>
        {mode}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setMode("Pomodoro");
            onClick(25*60);
          }}>
          Pomodoro
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMode("Short Break");
            onClick(5*60);
          }}>
          Short Break
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMode("Long Break");
            onClick(15*60);
          }}>
          Long Break
        </MenuItem>
      </MenuList>
    </Menu>
  )
}