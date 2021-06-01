
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import React, { useEffect, useState } from 'react';

export const TimerMode = () => {
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      Actions
    </MenuButton>
    <MenuList>
      <MenuItem>Download</MenuItem>
      <MenuItem>Create a Copy</MenuItem>
      <MenuItem>Mark as Draft</MenuItem>
      <MenuItem>Delete</MenuItem>
      <MenuItem>Attend a Workshop</MenuItem>
    </MenuList>
  </Menu>
}