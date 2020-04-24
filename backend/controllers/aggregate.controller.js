const db = require("../models");
const Pelicula = db.peliculas;
const Actor = db.actors;
const Cine = db.cines;

exports.socialNetwork = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Actor.aggregate([
    { $sort: { nombre: 1 } },
    { $limit: 20 },
    {
      $graphLookup: {
        'from': 'actor',
        'startWith': '$amigos',
        'connectFromField': 'amigos',
        'connectToField': '_id',
        'as': 'Red Social',
        'maxDepth': 1
      }
    }, {
      $lookup: {
        'from': 'actor',
        'localField': 'amigos',
        'foreignField': '_id',
        'as': 'amigos'
      }
    }, {
      $project: {
        'nombre': 1,
        'amigos': '$amigos.nombre',
        'red': '$Red Social.nombre'
      }
    }
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cines."
      });
    });
};

exports.facet = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Pelicula.aggregate([
    // Groups movies by director's education and by genre
    {
      $sort: {
        'ano': -1
      }
    }, {
      $lookup: {
        'from': 'director',
        'localField': 'id_director',
        'foreignField': '_id',
        'as': 'id_director'
      }
    }, {
      $unwind: {
        'path': '$id_director'
      }
    }, {
      $facet: {
        'porEstilo': [
          {
            '$group': {
              '_id': '$estilo',
              'nombre': {
                $addToSet: '$nombre'
              }
            }
          }
        ],
        'porEstudiosDeDirector': [
          {
            $group: {
              '_id': '$id_director.titulo',
              'nombre': {
                $addToSet: '$nombre'
              }
            }
          }
        ]
      }
    },
    { $limit: 20 },
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cines."
      });
    });
};

exports.nation = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const pais = req.params.pais;
  Pelicula.aggregate([
    {
      $lookup: {
        'from': 'actor', 
        'localField': 'id_actor', 
        'foreignField': '_id', 
        'as': 'id_actor'
      }
    }, {
      $unwind: {
        'path': '$id_actor'
      }
    }, {
      $match: {
        'id_actor.pais': pais
      }
    }, {
      $project: {
        'nombre': 1
      }
    },
    { $limit: 20 },
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cines."
      });
    });
};

exports.moviesByActor = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const nombre = req.params.nombre;
  Pelicula.aggregate([
    { $limit: 10000 },
    {
      $lookup: {
        'from': 'actor', 
        'localField': 'id_actor', 
        'foreignField': '_id', 
        'as': 'actores'
      }
    }, {
      $unwind: {
        'path': '$actores'
      }
    }, {
      $match: {
        'actores.nombre': nombre
      }
    }, {
      $group: {
        '_id': '$actores._id', 
        'nombre': {
          '$first': '$actores.nombre'
        }, 
        'peliculas': {
          '$addToSet': '$nombre'
        }, 
        'pais': {
          '$first': '$actores.pais'
        }
      }
    }, {
      $sort: {
        'pais': 1
      }
    }
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cines."
      });
    });
};

exports.location = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const longitud = parseInt(req.params.longitud);
  const latitud = parseInt(req.params.latitud);
  console.log(longitud, latitud)
  Cine.aggregate([
    {
      '$geoNear': {
        'near': {
          'type': 'Point', 
          'coordinates': [
            longitud, latitud
          ]
        }, 
        'distanceField': 'ubicacion.calculated', 
        'query': {}
      }
    }, {
      '$lookup': {
        'from': 'sala', 
        'localField': 'id_sala', 
        'foreignField': '_id', 
        'as': 'salas'
      }
    }, {
      '$unwind': {
        'path': '$salas'
      }
    }, {
      '$lookup': {
        'from': 'proyeccion', 
        'localField': 'salas.id_proyeccion', 
        'foreignField': '_id', 
        'as': 'proyecciones'
      }
    }, {
      '$unwind': {
        'path': '$proyecciones'
      }
    }, {
      '$unwind': {
        'path': '$proyecciones.id_pelicula'
      }
    }, {
      '$lookup': {
        'from': 'pelicula', 
        'localField': 'proyecciones.id_pelicula', 
        'foreignField': '_id', 
        'as': 'pelicula'
      }
    }, {
      '$unwind': {
        'path': '$pelicula'
      }
    }, {
      '$project': {
        '_id': 0, 
        'cine': '$nombre', 
        'horario': {
          '$toDate': {
            '$multiply': [
              '$proyecciones.horario', 1000
            ]
          }
        }, 
        'sala': '$salas.numero', 
        'asientos': '$salas.asientos', 
        'tipo': '$salas.tipo', 
        'precio': '$proyecciones.precio', 
        'nombre': '$pelicula.nombre'
      }
    }, {
      '$limit': 100
    }, {
      '$sort': {
        'horario': 1
      }
    }
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cines."
      });
    });
};
