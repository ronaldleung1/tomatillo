/*
 * A container that spans the entire window, used as a hacky fix for color modes
 */
import { Box, useColorMode } from '@chakra-ui/react'

export const MainContainer = (props) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }
  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
