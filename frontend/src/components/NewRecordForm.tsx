import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import request from "../axios/request";
import { Person, EditMode } from './List';
import { SetStateAction, Dispatch } from "react";
import { AxiosResponse } from "axios";

type Props = {
  phoneBookList: Person[];
  setPhoneBookList: Dispatch<SetStateAction<Person[]>>;
  editMode: EditMode;
};

const NewRecordForm = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.name === "person_name" && setName(e.currentTarget.value);
    e.currentTarget.name === "phone_number" && setNumber(e.currentTarget.value);
  };


  useEffect(() => {
    if (props.editMode.isEdit) {
      setName(props.editMode.name)
      setNumber(props.editMode.number)
    }
  }, [props.editMode])

  async function addOrUpdateNewRecord(
    e: React.FormEvent<HTMLInputElement>,
    name: string,
    number: string
  ) {
    e.preventDefault();
    let response: AxiosResponse<any, any>;
    try {
      // check if in editMode then update the data if not then simply post data
      if (props.editMode.isEdit) {

        const updatedPerson = {
          name,
          number
        }
         response = await request.put('/persons/' + props.editMode.for, updatedPerson)
      } else {
        response = await request.post("/persons", {
          name,
          number,
        });
      }
      console.log(response);
      if (response.data) {
        if(props.editMode.isEdit){
          const UpdatedPhoneBookList = props.phoneBookList.filter(person => person.id !== response.data.id)
          props.setPhoneBookList([...UpdatedPhoneBookList, response.data])
        } else {
          props.setPhoneBookList((prevState:Person[]) => [...prevState, response.data])
        }
        setName("")
        setNumber("")

        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setName("")
      setNumber("")
    }
  }

  console.log('editmode', props.editMode)

  return (
    <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => addOrUpdateNewRecord(e ,name, number)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          name="person_name"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter a new person in your phone book"
        />
        <FormLabel>Phone number</FormLabel>
        <InputGroup>
          <InputLeftAddon children="+234" />
          <Input
            name="phone_number"
            value={number}
            onChange={handleInputChange}
            type="tel"
            placeholder="phone number"
          />
        </InputGroup>
      </FormControl>
      <Spacer />
      <Button type="submit" marginTop={3} marginBottom={3}>{props.editMode.isEdit ? "Modify" : "Send"}</Button>
      {success && <p>Successfully added</p>}
    </form>
  );
};

export default NewRecordForm;
