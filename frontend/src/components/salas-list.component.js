import React, { Component } from "react";
import SalaDataService from "../services/Sala.service";
import { Link } from "react-router-dom";

export default class SalasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNumero = this.onChangeSearchNumero.bind(this);
    this.retrieveSalas = this.retrieveSalas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSala = this.setActiveSala.bind(this);
    this.removeAllSalas = this.removeAllSalas.bind(this);
    this.searchNumero = this.searchNumero.bind(this);

    this.state = {
      Salas: [],
      currentSala: null,
      currentIndex: -1,
      searchNumero: ""
    };
  }

  componentDidMount() {
    this.retrieveSalas();
  }

  onChangeSearchNumero(e) {
    const searchNumero = e.target.value;

    this.setState({
      searchNumero: searchNumero
    });
  }

  retrieveSalas() {
    SalaDataService.getAll()
      .then(response => {
        this.setState({
          Salas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSalas();
    this.setState({
      currentSala: null,
      currentIndex: -1
    });
  }

  setActiveSala(Sala, index) {
    this.setState({
      currentSala: Sala,
      currentIndex: index
    });
  }

  removeAllSalas() {
    return
    SalaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNumero() {
    SalaDataService.findByNumero(this.state.searchNumero)
      .then(response => {
        this.setState({
          Salas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNumero, Salas, currentSala, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Numero"
              value={searchNumero}
              onChange={this.onChangeSearchNumero}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNumero}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Salas List</h4>

          <ul className="list-group">
            {Salas &&
              Salas.map((Sala, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSala(Sala, index)}
                  key={index}
                >
                  {Sala.Numero}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addSala">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Sala
            </button>
          </Link>
          {currentSala ? (
            <div>
              <h4>Sala</h4>
              <div>
                <label>
                  <strong>Numero:</strong>
                </label>{" "}
                {currentSala.Numero}
              </div>
              <div>
                <label>
                  <strong>Asientos:</strong>
                </label>{" "}
                {currentSala.Asientos}
              </div>
              <div>
                <label>
                  <strong>Tipo:</strong>
                </label>{" "}
                {currentSala.Tipo}
              </div>
              <div>
                <label>
                  <strong>Id_proyeccion:</strong>
                </label>{" "}
                {currentSala.Id_proyeccion}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentSala.id}
              </div>

              <Link
                to={"/Salas/" + currentSala.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on an Sala...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
