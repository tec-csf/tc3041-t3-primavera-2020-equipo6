import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDirector from "./components/add-director.component";
import Director from "./components/director.component";
import DirectorsList from "./components/directors-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/directors" className="navbar-brand">
              Cartelera
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/directors"} className="nav-link">
                  Directors
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addDirector"} className="nav-link">
                  Add Director
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/directors"]} component={DirectorsList} />
              <Route exact path="/addDirector" component={AddDirector} />
              <Route path="/directors/:id" component={Director} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
