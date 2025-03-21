import UserForm from '../components/UserForm';
import styles from "./AddUser.module.scss";
import Button from '../components/Button';

export default function AddUser(){
  return (
    <div className={styles["add-user-page"]}>
      <h1>Add User</h1>
      <UserForm/>
      <Button 
        text="Go Back to List" 
        navigateTo="/"
      />
    </div>
  )
}