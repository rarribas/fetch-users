import {useContext} from 'react';
import { useParams } from "react-router";
import UsersContext from "../context/users";

export default function UserItem(){
  const { users, isLoadingUsers } = useContext(UsersContext);
  let params = useParams();
  const editableUser = users.find((user) => user.id === Number(params.id));
  // TODO: Render not found page if not found
  return <h1>{isLoadingUsers ? 'Loading...' : `${editableUser.firstname} ${editableUser.lastname}`}</h1>
}