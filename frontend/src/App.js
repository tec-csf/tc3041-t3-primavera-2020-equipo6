import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddActor from "./components/add-actor.component";
import AddCine from "./components/add-cine.component";
import AddDirector from "./components/add-director.component";
import AddPelicula from "./components/add-pelicula.component";
import AddProyeccion from "./components/add-proyeccion.component";
import AddSala from "./components/add-sala.component";

import Actor from "./components/actor.component";
import Cine from "./components/cine.component";
import Director from "./components/director.component";
import Pelicula from "./components/pelicula.component";
import Proyeccion from "./components/proyeccion.component";
import Sala from "./components/sala.component";

import ActorsList from "./components/actors-list.component";
import CinesList from "./components/cines-list.component";
import DirectorsList from "./components/directors-list.component";
import PeliculasList from "./components/peliculas-list.component";
import ProyeccionsList from "./components/proyeccions-list.component";
import SalasList from "./components/salas-list.component";
import Aggregate from "./components/aggregate.component";

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
                  Director
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/actors"} className="nav-link">
                  Actor
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/peliculas"} className="nav-link">
                  Pelicula
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/proyeccions"} className="nav-link">
                  Proyeccion
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/salas"} className="nav-link">
                  Sala
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cines"} className="nav-link">
                  Cine
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/aggregates"} className="nav-link">
                  Aggregate
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/directors"]} component={DirectorsList} />
              <Route exact path="/actors" component={ActorsList} />
              <Route exact path="/peliculas" component={PeliculasList} />
              <Route exact path="/proyeccions" component={ProyeccionsList} />
              <Route exact path="/salas" component={SalasList} />
              <Route exact path="/cines" component={CinesList} />
              <Route exact path="/aggregates" component={Aggregate} />
              
              <Route exact path="/addDirector" component={AddDirector} />
              <Route exact path="/addActor" component={AddActor} />
              <Route exact path="/addPelicula" component={AddPelicula} />
              <Route exact path="/addProyeccion" component={AddProyeccion} />
              <Route exact path="/addSala" component={AddSala} />
              <Route exact path="/addCine" component={AddCine} />

              <Route path="/directors/:id" component={Director} />
              <Route path="/actors/:id" component={Actor} />
              <Route path="/peliculas/:id" component={Pelicula} />
              <Route path="/proyeccions/:id" component={Proyeccion} />
              <Route path="/salas/:id" component={Sala} />
              <Route path="/cines/:id" component={Cine} />
              
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
