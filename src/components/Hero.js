import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title, ...props }) => (
  <Heading
    fontSize="10vw"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
    {...props}
  >
    {title}
  </Heading>
)

Hero.defaultProps = {
  title: 'with-chakra-ui',
}
