import React, { Component } from "react";
import ActorDataService from "../services/actor.service";
import { Link } from "react-router-dom";

export default class ActorsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveActors = this.retrieveActors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveActor = this.setActiveActor.bind(this);
    this.removeAllActors = this.removeAllActors.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      actors: [],
      currentActor: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveActors();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrieveActors() {
    ActorDataService.getAll()
      .then(response => {
        this.setState({
          actors: response.data
        });
        console.log(response.data);
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

  setActiveActor(actor, index) {
    this.setState({
      currentActor: actor,
      currentIndex: index
    });
  }

  removeAllActors() {
    return
    ActorDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    ActorDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          actors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, actors, currentActor, currentIndex } = this.state;

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
          <h4>Actors List</h4>

          <ul className="list-group">
            {actors &&
              actors.map((actor, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveActor(actor, index)}
                  key={index}
                >
                  {actor.nombre}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <Link to="/addActor">
            <button
              className="m-3 btn btn-sm btn-dark"
            >
              Add Actor
            </button>
          </Link>
          {currentActor ? (
            <div>
              <h4>Actor</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentActor.nombre}
              </div>
              <div>
                <label>
                  <strong>Edad:</strong>
                </label>{" "}
                {currentActor.edad}
              </div>
              <div>
                <label>
                  <strong>Pais:</strong>
                </label>{" "}
                {currentActor.pais}
              </div>
              <div>
                <label>
                  <strong>Amigos:</strong>
                </label>{" "}
                {currentActor.amigos.toString(currentActor.amigos)}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentActor.id}
              </div>

              <Link
                to={"/actors/" + currentActor.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on an Actor...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}