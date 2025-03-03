import UserForm from '../components/UserForm';
import styles from "./AddUser.module.scss";
import Button from '../components/Button';
import { useNavigate } from "react-router";

export default function AddUser(){
  const navigate = useNavigate();

  return (
    <div className={styles["add-user-page"]}>
      <h1>Add User</h1>
      <UserForm/>
      <Button 
        text="Go Back to List" 
        onButtonClick={() => navigate('/')}
      />
    </div>
  )
}