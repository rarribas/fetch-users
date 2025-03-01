import {useContext, useState} from 'react';
import { useParams } from "react-router";
import UsersContext from "../context/users";
import styles from './UserItem.module.scss';
import Button from '../components/Button';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

export default function UserItem(){
  const [showModal, setShowModal] = useState(false);
  const { users, isLoadingUsers } = useContext(UsersContext);
  let params = useParams();
  const editableUser = users.find((user) => user.id === Number(params.id));

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
        <UserForm 
          afterFormSubmit={() => setShowModal(false)} 
          editableUser={editableUser}
        />
      </Modal>
    </div>
  )
}