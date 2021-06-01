import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }) => (
  <Heading
    fontSize="10vw"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    {title}
  </Heading>
)

Hero.defaultProps = {
  title: 'with-chakra-ui',
}
