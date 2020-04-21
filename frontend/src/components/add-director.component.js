import React, { Component } from "react";
import DirectorDataService from "../services/director.service";

export default class AddDirector extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.saveDirector = this.saveDirector.bind(this);
    this.newDirector = this.newDirector.bind(this);

    this.state = {
      id: null,
      nombre: "",
      titulo: "",

      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  saveDirector() {
    var data = {
      id: this.state.id,
      nombre: this.state.nombre,
      titulo: this.state.titulo
    };

    DirectorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          titulo: response.data.titulo,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDirector() {
    this.setState({
      id: null,
      nombre: "",
      titulo: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newDirector}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="number"
                className="form-control"
                id="id"
                required
                value={this.state.id}
                onChange={this.onChangeId}
                name="id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="titulo">Titulo</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                required
                value={this.state.titulo}
                onChange={this.onChangeTitulo}
                name="titulo"
              />
            </div>

            <button onClick={this.saveDirector} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}