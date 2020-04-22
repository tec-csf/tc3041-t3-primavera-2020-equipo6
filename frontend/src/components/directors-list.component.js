import React, { Component } from "react";
import DirectorDataService from "../services/director.service";
import { Link } from "react-router-dom";

export default class DirectorsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveDirectors = this.retrieveDirectors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDirector = this.setActiveDirector.bind(this);
    this.removeAllDirectors = this.removeAllDirectors.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      directors: [],
      currentDirector: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveDirectors();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrieveDirectors() {
    DirectorDataService.getAll()
      .then(response => {
        this.setState({
          directors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDirectors();
    this.setState({
      currentDirector: null,
      currentIndex: -1
    });
  }

  setActiveDirector(director, index) {
    this.setState({
      currentDirector: director,
      currentIndex: index
    });
  }

  removeAllDirectors() {
    return
    DirectorDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    DirectorDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          directors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, directors, currentDirector, currentIndex } = this.state;

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
          <h4>Directors List</h4>

          <ul className="list-group">
            {directors &&
              directors.map((director, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDirector(director, index)}
                  key={index}
                >
                  {director.nombre}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addDirector">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Director
            </button>
          </Link>
          {currentDirector ? (
            <div>
              <h4>Director</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentDirector.nombre}
              </div>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {currentDirector.titulo}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentDirector.id}
              </div>

              <Link
                to={"/directors/" + currentDirector.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Director...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}