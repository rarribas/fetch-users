import './App.css'
import { useContext, useEffect } from "react";
import UsersContext from "./context/users"
import { Routes, Route } from "react-router";
import AddUser from './pages/AddUser';
import UserItem from './pages/UserItem';
import Users from './pages/Users';
function App() {
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<Users/>}></Route>
      <Route path="add-user" element={<AddUser/>}></Route>
      <Route path="user/:id/view" element={<UserItem/>}></Route>
    </Routes>
  )
}

export default App
