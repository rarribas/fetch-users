import Users from '../pages/Users';
import AddUser from '../pages/AddUser';
import UserItem from '../pages/UserItem';
import PageNotFound from '../pages/PageNotFound';
import { Route } from "react-router";

export interface AppRoutesI {
  mainRoute: boolean;
  path: string;
  component: React.ReactElement;
}

const AppRoutes:AppRoutesI[] = [{
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

export const getRoutes = () =>
  AppRoutes.map((appRoute) =>
    appRoute.mainRoute ? (
      <Route key={appRoute.path} index element={appRoute.component} />
    ) : (
      <Route key={appRoute.path} path={appRoute.path} element={appRoute.component} />
    )
  );