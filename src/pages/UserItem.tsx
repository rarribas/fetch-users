import {useContext, useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router";
import UsersContext from "../context/users";
import styles from './UserItem.module.scss';
import Button from '../components/Button';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

export default function UserItem(){
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const { users, isLoadingUsers, deleteUser } = usersContext;
  const [deleted, setDeleted] = useState<boolean>(false);
  let params = useParams();
  const navigate = useNavigate();
  const editableUser = users.find((user) => user.id === Number(params.id));

  useEffect(() => {
    if (!editableUser && !isLoadingUsers && !deleted) {
      navigate("/not-found");
    }
  }, [editableUser, isLoadingUsers, deleted, navigate]);

  if(isLoadingUsers){
    return <h1>Loading ...</h1>
  }

  if(!editableUser){
    return null;
  }

  const afterDelete = () => {
    setDeleted(true);
    deleteUser(editableUser)
    navigate("/");
  }

  return (
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
        <Button 
          onButtonClick={() => setShowModal(true)} 
          text='Edit' 
          type='button'
          variant='success'
        />
        <Button 
          onButtonClick={afterDelete}
          text='Delete' 
          variant='danger' 
          type='button'
        />  
        <Button 
          text="Back to List" 
          navigateTo="/"
        />      
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