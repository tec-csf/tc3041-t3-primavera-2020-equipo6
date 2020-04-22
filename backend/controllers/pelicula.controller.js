const db = require("../models");
const Pelicula = db.peliculas;

// Create and Save a new Director
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Director
  const pelicula = new Pelicula({
    _id: req.body.id,
    nombre: req.body.nombre,
    ano: req.body.ano,
    estilo: req.body.estilo,
    id_director: req.body.id_director,
    id_actor: req.body.id_actor,
  });

  // Save Director in the database
  pelicula
    .save(pelicula)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pelicula."
      });
    });
};


// Retrieve all Directors from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Pelicula.find(condition).limit(20)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Peliculas."
      });
    });
};

// Find a single Director with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pelicula.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pelicula with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pelicula with id=" + id });
    });
};

// Update a Director by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pelicula.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pelicula with id=${id}. Maybe Pelicula was not found!`
        });
      } else res.send({ message: "Pelicula was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pelicula with id=" + id
      });
    });
};

// Delete a Director with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pelicula.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pelicula with id=${id}. Maybe Pelicula was not found!`
        });
      } else {
        res.send({
          message: "Pelicula was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pelicula with id=" + id
      });
    });
};

// Delete all Directors from the database.
exports.deleteAll = (req, res) => {
  Pelicula.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pelicula were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pelicula."
      });
    });
};
