// Create and Save a new Actor
exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const actor = new Actor({
  // Create aActor
    _id: req.body.id,
    nombre: req.body.nombre,
    edad:req.body.edad,
    pais: req.body.pais,
    amigos: req.body.amigos,
  });

  // SaveActor in the database
    actor
    .save(actor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating theActor."
      });
    });
};

// Retrieve all Actors from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

    Actor.find(condition).limit(20)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving actors."
        });
      });
};

// Find a single Actor with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Actor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Actor with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Actor with id=" + id });
    });
};

// Update a Actor by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

        Actor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Director with id=${id}. Maybe Actor was not found!`
            });
          } else res.send({ message: "Actor was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Actor with id=" + id
          });
        });
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Actor.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Actor with id=${id}. Maybe Actor was not found!`
          });
        } else {
          res.send({
            message: "Actor was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Actor with id=" + id
        });
      });
};

// Delete all Actors from the database.
exports.deleteAll = (req, res) => {

    Actor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Actors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Actors."
      });
    });
};