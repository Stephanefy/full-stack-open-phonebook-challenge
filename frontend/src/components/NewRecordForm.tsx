import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Button, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import request from "../axios/request";



type Props = {};

const NewRecordForm = (props: Props) => {

    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [success, setSuccess] =  useState<boolean>(false)


    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.name === "person_name" && setName(e.currentTarget.value)
        e.currentTarget.name === "phone_number" && setNumber(e.currentTarget.value)
    }

    async function addNewRecord(e: React.FormEvent<HTMLInputElement>, name: string, number: string) {

        e.preventDefault()
        try {
            const response = await request.post('/persons', {
                name,
                number
            })
            console.log(response)
            if (response.data) { 
                setSuccess(true)
            }
            
        } catch (error) {
            console.log(error)   
        }
    }

  return (
    <form onSubmit={(e) => addNewRecord(e,name, number)}>
        <FormControl>
        <FormLabel>Name</FormLabel>
        <Input 
        name="person_name"
        value={name}
        onChange={handleInputChange} 
        placeholder="Enter a new person in your phone book" />
        <FormLabel>Phone number</FormLabel>
        <InputGroup>
            <InputLeftAddon children="+234" />
            <Input 
            name="phone_number"
            value={number}
            onChange={handleInputChange} 
            type="tel" 
            placeholder="phone number" />
        </InputGroup>
        </FormControl>
        <Spacer/>
        <Button
        type="submit"
        >
            Send
        </Button>
        {
            success && <p>Successfully added</p>
        }
    </form>
  );
};


export default NewRecordForm