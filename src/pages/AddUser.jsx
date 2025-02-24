import { useContext } from "react";
import UsersContext from "../context/users";
import Form from "../components/Form";
import { inputElements } from "../data/inputElements";
import styles from "./AddUser.module.scss";
export default function AddUser(){
  // Add custom hook that validates data is not empty and returs error and success messages
  const { users } = useContext(UsersContext);
  const getInputs = () => {
    return inputElements.map((input) =>{ 
      return (
        <div className="form-control" key={`input_${input.name}`}>
          <label htmlFor={input.name}>{input.text}:</label>
          <input 
            type={input.type} 
            name={input.name} 
            id={input.name}
          />
          {/* {!isValidField(input.name) && getMessage(`${input.text} cannot be empty`, "error")} */}
        </div>
      )
    })
  }

  return (
    <div className={styles["add-user-page"]}>
      <h1>Add User</h1>
      <Form buttonText="Add User">
        {getInputs()}
      </Form>
    </div>
  )
}