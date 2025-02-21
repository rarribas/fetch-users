import { createContext } from "react";

const UsersContext = createContext();

function Provider({children}){
  const users = [{
    name: 'Clare Hughes',
    job: "Lawyer",
    country: "Colombia",
    age: "22",
    net_worth: "1800"
  }];

  const valueToShare = {
    users
  }

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  )
}

export { Provider }

export default UsersContext;