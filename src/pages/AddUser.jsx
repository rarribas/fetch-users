import { useContext } from "react";
import UsersContext from "../context/users";
export default function AddUser(){
  const { users } = useContext(UsersContext);
  console.log(users);
  return <h1>Add User</h1>
}