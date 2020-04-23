import React, { Component } from "react";
import ProyeccionDataService from "../services/proyeccion.service";

export default class Proyeccion extends Component {
  constructor(props) {
    super(props);
    this.onChangeHorario = this.onChangeHorario.bind(this);
    this.onChangePrecio = this.onChangePrecio.bind(this);
    this.onChangeId_Pelicula = this.onChangeId_Pelicula.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getProyeccion = this.getProyeccion.bind(this);
    this.updateProyeccion = this.updateProyeccion.bind(this);
    this.deleteProyeccion = this.deleteProyeccion.bind(this);

    this.state = {
      currentActor: {
        id: null,
        horario: null,
        precio: null,
        id_pelicula: null,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProyeccion(this.props.match.params.id);
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

  onChangeHorario(e) {
    const horario = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProyeccion: {
          ...prevState.currentProyeccion,
          horario: horario
        }
      };
    });
  }

  onChangePrecio(e) {
    const precio = e.target.value;

    this.setState(prevState => ({
      currentProyeccion: {
        ...prevState.currentProyeccion,
        precio: precio
      }
    }));
  }

  onChangeId_Pelicula(e) {
    const id_pelicula = e.target.value;

    this.setState(prevState => ({
      currentProyeccion: {
        ...prevState.currentProyeccion,
        id_pelicula: id_pelicula
      }
    }));
  }


  getProyeccion(id) {
    ProyeccionDataService.get(id)
      .then(response => {
        this.setState({
          currentProyeccion: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProyeccion() {
    ProyeccionDataService.update(
      this.state.currentProyeccion.id,
      this.state.currentProyeccion
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The proyeccion was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProyeccion() {
    ProyeccionDataService.delete(this.state.currentProyeccion.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/proyeccions')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProyeccion } = this.state;

    return (
      <div>
        {currentProyeccion ? (
          <div className="edit-form">
            <h4>Proyeccion</h4>
            <form>
              <div className="form-group">
                
              </div>
              <div className="form-group">
                <label htmlFor="horario">Horario</label>
                <input
                  type="number"
                  className="form-control"
                  id="horario"
                  value={currentProyeccion.horario}
                  onChange={this.onChangeHorario}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  value={currentProyeccion.precio}
                  onChange={this.onChangePrecio}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_pelicula">Pelicula</label>
                <input
                  type="number"
                  className="form-control"
                  id="id_pelicula"
                  value={currentProyeccion.id_pelicula}
                  onChange={this.onChangeId_Pelicula}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentProyeccion.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProyeccion}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProyeccion}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Proyeccion...</p>
            </div>
          )}
      </div>
    );
  }
}