import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import Login from './screens/authentication/login';
import PageNotFound from './screens/pageNotFound/pageNotFound';
import EditUser from './screens/users/editUser';
import Users from './screens/users/users';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users" component={(props) => <Users {...props} />} />
        <Route path="/users?page=:pagina" component={(props) => <Users {...props} />} />
        <Route exact path="/user/:id" component={(props) => <EditUser {...props} />} />
        <Route exact path="/" component={(props) => <Login {...props} />} />
        <Route component={(props) => <PageNotFound {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}