import { UnorderedList, ListItem, Flex, Box, Spacer, Button } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import request  from '../axios/request'
import NewRecordForm from "./NewRecordForm";
import { MdDelete, MdUpdate } from 'react-icons/md';

type Props = {};


export type Person = {
    id: string,
    name: string,
    number: string
}


export type EditMode = {
    for: string,
    isEdit: boolean,
    name: string,
    number: string
}

const PhoneBookList = (props: Props) => {

    const [phoneBookList, setPhoneBookList] = useState<Person[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<EditMode>({
        for:'',
        isEdit: false,
        name: '',
        number: ''
    })

    const handleDelete = async (id: string) => {
        setIsLoading(true)
        try {
            const response = await request.delete(`/persons/${id}`)
    
            const newPhoneBookList = 
                phoneBookList.filter(person => person.id!== response.data.id)
            
                setPhoneBookList(newPhoneBookList)
            
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }

    const handleUpdate = (person: Person) => {
        if (editMode.isEdit) {
            setEditMode({
                for:'',
                isEdit: false,
                name: '',
                number: ''
            })
        } else {
            setEditMode({
                for: person.id,
                isEdit: true,
                name: person.name,
                number: person.number
            })
        }

    }

    const handleFetchPersonData = async (id: string) => {
        setIsLoading(true)

        try {
            const response = await request(`/persons/${id}`)

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    

    useEffect(() => {
        async function fetchPersons() {
            setIsLoading(true)
            
            try {
                const response = await request('/persons')
    
                setPhoneBookList(response.data)
                
            } catch (error) {
                console.log(error)
                setError(true)
            }

            setIsLoading(false)

        }

        fetchPersons()
    }, [])




  return (
    <Box marginTop={3}>
    <NewRecordForm 
        setPhoneBookList={setPhoneBookList} 
        editMode={editMode}
        phoneBookList={phoneBookList}    
    />
    <UnorderedList w="100%" paddingTop={2} paddingBottom={100} paddingLeft={0} textAlign="left" marginLeft={0}>
       {
        phoneBookList.length && phoneBookList?.map((person) => (
            <ListItem 
                onClick={() => handleFetchPersonData(person.id)}
                key={person.id} 
                listStyleType='none' 
                textAlign={"left"} w="100%" 
                marginBottom={2} 
                marginTop={2}
            >
                {
                    isLoading ? (
                        <p>loading...</p>
                    ) : (

                        <Flex justifyContent="between" w="100%">
                            <Box mr={20}>
                                <h2>{person.name}</h2>
                            </Box>
                            <Spacer/>
                            <Box textAlign={"left"}>
                                <span>{person.number}</span>
                            </Box>
                            <Spacer/>
                            <Box marginLeft={3}>
                                <Button onClick={() => handleDelete(person.id)}>
                                    <MdDelete/>
                                </Button>
                            </Box>
                            <Box marginX={3}>
                                <Button onClick={() => handleUpdate(person)}>
                                    <MdUpdate/>
                                </Button>
                            </Box>
                        </Flex>
                    )
                }
            </ListItem>

        ))
       }
    </UnorderedList>
    </Box>
  );
};

export default PhoneBookList;
