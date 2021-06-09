/*
 * Main page for Tomatillo, located in `/` route
 */
import {
  Link as ChakraLink,
  Text,
  Container
} from '@chakra-ui/react'
import { Timer } from '../components/Timer'
import { Hero } from '../components/Hero'
import { MainContainer } from '../components/MainContainer'
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import { Footer } from '../components/Footer'

const Index = () => (
  <>
    <MainContainer as="main" textAlign="center" minHeight="100vh">
      <Hero textAlign="center" title="Tomatillo"/>
      <ColorModeSwitcher />
      <Container>
        <Text>
          A Pomodoro timer focused on accountability.
        </Text>
        <Timer />
      </Container>
      <Footer justifyContent="center">
        <Text>
          Open sourced on {" "}
          <ChakraLink isExternal href="https://github.com/googol88/tomatillo" flexGrow={1}>GitHub</ChakraLink>
        </Text>
      </Footer>
    </MainContainer>
  </>
)

export default Index
