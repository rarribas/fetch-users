import {useContext, useState, useEffect} from 'react';
import { useParams } from "react-router";
import UsersContext from "../context/users";
import styles from './UserItem.module.scss';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Form from "../components/Form";
import { inputElements } from "../data/inputElements";
import { useFormValidation } from "../hooks/useFormValidation";

export default function UserItem(){
  const [showModal, setShowModal] = useState(false);
  const [editableUserValue, setEditableUserValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    city: '',
    street: '',
    birthdate: '',
    company: '',
  });
  const {isValidData, isValidField } = useFormValidation();
  const { users, editUser, isLoadingUsers } = useContext(UsersContext);
  let params = useParams();
  const editableUser = users.find((user) => user.id === Number(params.id));

   useEffect(() => {
    setEditableUserValue({
      firstname: editableUser?.firstname,
      lastname: editableUser?.lastname,
      email: editableUser?.email,
      city: editableUser?.address.city,
      address: editableUser?.address.street,
      birthdate: editableUser?.birthDate,
      company: editableUser?.company.name,
    })
  },[editableUser])

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
      id: editableUser.id,
      firstname: editableUserValue.firstname,
      lastname: editableUserValue.lastname,
      email: editableUserValue.email,
      city: editableUserValue.city,
      street: editableUserValue.address,
      birthdate: editableUserValue.birthdate,
      company: editableUserValue.company,
    };

    editUser( userItem);

    ev.target.reset();
    setShowModal(false);
  };

  // TODO: Render not found page if not found
  return ( isLoadingUsers ? <h1> Loading ...</h1> :
    <div className={styles['user-item']}>
      <header>
        <h1>{editableUser.firstname} {editableUser.lastname}</h1>
      </header>
      <div>
        <p><span>Email:</span> {editableUser.email}</p>
        <p><span>Date of Birth:</span> {editableUser.birthDate}</p>
        <p><span>Address:</span> {editableUser.address?.street} - {editableUser.address?.city}</p>
        <p><span>Company:</span> {editableUser.company?.name}</p>
      </div>
      <div className={styles['user-item-footer']}> 
        <Button onButtonClick={() => setShowModal(true)} text='Edit' type='button'></Button>
        <Button text='Delete' variant='danger' type='button'></Button>
      </div>
      <Modal showModal={showModal} onModalClosed={() => setShowModal(false)}>
        <Form onFormSubmit={onFormSubmit} buttonText="Edit User">
          {getInputs()}
        </Form>
      </Modal>
    </div>
  )
}