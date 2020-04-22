const db = require("../models");
const Cine = db.cines;

// Create and Save a new Cine
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const cine = new Cine({
    _id: req.body.id,
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion,
    id_sala: req.body.id_sala,
  });

  cine
    .save(cine)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cine."
      });
    });
};

// Retrieve all Cines from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Cine.find(condition).limit(20)
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

// Find a single Cine with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cine.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Cine with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Cine with id=" + id });
    });
};

// Update a Cine by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Cine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cine with id=${id}. Maybe Cine was not found!`
        });
      } else res.send({ message: "Cine was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cine with id=" + id
      });
    });
};

// Delete a Cine with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cine.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cine with id=${id}. Maybe Director was not found!`
        });
      } else {
        res.send({
          message: "Cine was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cine with id=" + id
      });
    });
};

// Delete all Cines from the database.
exports.deleteAll = (req, res) => {
  Cine.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cines were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cines."
      });
    });
};
