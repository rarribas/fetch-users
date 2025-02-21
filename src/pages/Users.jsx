import { useContext } from "react";
import UsersContext from "../context/users";
import UserList from '../components/List';
import { useNavigate } from "react-router";
export default function Users(){
  const { users, isLoadingUsers } = useContext(UsersContext);
  const navigate = useNavigate();

  const onUserSelected = (userId) => {
    if(!userId) return;
    navigate(`/user/${userId}/view`)
    console.log(userId);
  }
  return (
    <div>
      <header>
        <h1>User List</h1>
      </header>
      <section>
        {isLoadingUsers ? <p>Loading ... </p> : <UserList listData={users} onItemClicked={onUserSelected}/>}
      </section>
    </div>
  )
}