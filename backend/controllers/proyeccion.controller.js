const db = require("../models");
const Proyeccion = db.proyeccions;

// Create and Save a new Proyeccion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a proyeccion
  const proyeccion = new Proyeccion({
    _id: req.body.id,
    horario: req.body.horario,
    precio: req.body.precio,
    id_pelicula: req.body.id_pelicula,
  });

  // Save proyeccion in the database
  proyeccion
    .save(proyeccion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the proyeccion."
      });
    });
};

// Retrieve all proyeccions from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Proyeccion.find(condition).limit(20)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Proyeccions."
      });
    });
};

// Find a single Proyeccion with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Proyeccion.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Proyeccion with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Proyeccion with id=" + id });
    });
};

// Update a Proyeccion by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Proyeccion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Proyeccion with id=${id}. Maybe Proyeccion was not found!`
        });
      } else res.send({ message: "Proyeccion was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proyeccion with id=" + id
      });
    });
};

// Delete a Proyeccion with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Proyeccion.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Proyeccion with id=${id}. Maybe Proyeccion was not found!`
        });
      } else {
        res.send({
          message: "Proyeccion was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proyeccion with id=" + id
      });
    });
};

// Delete all Proyeccions from the database.
exports.deleteAll = (req, res) => {
  Proyeccion.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Proyeccions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Proyeccions."
      });
    });
};
