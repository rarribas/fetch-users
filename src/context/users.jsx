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

  const addUser = (userItem) => {
    const newUser = {
      id: users[users.length - 1].id + 1,
      firstname: userItem.firstname,
      lastname: userItem.lastname,
      email: userItem.email,
      birthDate: userItem.birthdate,
      company:{name: userItem.company, catchPhrase: '-', bs: '-'},
      address: {street: userItem.address, city: userItem.city},
    }

    setUsers([
      ...users,
      newUser
    ])
  }

  const valueToShare = {
    users,
    fetchUsers,
    addUser,
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