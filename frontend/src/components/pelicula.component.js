import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";

export default class Pelicula extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeAno = this.onChangeAno.bind(this);
    this.onChangeEstilo = this.onChangeEstilo.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeActor = this.onChangeActor.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getPelicula = this.getPelicula.bind(this);
    this.updatePelicula = this.updatePelicula.bind(this);
    this.deletePelicula = this.deletePelicula.bind(this);

    this.state = {
      currentPelicula: {
        id: null,
        nombre: "",
        ano: null,
        estilo:"",
        director:null,
        actor:[],
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPelicula(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        id: id
      }
    }));
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPelicula: {
          ...prevState.currentPelicula,
          nombre: nombre
        }
      };
    });
  }

  onChangeAno(e) {
    const ano = e.target.value;

    this.setState(prevState => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        ano: ano
      }
    }));
  }

  onChangeEstilo(e) {
    const estilo = e.target.value;

    this.setState(prevState => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        estilo: estilo
      }
    }));
  }

  onChangeDirector(e) {
    const director = e.target.value;

    this.setState(prevState => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        director: director
      }
    }));
  }


  onChangeActor(e) {
    const actor = e.target.value;
    var actor_str = actor.split(",");
    var actor_id = actor_str.map(function (x) { 
        return parseInt(x, 10); 
      });

    this.setState(prevState => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        actor: actor_id,
      }
    }));
  }

  getPelicula(id) {
    PeliculaDataService.get(id)
      .then(response => {
        this.setState({
          currentPelicula: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePelicula() {
    PeliculaDataService.update(
      this.state.currentPelicula.id,
      this.state.currentPelicula
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The movie was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePelicula() {
    PeliculaDataService.delete(this.state.currentPelicula.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/peliculas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPelicula } = this.state;

    return (
      <div>
        {currentPelicula ? (
          <div className="edit-form">
            <h4>Pelicula</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentPelicula.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ano">Año</label>
                <input
                  type="number"
                  className="form-control"
                  id="ano"
                  value={currentPelicula.ano}
                  onChange={this.onChangeAno}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estilo">Estilo</label>
                <input
                  type="text"
                  className="form-control"
                  id="estilo"
                  value={currentPelicula.estilo}
                  onChange={this.onChangeEstilo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="director">Director</label>
                <input
                  type="number"
                  className="form-control"
                  id="director"
                  value={currentPelicula.id_director}
                  onChange={this.onChangeDirector}
                />
              </div>
              <div className="form-group">
                <label htmlFor="actores">Actores</label>
                <input
                  type="text"
                  className="form-control"
                  id="actores"
                  value={currentPelicula.id_actor}
                  onChange={this.onChangeActor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={currentPelicula.id}
                  onChange={this.onChangeId}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePelicula}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePelicula}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Pelicula...</p>
            </div>
          )}
      </div>
    );
  }
}