import {useContext, useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router";
import UsersContext from "../context/users";
import styles from './UserItem.module.scss';
import Button from '../components/Button';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

export default function UserItem(){
  const [showModal, setShowModal] = useState(false);
  const { users, isLoadingUsers, deleteUser } = useContext(UsersContext);
  let params = useParams();
  const navigate = useNavigate();
  const editableUser = users.find((user) => user.id === Number(params.id));

  useEffect(() => {
    if (!editableUser && !isLoadingUsers) {
      navigate("/");
    }
  }, [editableUser, isLoadingUsers, navigate]);

  if(isLoadingUsers){
    return <h1>Loading ...</h1>
  }

  if(!editableUser){
    return null;
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
          onButtonClick={() => deleteUser(editableUser)}
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
          onSuccessAction={() => setShowModal(false)} 
          editableUser={editableUser}
        />
      </Modal>
    </div>
  )
}