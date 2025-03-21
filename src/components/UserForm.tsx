import {useContext, useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { inputElements } from "../data/inputElements";
import { useFormValidation } from "../hooks/useFormValidation";
import Form from './Form';
import UsersContext from "../context/users";
import FormMessage, {type MessageVariantType} from "./FormMessage";
import { UserI, SimpleUserI } from '../types/user';

export interface UserFormI {
  editableUser?: UserI,
  afterFormSubmit?: () => void,
}

export default function UserForm({editableUser, afterFormSubmit}:UserFormI){
  const [editableUserValue, setEditableUserValue] = useState<SimpleUserI>({
    firstname: editableUser?.firstname || '',
    lastname: editableUser?.lastname || '',
    email: editableUser?.email || '',
    city: editableUser?.address?.city || '',
    address: editableUser?.address?.street || '',
    birthdate: editableUser?.birthDate || '',
    company: editableUser?.company?.name || '',
  });
  const [submitStatus, setSubmitStatus] = useState<string| null>(null);
  const {isValidData, isValidField } = useFormValidation();
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { editUser, addUser } = usersContext;

  useEffect(() => {
    setEditableUserValue({
      firstname: editableUser?.firstname || '',
      lastname: editableUser?.lastname || '',
      email: editableUser?.email || '',
      city: editableUser?.address?.city || '',
      address: editableUser?.address?.street || '',
      birthdate: editableUser?.birthDate || '',
      company: editableUser?.company?.name || '',
    })
  },[editableUser]);

  useEffect(() => {
    if(submitStatus === "success"){ 
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  },[submitStatus]);

  const resetForm = () => {
    setEditableUserValue({
      firstname: '',
      lastname: '',
      email: '',
      city: '',
      address: '',
      birthdate: '',
      company: '',
    }) 
  }

  const getMessage = (message:string, variant:MessageVariantType) => {
    return <FormMessage  message={message} variant={variant}/>
  };

  const onInputChange = (ev:ChangeEvent<HTMLInputElement>, inputName:string) => {

    const updatedUser = {
      ... editableUserValue,
      [inputName]: ev.target.value,
    }

    setEditableUserValue(updatedUser)
  }

  const getInputs = () => {
    return inputElements.map((input) =>{ 
      return (
        <div className="form-control" key={`input_${input.name}`}>
          <label htmlFor={input.name}>{input.text}:</label>
          <input 
            type={input.type} 
            name={input.name} 
            id={input.name}
            value={editableUserValue[input.name]}
            onChange={(ev) => onInputChange(ev, input.name)}
          />
          {!isValidField(input.name) && getMessage(`${input.text} cannot be empty`, "error")}
        </div>
      )
    })
  }

  const onFormSubmit = (ev:FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const isValid = isValidData(editableUserValue);
    if(!isValid){
      setSubmitStatus("error");
      return false;
    } 

    const userItem = {
      ...(editableUser && { id: editableUser.id }),
      firstname: editableUserValue.firstname,
      lastname: editableUserValue.lastname,
      email: editableUserValue.email,
      city: editableUserValue.city,
      street: editableUserValue.address,
      birthdate: editableUserValue.birthdate,
      company: editableUserValue.company,
    };

    if(editableUser){
      editUser(userItem);
    }else{
      addUser(userItem);
    }
    
    resetForm();
    setSubmitStatus("success");
    if(afterFormSubmit) afterFormSubmit();
  };

  return (
    <>
      <Form 
        onFormSubmit={onFormSubmit} 
        buttonText={editableUser ? 'Edit User' : 'Add User'}>
        {getInputs()}
      </Form>
      {submitStatus === 'success' && getMessage("Success! The user has been added", "success")}
    </>
  )

}