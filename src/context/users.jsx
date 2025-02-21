import { createContext, useState } from "react";
import axios from 'axios';

const UsersContext = createContext();

function Provider({children}){
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const fetchUsers = async ()  => {
    try {
      const respose  = await axios.get("https://jsonplaceholder.org/users");
      setUsers(respose.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUsers(false);
    }
  }

  const valueToShare = {
    users,
    fetchUsers,
    isLoadingUsers
  }

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  )
}

export { Provider }

export default UsersContext;