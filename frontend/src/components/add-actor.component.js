import React, { Component } from "react";
import ActorDataService from "../services/actor.service";

export default class AddActor extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeEdad = this.onChangeEdad.bind(this);
    this.onChangePais = this.onChangePais.bind(this);
    this.onChangeAmigos = this.onChangeAmigos.bind(this);
    this.saveActor = this.saveActor.bind(this);
    this.newActor = this.newActor.bind(this);

    this.state = {
      id: null,
      nombre: "",
      edad: null,
      pais:"",
      amigos:[],

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

  onChangeEdad(e) {
    this.setState({
      edad: e.target.value
    });
  }

  onChangePais(e) {
    this.setState({
      pais: e.target.value
    });
  }

  onChangeAmigos(e) {
    var amigos_str = e.target.value.split(",")
    var amigos_id = amigos_str.map(function (x) {
      return parseInt(x, 10);
    })
    this.setState({
      //amigos: e.target.value,
      amigos:amigos_id,
    });
  }

  saveActor() {
    var data = {
      id: this.state.id,
      nombre: this.state.nombre,
      edad: this.state.edad,
      pais: this.state.pais,
      amigos: this.state.amigos,
    };

    ActorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          edad: response.data.edad,
          pais: response.data.pais,
          amigos: response.data.amigos,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newActor() {
    this.setState({
      id: null,
      nombre: "",
      edad: null,
      pais: "",
      amigos: [],

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newActor}>
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
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                className="form-control"
                id="edad"
                required
                value={this.state.edad}
                onChange={this.onChangeEdad}
                name="edad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pais">Pais</label>
              <input
                type="text"
                className="form-control"
                id="pais"
                required
                value={this.state.pais}
                onChange={this.onChangePais}
                name="pais"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amigos">Amigos</label>
              <input
                type="text"
                className="form-control"
                id="amigos"
                required
                value={this.state.amigos}
                onChange={this.onChangeAmigos}
                name="amigos"
              />
            </div>

            <button onClick={this.saveActor} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}