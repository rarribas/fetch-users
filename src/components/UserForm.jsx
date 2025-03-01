import {useContext, useState, useEffect} from 'react';
import { inputElements } from "../data/inputElements";
import { useFormValidation } from "../hooks/useFormValidation";
import Form from '../components/Form';
import UsersContext from "../context/users";

export default function UserForm({editableUser, afterFormSubmit}){
  const [editableUserValue, setEditableUserValue] = useState({
    firstname: editableUser?.firstname || '',
    lastname: editableUser?.lastname || '',
    email: editableUser?.email || '',
    city: editableUser?.address.city || '',
    address: editableUser?.address.street || '',
    birthdate: editableUser?.birthDate || '',
    company: editableUser?.company.name || '',
  });

  const {isValidData, isValidField } = useFormValidation();
  const { editUser, addUser } = useContext(UsersContext);

  useEffect(() => {
    setEditableUserValue({
      firstname: editableUser?.firstname || '',
      lastname: editableUser?.lastname || '',
      email: editableUser?.email || '',
      city: editableUser?.address.city || '',
      address: editableUser?.address.street || '',
      birthdate: editableUser?.birthDate || '',
      company: editableUser?.company.name || '',
    })
  },[editableUser])

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

  const onInputChange = (ev, inputName) => {

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
          {!isValidField(input.name) && <p>Cannot be empty</p>}
        </div>
      )
    })
  }

  const onFormSubmit = (ev) => {
    ev.preventDefault();

    const isValid = isValidData(editableUserValue);
    if(!isValid) return false;

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
    
    console.log("RESET?")
    resetForm();
    if(afterFormSubmit) afterFormSubmit();
  };

  return (
    <Form 
      onFormSubmit={onFormSubmit} 
      buttonText={editableUser ? 'Edit User' : 'Add User'}>
      {getInputs()}
    </Form>
  )

}