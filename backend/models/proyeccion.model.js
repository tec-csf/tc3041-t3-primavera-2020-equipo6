module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      horario: Number,
      precio: Number,
      id_pelicula: Number,
    },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Proyeccion = mongoose.model("proyeccion", schema, "proyeccion");

  return Proyeccion;
};