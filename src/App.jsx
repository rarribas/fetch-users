import './App.css'
import { Routes, Route } from "react-router";
import AddUser from './pages/AddUser';
import UserItem from './pages/UserItem';
import Users from './pages/Users';
function App() {

  return (
    <Routes>
      <Route index element={<Users/>}></Route>
      <Route path="add-user" element={<AddUser/>}></Route>
      <Route path="user/:id/view" element={<UserItem/>}></Route>
    </Routes>
  )
}

export default App
