import React, { Component } from "react";
import CineDataService from "../services/cine.service";

export default class AddCine extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeCoordenadas = this.onChangeCoordenadas.bind(this);
    this.onChangeIDsala = this.onChangeIDsala.bind(this);
    this.saveCine = this.saveCine.bind(this);
    this.newCine = this.newCine.bind(this);

    this.state = {
      id: null,
      nombre: "",
      ubicacion: {
          type: "point",
          coordinates:[],
      },
      id_sala:[],

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

  onChangeCoordenadas(e) {
    var coordinates_str = e.target.value.split(",")
    var coordinates_id = coordinates_str.map(function (x) {
      return parseInt(x, 10);
    })
    this.setState({
      //id_sala: e.target.value,
      coordinates:coordinates_id,
    });
  }

  onChangeIDsala(e) {
    var id_sala_str = e.target.value.split(",")
    var id_sala_id = id_sala_str.map(function (x) {
      return parseInt(x, 10);
    })
    this.setState({
      //id_sala: e.target.value,
      id_sala:id_sala_id,
    });
  }

  saveCine() {
    var data = {
      id: this.state.id,
      nombre: this.state.nombre,
      coordinates: this.state.coordinates,
      id_sala: this.state.id_sala,
    };

    CineDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          coordinates: response.data.coordinates,
          id_sala: response.data.id_sala,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCine() {
    this.setState({
        id: null,
        nombre: "",
        ubicacion: {
            type: "point",
            coordinates: [],
        },
        id_sala:[],
  

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCine}>
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
              <label htmlFor="coordinates">IDsala</label>
              <input
                type="text"
                className="form-control"
                id="coordinates"
                required
                value={this.state.coordinates}
                onChange={this.onChangeCoordenadas}
                name="coordinates"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="id_sala">IDsala</label>
              <input
                type="text"
                className="form-control"
                id="id_sala"
                required
                value={this.state.id_sala}
                onChange={this.onChangeIDsala}
                name="id_sala"
              />
            </div>

            <button onClick={this.saveCine} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
