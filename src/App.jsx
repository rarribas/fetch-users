import './App.scss'
import { useContext, useEffect } from "react";
import UsersContext from "./context/users"
import { Routes, Route } from "react-router";
import { AppRoutes } from './data/routes';

function App() {
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoutes = () =>
    AppRoutes.map((appRoute) =>
      appRoute.mainRoute ? (
        <Route key={appRoute.path} index element={appRoute.component} />
      ) : (
        <Route key={appRoute.path} path={appRoute.path} element={appRoute.component} />
      )
    );

  return (
    <Routes>
     {getRoutes()}
    </Routes>
  )
}

export default App
