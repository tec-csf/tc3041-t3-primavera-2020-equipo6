import React, { Component } from "react";
import ProyeccionDataService from "../services/proyeccion.service";
import { Link } from "react-router-dom";

export default class ProyeccionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPrecio = this.onChangeSearchPrecio.bind(this);
    this.retrieveProyeccions = this.retrieveProyeccions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProyeccion = this.setActiveProyeccion.bind(this);
    this.removeAllProyeccions = this.removeAllProyeccions.bind(this);
    this.searchPrecio = this.searchPrecio.bind(this);

    this.state = {
      proyeccions: [],
      currentActor: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveProyeccions();
  }

  onChangeSearchPrecio(e) {
    const searchPrecio = e.target.value;

    this.setState({
      searchPrecio: searchPrecio
    });
  }

  retrieveProyeccions() {
    ProyeccionDataService.getAll()
      .then(response => {
        this.setState({
          proyeccions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProyeccions();
    this.setState({
      currentProyeccion: null,
      currentIndex: -1
    });
  }

  setActiveProyeccion(proyeccion, index) {
    this.setState({
      currentProyeccion: proyeccion,
      currentIndex: index
    });
  }

  removeAllProyeccions() {
    return
    ProyeccionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchPrecio() {
    ProyeccionDataService.findByPrecio(this.state.searchPrecio)
      .then(response => {
        this.setState({
          proyeccions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPrecio, proyeccions, currentProyeccion, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Search by precio"
              value={searchPrecio}
              onChange={this.onChangeSearchPrecio}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPrecio}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Proyeccions List</h4>

          <ul className="list-group">
            {proyeccions &&
              proyeccions.map((proyeccion, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProyeccion(proyeccion, index)}
                  key={index}
                >
                  {proyeccion.precio}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addProyeccion">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Proyeccion
            </button>
          </Link>
          {currentProyeccion ? (
            <div>
              <h4>Proyeccion</h4>
              
              <div>
                <label>
                  <strong>Horario:</strong>
                </label>{" "}
                {currentProyeccion.horario}
              </div>
              <div>
                <label>
                  <strong>Precio:</strong>
                </label>{" "}
                {currentProyeccion.precio}
              </div>
              <div>
                <label>
                  <strong>Pelicula:</strong>
                </label>{" "}
                {currentProyeccion.id_pelicula}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentProyeccion.id}
              </div>

              <Link
                to={"/proyeccions/" + currentProyeccion.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Proyeccion...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}