import React, { Component } from "react";
import SalaDataService from "../services/sala.service";

export default class Sala extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeAsientos = this.onChangeAsientos.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeIDproyeccion = this.onChangeIDproyeccion.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getSala = this.getSala.bind(this);
    this.updateSala = this.updateSala.bind(this);
    this.deleteSala = this.deleteSala.bind(this);

    this.state = {
      currentSala: {
        id: null,
        numero: null,
        asientos: null,
        tipo:"",
        id_proyeccion: null,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSala(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentSala: {
        ...prevState.currentSala,
        id: id
      }
    }));
  }

  onChangeNumero(e) {
    const numero = e.target.value;

    this.setState(prevState =>({
        currentSala: {
          ...prevState.currentSala,
          numero: numero
        }
    }));
  }

  onChangeAsientos(e) {
    const asientos = e.target.value;

    this.setState(prevState => ({
      currentSala: {
        ...prevState.currentSala,
        asientos: asientos
      }
    }));
  }

  onChangeTipo(e) {
    const tipo = e.target.value;

    this.setState(prevState => ({
      currentSala: {
        ...prevState.currentSala,
        tipo: tipo
      }
    }));
  }

  onChangeIDproyeccion(e) {
    const id_proyeccion = e.target.value;

    this.setState(prevState => ({
      currentSala: {
        ...prevState.currentSala,
        id_proyeccion: id_proyeccion
      }
    }));
  }

  getSala(id) {
    SalaDataService.get(id)
      .then(response => {
        this.setState({
          currentSala: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSala() {
    SalaDataService.update(
      this.state.currentSala.id,
      this.state.currentSala
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Sala was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSala() {
    SalaDataService.delete(this.state.currentSala.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/salas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSala } = this.state;

    return (
      <div>
        {currentSala ? (
          <div className="edit-form">
            <h4>Sala</h4>
            <form>
              <div className="form-group">
                <label htmlFor="numero">Numero</label>
                <input
                  type="text"
                  className="form-control"
                  id="numero"
                  value={currentSala.numero}
                  onChange={this.onChangeNumero}
                />
              </div>
              <div className="form-group">
                <label htmlFor="asientos">Asientos</label>
                <input
                  type="number"
                  className="form-control"
                  id="asientos"
                  value={currentSala.asientos}
                  onChange={this.onChangeAsientos}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo"
                  value={currentSala.tipo}
                  onChange={this.onChangeTipo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amigos">id_proyeccion</label>
                <input
                  type="number"
                  className="form-control"
                  id="id_proyeccion"
                  value={currentSala.id_proyeccion}
                  onChange={this.onChangeIDproyeccion}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentSala.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSala}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSala}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on an Sala...</p>
            </div>
          )}
      </div>
    );
  }
}
