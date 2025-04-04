import { useContext } from "react";
import UsersContext from "../context/users";
import UserList from '../components/List';

export default function Users(){
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { users, isLoadingUsers, isErrorFetching } = usersContext;
 
  // The purpose of this component should be to render
  return (
    <div>
      <header>
        <h1>User List</h1>
      </header>
      <section>
        {isLoadingUsers ? <p className="is-loading">Loading ... </p> :
         isErrorFetching ? <p className="is-error">Upps... Something went wrong, try to refresh the page or try again later.</p> : (
          <UserList 
            listData={users} 
          />
        )}
      </section>
    </div>
  )
}