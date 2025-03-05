import { useContext } from "react";
import UsersContext from "../context/users";
import UserList from '../components/List';
import { useNavigate } from "react-router";
import { Link } from 'react-router';
export default function Users(){
  const { users, isLoadingUsers } = useContext(UsersContext);
  const navigate = useNavigate();

  const onUserSelected = (userId) => {
    // TODO: Add not found page
    if(!userId) return;
    navigate(`/user/${userId}/view`)
  }
  
  // TODO: Move actions prop to be rendered inside UserList
  // TODO: On userSelected belongs to UserList component
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
            onItemClicked={onUserSelected} 
            actions={<Link to="/add-user"> Add New User</Link>}
          />
        )}
      </section>
    </div>
  )
}