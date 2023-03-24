import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Container } from '@chakra-ui/react'
import PhoneBookList from './components/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxW='container.lg' bg="tomato.600" minH={"100vh"}>
      <NavBar/>
      <Container height={"100%"} paddingLeft={0}>
        <PhoneBookList/>
      </Container>
    </Container>
  )
}

export default App
