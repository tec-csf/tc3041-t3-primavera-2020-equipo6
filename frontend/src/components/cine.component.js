import React, { Component } from "react";
import CineDataService from "../services/actor.service";

export default class Cine extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangePais = this.onChangeCoordenadas.bind(this);
    this.onChangeIDsala = this.onChangeIDsala.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getCine = this.getCine.bind(this);
    this.updateCine = this.updateCine.bind(this);
    this.deleteCine = this.deleteCine.bind(this);

    this.state = {
      currentCine: {
        id: null,
        nombre: "",
        coordenadas: {
          type: "point",
          coordenadas: []
        },
        id_sala:[],
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCine(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentCine: {
        ...prevState.currentCine,
        id: id
      }
    }));
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCine: {
          ...prevState.currentCine,
          nombre: nombre
        }
      };
    });
  }


  onChangeCoordenadas(e) {
    const coordenadas = e.target.value;
    var coordenadas = coordenadas.split(",");
    var coordenadas = coordenadas.map(function (x) { 
        return parseInt(x, 10); 
      });

    this.setState(prevState => ({
      currentCine: {
        ...prevState.currentCine,
        coordenadas: coordenadas,
      }
    }));
  }

  onChangeIDsala(e) {
    const id_sala = e.target.value;
    var id_sala_str = id_sala.split(",");
    var id_sala_id = id_sala_str.map(function (x) { 
        return parseInt(x, 10); 
      });

    this.setState(prevState => ({
      currentCine: {
        ...prevState.currentCine,
        id_sala: id_sala_id,
      }
    }));
  }

  getCine(id) {
    CineDataService.get(id)
      .then(response => {
        this.setState({
          currentCine: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCine() {
    CineDataService.update(
      this.state.currentCine.id,
      this.state.currentCine
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cine was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCine() {
    CineDataService.delete(this.state.currentCine.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cines')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCine } = this.state;

    return (
      <div>
        {currentCine ? (
          <div className="edit-form">
            <h4>Cine</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentCine.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="coordenadas">Edad</label>
                <input
                  type="text"
                  className="form-control"
                  id="coordenadas"
                  value={currentCine.coordenadas}
                  onChange={this.onChangeCoordenadas}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_sala">IDsala</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_sala"
                  value={currentCine.id_sala}
                  onChange={this.onChangeIDsala}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentCine.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCine}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCine}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on an Cine...</p>
            </div>
          )}
      </div>
    );
  }
}
