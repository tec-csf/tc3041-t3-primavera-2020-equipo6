import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";
import { Link } from "react-router-dom";

export default class PeliculasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrievePeliculas = this.retrievePeliculas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePelicula = this.setActivePelicula.bind(this);
    this.removeAllPeliculas = this.removeAllPeliculas.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      peliculas: [],
      currentPelicula: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrievePeliculas();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrievePeliculas() {
    PeliculaDataService.getAll()
      .then(response => {
        this.setState({
          peliculas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePeliculas();
    this.setState({
      currentPelicula: null,
      currentIndex: -1
    });
  }

  setActivePelicula(pelicula, index) {
    this.setState({
      currentPelicula: pelicula,
      currentIndex: index
    });
  }

  removeAllPeliculas() {
    return
    PeliculaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    PeliculaDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          peliculas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, peliculas, currentPelicula, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by nombre"
              value={searchNombre}
              onChange={this.onChangeSearchNombre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNombre}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Peliculas List</h4>

          <ul className="list-group">
            {peliculas &&
              peliculas.map((pelicula, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePelicula(pelicula, index)}
                  key={index}
                >
                  {pelicula.nombre}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addPelicula">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Pelicula
            </button>
          </Link>
          {currentPelicula ? (
            <div>
              <h4>Pelicula</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentPelicula.nombre}
              </div>
              <div>
                <label>
                  <strong>Año:</strong>
                </label>{" "}
                {currentPelicula.ano}
              </div>
              <div>
                <label>
                  <strong>Estilo:</strong>
                </label>{" "}
                {currentPelicula.estilo}
              </div>
              <div>
                <label>
                  <strong>Director:</strong>
                </label>{" "}
                {currentPelicula.id_director}
              </div>
              <div>
                <label>
                  <strong>Actores:</strong>
                </label>{" "}
                {currentPelicula.id_actor.toString(currentPelicula.id_actor)}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentPelicula.id}
              </div>

              <Link
                to={"/peliculas/" + currentPelicula.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Pelicula...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}