import { createContext, useState } from "react";
import axios from 'axios';
import { useLocalStorage } from "../hooks/useLocalStorage";

const UsersContext = createContext();
 
function Provider({children}){
  const [users, setUsers] = useState([]);
  const [isErrorFetching, setIsErrorFetching] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const {getItem,setItem} = useLocalStorage('users');

  const fetchUsers = async ()  => {
    const savedUsers = getItem();
    if (savedUsers){
      setIsLoadingUsers(false);
      return setUsers(savedUsers);
    }
    try {
      const respose  = await axios.get("https://jsonplaceholder.org/users");
      setUsers(respose.data);
      setItem(respose.data);
      setIsErrorFetching(false);
    } catch (error) {
      setIsErrorFetching(true);
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
      address: {street: userItem.street, city: userItem.city},
    }

    const userToAdd = [
      ...users,
      newUser
    ];

    setUsers(userToAdd)
    setItem(userToAdd);
  }

  const editUser = (userItem) => {
    const usersToUpdate = users.map((user) => {
      if(user.id === userItem.id){
        return{
          ...user,
          birthDate: userItem.birthdate,
          email: userItem.email,
          firstname: userItem.firstname,
          lastname: userItem.lastname,
          company: {
            ...user.company,
            name: userItem.company
          },
          address: {
            ...user.address,
            street: userItem.street,
            city: userItem.city
          },
        }
      }
      return user;
    })

    setUsers(usersToUpdate);
    setItem(usersToUpdate);
  }

  const deleteUser = (userItem) => {
    const filteredUsers = users.filter((user) => user.id !== userItem.id);
    setUsers(filteredUsers);
    setItem(filteredUsers);
  }

  const valueToShare = {
    users,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
    isLoadingUsers,
    isErrorFetching,
  }

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  )
}

export { Provider }

export default UsersContext;