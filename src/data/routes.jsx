import Users from '../pages/Users';
import AddUser from '../pages/AddUser';
import UserItem from '../pages/UserItem';
import PageNotFound from '../pages/PageNotFound';

export const AppRoutes = [{
  mainRoute: true,
  path: "/",
  component: <Users/>,
},{
  mainRoute: false,
  path: "add-user",
  component: <AddUser/>,
},{
  mainRoute: false,
  path: "user/:id/view",
  component: <UserItem/>,
},{
  mainRoute: false,
  path: "/not-found",
  component: <PageNotFound/>,
},{
  mainRoute: false,
  path: "*",
  component: <PageNotFound/>,
}];