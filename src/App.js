import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./services/auth";
import AuthContext from './services/auth';
import Login from './views/login';
import MyTasks from "./views/myTasks";
import NotFound from "./views/404";
import './App.css';

function App() {
  const loggedUser = useContext(AuthContext);
  return (
  <AuthProvider>
    <Router>
      <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/mytasks" component={MyTasks} />
          <Route default component={NotFound} />
      </Switch>
    </Router>
  </AuthProvider>
  );
}

export default App;