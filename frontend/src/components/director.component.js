import React, { Component } from "react";
import DirectorDataService from "../services/director.service";

export default class Director extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getDirector = this.getDirector.bind(this);
    this.updateDirector = this.updateDirector.bind(this);
    this.deleteDirector = this.deleteDirector.bind(this);

    this.state = {
      currentDirector: {
        id: null,
        nombre: "",
        titulo: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDirector(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentDirector: {
        ...prevState.currentDirector,
        id: id
      }
    }));
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDirector: {
          ...prevState.currentDirector,
          nombre: nombre
        }
      };
    });
  }

  onChangeTitulo(e) {
    const titulo = e.target.value;

    this.setState(prevState => ({
      currentDirector: {
        ...prevState.currentDirector,
        titulo: titulo
      }
    }));
  }

  getDirector(id) {
    DirectorDataService.get(id)
      .then(response => {
        this.setState({
          currentDirector: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDirector() {
    DirectorDataService.update(
      this.state.currentDirector.id,
      this.state.currentDirector
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The director was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDirector() {
    DirectorDataService.delete(this.state.currentDirector.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/directors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDirector } = this.state;

    return (
      <div>
        {currentDirector ? (
          <div className="edit-form">
            <h4>Director</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentDirector.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={currentDirector.titulo}
                  onChange={this.onChangeTitulo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentDirector.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDirector}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDirector}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Director...</p>
            </div>
          )}
      </div>
    );
  }
}