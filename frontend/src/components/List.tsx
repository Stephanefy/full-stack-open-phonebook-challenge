import { UnorderedList, ListItem, Flex, Box, Spacer, Input, Stack, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import request  from '../axios/request'
import NewRecordForm from "./NewRecordForm";

type Props = {};


type Person = {
    id: number,
    name: string,
    number: string
}

const PhoneBookList = (props: Props) => {

    const [phoneBookList, setPhoneBookList] = useState<Person[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchPersons() {
            try {
                const response = await request('/persons')
    
                setPhoneBookList(response.data)
                
            } catch (error) {
                console.log(error)
                setError(true)
            }

        }

        fetchPersons()
    }, [])


  return (
    <Box marginTop={3}>
    <NewRecordForm/>
    <UnorderedList w="100%" paddingTop={2} paddingBottom={100} paddingLeft={0} textAlign="left" marginLeft={0}>
       {
        phoneBookList.length && phoneBookList?.map((person) => (
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
    </Box>
  );
};

export default PhoneBookList;
