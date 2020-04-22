import React, { Component } from "react";
import SalaDataService from "../services/sala.service";

export default class AddSala extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeAsientos = this.onChangeAsientos.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeIDproyeccion = this.onChangeIDproyeccion.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.saveSala = this.saveSala.bind(this);
    this.newSala = this.newSala.bind(this);

    this.state = {
        id: null,
        numero: null,
        asientos: null,
        tipo:"",
        id_proyeccion: null,

      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangeNumero(e) {
    this.setState({
      numero: e.target.value
    });
  }

  onChangeAsientos(e) {
    this.setState({
      asientos: e.target.value
    });
  }

  onChangeTipo(e) {
    this.setState({
      tipo: e.target.value
    });
  }

  onChangeIDproyeccion(e) {
    this.setState({
      id_proyeccion: e.target.value
    });
  }

  saveSala() {
    var data = {
      id: this.state.id,
      numero: this.state.numero,
      asientos: this.state.asientos,
      tipo: this.state.tipo,
      id_proyeccion: this.state.id_proyeccion,
    };

    SalaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          numero: response.data.numero,
          asientos: response.data.asientos,
          tipo: response.data.tipo,
          id_proyeccion: response.data.id_proyeccion,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSala() {
    this.setState({
        id: null,
        numero: null,
        asientos: null,
        tipo:"",
        id_proyeccion: null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSala}>
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
              <label htmlFor="numero">Nombre</label>
              <input
                type="number"
                className="form-control"
                id="numero"
                required
                value={this.state.numero}
                onChange={this.onChangeNumero}
                name="numero"
              />
            </div>

            <div className="form-group">
              <label htmlFor="asientos">Edad</label>
              <input
                type="number"
                className="form-control"
                id="asientos"
                required
                value={this.state.asientos}
                onChange={this.onChangeAsientos}
                name="asientos"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Pais</label>
              <input
                type="text"
                className="form-control"
                id="tipo"
                required
                value={this.state.tipo}
                onChange={this.onChangeTipo}
                name="tipo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="id_proyeccion">Amigos</label>
              <input
                type="number"
                className="form-control"
                id="id_proyeccion"
                required
                value={this.state.id_proyeccion}
                onChange={this.onChangeIDproyeccion}
                name="id_poyeccion"
              />
            </div>

            <button onClick={this.saveSala} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
