const db = require("../models");
const Sala = db.salas;

// Create and Save a new Proyeccion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const sala = new Sala({
    _id: req.body.id,
    numero: req.body.numero,
    asientos: req.body.asientos,
    tipo: req.body.tipo,
    id_proyeccion: req.body.id_proyeccion,
  });

  sala
    .save(sala)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sala."
      });
    });
};

// Retrieve all Salas from the database.
exports.findAll = (req, res) => {
  const numero = req.query.numero;
  var condition = numero ? { numero: numero } : {};

  Sala.find(condition).limit(20)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Salas."
      });
    });
};

// Find a single Sala with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sala.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Sala with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sala with id=" + id });
    });
};

// Update a Sala by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Sala.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sala with id=${id}. Maybe Sala was not found!`
        });
      } else res.send({ message: "Sala was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sala with id=" + id
      });
    });
};

// Delete a Sala with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sala.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Sala with id=${id}. Maybe Sala was not found!`
        });
      } else {
        res.send({
          message: "Sala was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sala with id=" + id
      });
    });
};

// Delete all Salas from the database.
exports.deleteAll = (req, res) => {
  Sala.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Salas were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Salas."
      });
    });
};
