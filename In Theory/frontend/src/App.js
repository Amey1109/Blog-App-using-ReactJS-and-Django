import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import MyBlogs from "./components/MyBlogs";


function App() {
  return (
    <div style={{height:"100vh"}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/MyBlogs" component={MyBlogs} />
          <Route exact path="/logIn" component={Login} />
          <Route exact path="/signUp" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
