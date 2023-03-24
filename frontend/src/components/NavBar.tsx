import React from 'react'
import { Box } from '@chakra-ui/react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <Box bgColor="tomato" w="100%" p={4} color="white">
        <h1>Phone book</h1>
    </Box>
  )
}

export default NavBar