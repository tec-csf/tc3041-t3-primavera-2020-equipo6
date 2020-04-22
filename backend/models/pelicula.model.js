module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      nombre: String,
      ano: Number,
      estilo: String,
      id_director: Number,
      id_actor: [Number],
    },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pelicula = mongoose.model("pelicula", schema, "pelicula");

  return Pelicula;
};