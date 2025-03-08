import './App.scss'
import { useContext, useEffect } from "react";
import UsersContext from "./context/users"
import { getRoutes } from './data/routes';
import { Routes } from "react-router";

function App() {
  const { fetchUsers } = useContext(UsersContext);

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
