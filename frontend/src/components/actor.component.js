import React, { Component } from "react";
import ActorDataService from "../services/actor.service";

export default class Actor extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeEdad = this.onChangeEdad.bind(this);
    this.onChangePais = this.onChangePais.bind(this);
    this.onChangeAmigos = this.onChangeAmigos.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getActor = this.getActor.bind(this);
    this.updateActor = this.updateActor.bind(this);
    this.deleteActor = this.deleteActor.bind(this);

    this.state = {
      currentDirector: {
        id: null,
        nombre: "",
        edad: null,
        pais:"",
        amigos:[],
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getActor(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentActor: {
        ...prevState.currentActor,
        id: id
      }
    }));
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentActor: {
          ...prevState.currentActor,
          nombre: nombre
        }
      };
    });
  }

  onChangeEdad(e) {
    const edad = e.target.value;

    this.setState(prevState => ({
      currentActor: {
        ...prevState.currentActor,
        edad: edad
      }
    }));
  }

  onChangePais(e) {
    const pais = e.target.value;

    this.setState(prevState => ({
      currentActor: {
        ...prevState.currentActor,
        pais: pais
      }
    }));
  }

  onChangeAmigos(e) {
    const amigos = e.target.value;
    var amigos_str = amigos.split(",");
    var amigos_id = amigos_str.map(function (x) { 
        return parseInt(x, 10); 
      });

    this.setState(prevState => ({
      currentActor: {
        ...prevState.currentActor,
        amigos: amigos_id,
      }
    }));
  }

  getActor(id) {
    ActorDataService.get(id)
      .then(response => {
        this.setState({
          currentActor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActor() {
    ActorDataService.update(
      this.state.currentActor.id,
      this.state.currentActor
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The actor was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteActor() {
    ActorDataService.delete(this.state.currentActor.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/actors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentActor } = this.state;

    return (
      <div>
        {currentActor ? (
          <div className="edit-form">
            <h4>Actor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentActor.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input
                  type="number"
                  className="form-control"
                  id="edad"
                  value={currentActor.edad}
                  onChange={this.onChangeEdad}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pais">Pais</label>
                <input
                  type="text"
                  className="form-control"
                  id="pais"
                  value={currentActor.pais}
                  onChange={this.onChangePais}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amigos">Amigos</label>
                <input
                  type="text"
                  className="form-control"
                  id="amigos"
                  value={currentActor.amigos}
                  onChange={this.onChangeAmigos}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentActor.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteActor}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateActor}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on an Actor...</p>
            </div>
          )}
      </div>
    );
  }
}