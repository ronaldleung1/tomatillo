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
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container>
    <Hero title="Tomatillo"/>
    <Main textAlign="center">
      <Text>
        A Pomodoro timer focused on accountability.
      </Text>
    </Main>
    <Timer />
    <ColorModeSwitcher />
    <Footer>
      <Text>
        Open sourced on {" "}
        <ChakraLink isExternal href="https://github.com/googol88/tomatillo" flexGrow={1}>GitHub</ChakraLink>
      </Text>
    </Footer>
  </Container>
)

export default Index
