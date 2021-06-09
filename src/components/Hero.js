/*
 * A simple gradient heading
 */
import { Heading } from '@chakra-ui/react'

export const Hero = ({ title, ...props }) => (
  <Heading
    fontSize="10vw"
    bgGradient="linear(to-l, #72e665, #73d4e6)"
    bgClip="text"
    {...props}
  >
    {title}
  </Heading>
)

Hero.defaultProps = {
  title: 'with-chakra-ui',
}
