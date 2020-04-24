import React, { Component } from "react";
import AggregateDataService from "../services/aggregate.service";
import { Link } from "react-router-dom";

export default class ActorsList extends Component {
  constructor(props) {
    super(props);

    this.getSocialNetwork = this.getSocialNetwork.bind(this);
    this.getFacet = this.getFacet.bind(this);
    this.getNation = this.getNation.bind(this);
    this.getMoviesByActor = this.getMoviesByActor.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.onChangeSearchPais = this.onChangeSearchPais.bind(this);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.onChangeSearchLongitud = this.onChangeSearchLongitud.bind(this);
    this.onChangeSearchLatitud = this.onChangeSearchLatitud.bind(this);
    this.state = {
      results: [],
      currentResult: null,
      currentIndex: -1,
      currentAggregation: -1,
      searchPais: "",
      searchNombre: "",
      searchLongitud: null,
      searchLatitud: null
    };
  }

  componentDidMount() {
    //this.retrieveActors();
  }

  onChangeSearchPais(e) {
    const searchPais = e.target.value;

    this.setState({
      searchPais: searchPais
    });
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  onChangeSearchLongitud(e) {
    var longitud = e.target.value

    this.setState({
      searchLongitud: longitud
    });
  }

  onChangeSearchLatitud(e) {
    var latitud = e.target.value

    this.setState({
      searchLatitud: latitud
    });
  }

  getSocialNetwork() {
    AggregateDataService.socialNetwork()
      .then(response => {
        this.setState({
          results: response.data,
          currentAggregation: 0,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFacet() {
    AggregateDataService.facet()
      .then(response => {
        console.log(response.data)
        this.setState({
          results: response.data,
          currentAggregation: 1,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getNation() {
    AggregateDataService.nation(this.state.searchPais)
      .then(response => {
        this.setState({
          results: response.data,
          currentAggregation: 2,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getMoviesByActor() {
    AggregateDataService.moviesByActor(this.state.searchNombre)
      .then(response => {
        console.log(response)
        this.setState({
          results: response.data,
          currentAggregation: 3,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getLocation() {
    AggregateDataService.location(this.state.searchLongitud, this.state.searchLatitud)
      .then(response => {
        this.setState({
          results: response.data,
          currentAggregation: 4,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveActors();
    this.setState({
      currentActor: null,
      currentIndex: -1
    });
  }

  setActiveResult(element, index) {
    this.setState({
      currentResult: element,
      currentIndex: index
    });
  }

  render() {
    const {
      results,
      currentResult,
      currentIndex,
      currentAggregation,
      searchPais,
      searchNombre,
      searchLongitud,
      searchLatitud
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="list row">
            <div className="input-group mb-3">
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.getSocialNetwork}
                >
                  Social Network
                </button>
              </div>
            </div>
          </div>

          <div className="list row">
            <div className="input-group mb-3">
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.getFacet}
                >
                  Facet
                </button>
              </div>
            </div>
          </div>

          <div className="list row">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by pais"
                value={searchPais}
                onChange={this.onChangeSearchPais}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.getNation}
                >
                  Search Pais
                </button>
              </div>
            </div>
          </div>

          <div className="list row">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by actor"
                value={searchNombre}
                onChange={this.onChangeSearchNombre}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.getMoviesByActor}
                >
                  Search Actor
                </button>
              </div>
            </div>
          </div>

          <div className="list row">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Longitud"
                value={searchLongitud}
                onChange={this.onChangeSearchLongitud}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Latitud"
                value={searchLatitud}
                onChange={this.onChangeSearchLatitud}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.getLocation}
                >
                  Search by location
                </button>
              </div>
            </div>
          </div>
        </div>

        {currentAggregation == 0 ? (
          [<div className="col-md-4">
            <h4>Social Network</h4>
            <ul className="list-group">
              {results &&
                results.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index)}
                    key={index}
                  >
                    {result.nombre}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-4">
            {currentResult && currentResult.red ? (
              <div>
                <h4>Actor</h4>
                <div>
                  <label>
                    <strong>Nombre:</strong>
                  </label>{" "}
                  {currentResult.nombre}
                </div>
                <div>
                  <label>
                    <strong>Red social:</strong>
                  </label>{" "}
                  {currentResult.red.toString()}
                </div>
              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a result...</p>
                </div>
              )}
          </div>]
        ) : (<div></div>)}

        {currentAggregation == 1 ? (
          [<div className="col-md-3">
            <h4>Por estilo</h4>
            <ul className="list-group">
              {results[0] && results[0].porEstilo &&
                results[0].porEstilo.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index + "a" === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index + "a")}
                    key={index}
                  >
                    {result._id}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-3">
            <h4>Por estudios del director</h4>
            <ul className="list-group">
              {results[0] && results[0].porEstilo &&
                results[0].porEstudiosDeDirector.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index + "b" === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index + "b")}
                    key={index}
                  >
                    {result._id}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-3">
            {currentResult ? (
              <div>
                <h4>Resultados</h4>
                <div>
                  <label>
                    <strong>Nombre:</strong>
                  </label>{" "}
                  {currentResult._id}
                </div>
                <div>
                  <label>
                    <strong>Peliculas:</strong>
                  </label>{" "}
                  {currentResult.nombre.toString()}
                </div>
              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a result...</p>
                </div>
              )}
          </div>,
          ]
        ) : (<div></div>)}

        {currentAggregation == 2 ? (
          [<div className="col-md-4">
            <h4>Peliculas por pais de actor</h4>
            <ul className="list-group">
              {results &&
                results.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index)}
                    key={index}
                  >
                    {result.nombre}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-4">
            {currentResult ? (
              <div>
                <h4>Peliculas</h4>
                <div>
                  <label>
                    <strong>Nombre:</strong>
                  </label>{" "}
                  {currentResult.nombre}
                </div>
              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a result...</p>
                </div>
              )}
          </div>]
        ) : (<div></div>)}

        {currentAggregation == 3 ? (
          [<div className="col-md-4">
            <h4>Peliculas por actor</h4>
            <ul className="list-group">
              {results &&
                results.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index)}
                    key={index}
                  >
                    {result.nombre}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-4">
            {currentResult ? (
              <div>
                <h4>Peliculas</h4>
                <div>
                  <label>
                    <strong>Nombre:</strong>
                  </label>{" "}
                  {currentResult.nombre}
                </div>
                <div>
                  <label>
                    <strong>Peliculas:</strong>
                  </label>{" "}
                  {currentResult.peliculas.toString()}
                </div>
              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a result...</p>
                </div>
              )}
          </div>]
        ) : (<div></div>)}
        {currentAggregation == 4 ? (
          [<div className="col-md-4">
            <h4>GeoNear</h4>
            <ul className="list-group">
              {results &&
                results.map((result, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResult(result, index)}
                    key={index}
                  >
                    {result.cine}
                  </li>
                ))}
            </ul>
          </div>,
          <div className="col-md-4">
            {currentResult ? (
              <div>
                <h4>Funciones</h4>
                <div>
                  <label>
                    <strong>Cine:</strong>
                  </label>{" "}
                  {currentResult.cine}
                </div>
                <div>
                  <label>
                    <strong>Pelicula:</strong>
                  </label>{" "}
                  {currentResult.nombre}
                </div>
                <div>
                  <label>
                    <strong>Horario:</strong>
                  </label>{" "}
                  {currentResult.horario}
                </div>
                <div>
                  <label>
                    <strong>Numero de sala:</strong>
                  </label>{" "}
                  {currentResult.sala}
                </div>
                <div>
                  <label>
                    <strong>Numero de asientos:</strong>
                  </label>{" "}
                  {currentResult.asientos}
                </div>
                <div>
                  <label>
                    <strong>Tipo de sala:</strong>
                  </label>{" "}
                  {currentResult.tipo}
                </div>
                <div>
                  <label>
                    <strong>Precio:</strong>
                  </label>{" "}
                  {currentResult.precio}
                </div>

              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a result...</p>
                </div>
              )}
          </div>]
        ) : (<div></div>)}

      </div>
    );
  }
}