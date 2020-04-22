import React, { Component } from "react";
import ProyeccionDataService from "../services/proyeccion.service";

export default class AddProyeccion extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeHorario = this.onChangeHorario.bind(this);
    this.onChangePrecio = this.onChangePrecio.bind(this);
    this.onChangeId_Pelicula = this.onChangeId_Pelicula.bind(this);
    this.saveProyeccion = this.saveProyeccion.bind(this);
    this.newProyeccion = this.newProyeccion.bind(this);

    this.state = {
      id: null,
      horario: null,
      precio: null,
      id_pelicula: null,

      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }


  onChangeHorario(e) {
    this.setState({
      horario: e.target.value
    });
  }

  onChangePrecio(e) {
    this.setState({
      precio: e.target.value
    });
  }

  onChangeId_Pelicula(e) {
    this.setState({
      id_pelicula: e.target.value
    });
  }

  saveProyeccion() {
    var data = {
      id: this.state.id,
      horario: this.state.horario,
      precio: this.state.precio,
      id_pelicula: this.state.id_pelicula,
    };

    ProyeccionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          horario: response.data.horario,
          precio: response.data.precio,
          id_pelicula: response.data.id_pelicula,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProyeccion() {
    this.setState({
      id: null,
      horario: null,
      precio: null,
      id_pelicula: null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProyeccion}>
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
              <label htmlFor="horario">Horario</label>
              <input
                type="number"
                className="form-control"
                id="horario"
                required
                value={this.state.horario}
                onChange={this.onChangeHorario}
                name="horario"
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                required
                value={this.state.precio}
                onChange={this.onChangePrecio}
                name="precio"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="id_pelicula">Pelicula</label>
              <input
                type="number"
                className="form-control"
                id="id_pelicula"
                required
                value={this.state.id_pelicula}
                onChange={this.onChangeId_Pelicula}
                name="id_pelicula"
              />
            </div>

            <button onClick={this.saveProyeccion} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}