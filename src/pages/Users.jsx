import { useContext } from "react";
import UsersContext from "../context/users";
import UserList from '../components/List';
export default function Users(){
  const { users, isLoadingUsers } = useContext(UsersContext);
 
  // The purpose of this component should be to render
  return (
    <div>
      <header>
        <h1>User List</h1>
      </header>
      <section>
        {isLoadingUsers ? <p>Loading ... </p> : (
          <UserList 
            listData={users} 
          />
        )}
      </section>
    </div>
  )
}