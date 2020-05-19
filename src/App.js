import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Navbar1 from "./components/Navbar";
import "primeflex/primeflex.css";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import Login from "./components/Login";
import D3Chart from "./components/D3Chart";
import D3Chart1 from "./components/D3Chart1";


class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Fragment>
             <Navbar1/>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/Component1' component={Component1} />
              <Route exact path='/Component2' component={Component2} />
              <Route exact path='/Component3' component={Component3} />
              <Route exact path='/d3chart' component={D3Chart} />
              <Route exact path='/d3chart1' component={D3Chart1} />
              <Route exact path='/navbar' component={Navbar1} />
              <Route exact path='/**' render={()=><Redirect to="/home"/>} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App

{/* <Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */}