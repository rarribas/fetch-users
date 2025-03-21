import './App.scss'
import { useContext, useEffect } from "react";
import UsersContext from "./context/users"
import { getRoutes } from './data/routes';
import { Routes } from "react-router";

function App() {
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { fetchUsers } = usersContext;

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
     {getRoutes()}
    </Routes>
  )
}

export default App
