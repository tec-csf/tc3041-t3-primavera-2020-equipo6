module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      nombre: String,
      edad: Number,
      pais: String,
      amigos:[Number],
    },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Actor = mongoose.model("actor", schema, "actor");

  return Actor;
};