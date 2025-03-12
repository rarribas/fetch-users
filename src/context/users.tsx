import { createContext, useState, ReactNode } from "react";
import axios from 'axios';
// TODO: COnvert this to TS file
import { useLocalStorage } from "../hooks/useLocalStorage";
import {UserI, SimpleUserI} from '../types/user';

interface ProviderProps {
  children: ReactNode;
}

interface UsersContextType {
  users: UserI[];
  fetchUsers: () => void;
  addUser:(userItem:SimpleUserI) => void;
  editUser:(userItem:SimpleUserI) => void;
  deleteUser:(userItem:SimpleUserI) => void;
  isLoadingUsers: boolean;
  isErrorFetching: boolean;
}

const UsersContext = createContext<UsersContextType | null>(null);
 
function Provider({children}:ProviderProps){
  const [users, setUsers] = useState<UserI[]>([]); 
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
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

  const addUser = (userItem:SimpleUserI) => {
    const lastUser = users.length > 0 ? users[users.length - 1] : undefined;
    const newUser:UserI = {
      id: lastUser && lastUser.id ? lastUser.id + 1 : 0,
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

  const editUser = (userItem:SimpleUserI) => {
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

  const deleteUser = (userItem:SimpleUserI) => {
    const filteredUsers = users.filter((user) => user.id !== userItem.id);
    setUsers(filteredUsers);
    setItem(filteredUsers);
  }

  const valueToShare:UsersContextType = {
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