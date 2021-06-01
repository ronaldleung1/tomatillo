
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { ChevronDown } from 'react-feather';

export const TimerMode = (props) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDown />} {...props}>
      Timer Mode
    </MenuButton>
    <MenuList>
      <MenuItem>Pomodoro</MenuItem>
      <MenuItem>Short Break</MenuItem>
      <MenuItem>Long Break</MenuItem>
    </MenuList>
  </Menu>
)