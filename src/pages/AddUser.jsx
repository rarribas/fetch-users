import { useContext } from "react";
import UsersContext from "../context/users";
import Form from "../components/Form";
import { inputElements } from "../data/inputElements";
import styles from "./AddUser.module.scss";
import { useFormValidation } from "../hooks/useFormValidation";
export default function AddUser(){
  // Add custom hook that validates data is not empty and returs error and success messages
  const { addUser } = useContext(UsersContext);
  const {isValidData, isValidField } = useFormValidation();
  
  const onFormSubmit = (ev) => {
    ev.preventDefault();

    const isValid = isValidData(ev.target.elements);
    if(!isValid) return false;

    const userItem = {
      firstname: ev.target.elements.firstname.value,
      lastname: ev.target.elements.lastname.value,
      email: ev.target.elements.email.value,
      city: ev.target.elements.city.value,
      street: ev.target.elements.address.value,
      birthdate: ev.target.elements.birthdate.value,
      company: ev.target.elements.company.value,
    };

    addUser(userItem);

    ev.target.reset();
  };
  
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
          {!isValidField(input.name) && <p>Cannot be empty</p>}
        </div>
      )
    })
  }

  return (
    <div className={styles["add-user-page"]}>
      <h1>Add User</h1>
      <Form  onFormSubmit={onFormSubmit} buttonText="Add User">
        {getInputs()}
      </Form>
    </div>
  )
}