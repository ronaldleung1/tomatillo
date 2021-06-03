
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { ChevronDown } from 'react-feather';

export const TimerMode = ({mode, onClick, ...props}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDown size={12} />} {...props}>
        {mode}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            onClick("Pomodoro");
          }}>
          Pomodoro
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClick("Short Break");
          }}>
          Short Break
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClick("Long Break");
          }}>
          Long Break
        </MenuItem>
      </MenuList>
    </Menu>
  )
}