import { useContext } from "react";
import UsersContext from "../context/users";
export default function Users(){
  const { users } = useContext(UsersContext);
  console.log(users);
  return <h1>Users Page</h1>
}