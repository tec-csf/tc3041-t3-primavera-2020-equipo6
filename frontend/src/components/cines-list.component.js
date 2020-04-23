import React, { Component } from "react";
import CineDataService from "../services/cine.service";
import { Link } from "react-router-dom";

export default class CinesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveCines = this.retrieveCines.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCine = this.setActiveCine.bind(this);
    this.removeAllCines = this.removeAllCines.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      cines: [],
      currentCine: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveCines();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrieveCines() {
    CineDataService.getAll()
      .then(response => {
        this.setState({
          cines: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCines();
    this.setState({
      currentCine: null,
      currentIndex: -1
    });
  }

  setActiveCine(cine, index) {
    this.setState({
      currentCine: cine,
      currentIndex: index
    });
  }

  removeAllCines() {
    return
    CineDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    CineDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          cines: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, cines, currentCine, currentIndex } = this.state;

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
          <h4>Cines List</h4>

          <ul className="list-group">
            {cines &&
              cines.map((cine, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCine(cine, index)}
                  key={index}
                >
                  {cine.nombre}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addCine">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Cine
            </button>
          </Link>
          {currentCine ? (
            <div>
              <h4>Cine</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentCine.nombre}
              </div>
              <div>
                <label>
                  <strong>Coordinates:</strong>
                </label>{" "}
                {currentCine.coordinates.toString(currentCine.coordinates)}
              </div>
              <div>
                <label>
                  <strong>Id_sala:</strong>
                </label>{" "}
                {currentCine.id_sala.toString(currentCine.id_sala)}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentCine.id}
              </div>

              <Link
                to={"/cines/" + currentCine.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on an Cine...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
