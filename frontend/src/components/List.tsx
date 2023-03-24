import { UnorderedList, ListItem, Flex, Box, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import request  from '../axios/request'

type Props = {};


type Person = {
    id: number,
    name: string,
    number: string
}

const PhoneBookList = (props: Props) => {

    const [phoneBookList, setPhoneBookList] = useState<Person[]>([])

    useEffect(() => {
        async function fetchPersons() {
            const response = await request('/persons')

            setPhoneBookList(response.data)

        }

        fetchPersons()
    }, [])


  return (
    <UnorderedList w="100%" paddingTop={100} paddingBottom={100} paddingLeft={0} textAlign="left" marginLeft={0}>
       {
        phoneBookList.map((person) => (
            <ListItem key={person.id} listStyleType='none' textAlign={"left"} w="100%">
                <Flex justifyContent="between" w="100%">
                    <Box mr={20}>
                        <h2>{person.name}</h2>
                    </Box>
                    <Spacer/>
                    <Box textAlign={"left"}>
                        <span>{person.number}</span>
                    </Box>
                </Flex>
            </ListItem>

        ))
       }
    </UnorderedList>
  );
};

export default PhoneBookList;
