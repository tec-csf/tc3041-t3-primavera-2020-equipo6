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
        'Red Social': '$Red Social.nombre'
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
    { $limit: 20 },
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

exports.nation = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Actor.aggregate([
    // Groups movies by director's education and by genre
    {
      '$sort': {
        'ano': -1
      }
    }, {
      '$lookup': {
        'from': 'director', 
        'localField': 'id_director', 
        'foreignField': '_id', 
        'as': 'id_director'
      }
    }, {
      '$unwind': {
        'path': '$id_director'
      }
    }, {
      '$facet': {
        'porEstilo': [
          {
            '$group': {
              '_id': '$estilo', 
              'nombre': {
                '$addToSet': '$nombre'
              }
            }
          }
        ], 
        'porEstudiosDeDirector': [
          {
            '$group': {
              '_id': '$id_director.titulo', 
              'nombre': {
                '$addToSet': '$nombre'
              }
            }
          }
        ]
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

exports.moviesByActor = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Actor.aggregate([

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
  Actor.aggregate([

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
