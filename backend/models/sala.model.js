module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      numero: Number,
      asientos: Number,
      tipo: String,
      id_proyeccion: Number,
    },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sala = mongoose.model("sala", schema, "sala");

  return Sala;
};