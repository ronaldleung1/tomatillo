import {
  Link as ChakraLink,
  Text,
  List,
  ListIcon,
  ListItem,
  Circle,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Timer } from '../components/Timer'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container height="100vh">
    <Hero title="Tomatillo"/>
    <Main textAlign="center">
      <Text>
        A Pomodoro timer focused on accountability.
      </Text>
    </Main>
    <Timer />
    <DarkModeSwitch />
    <Footer>
      <Text>
        Open sourced on {" "}
        <ChakraLink isExternal href="https://github.com/googol88/tomatillo" flexGrow={1}>GitHub</ChakraLink>
      </Text>
    </Footer>
  </Container>
)

export default Index
