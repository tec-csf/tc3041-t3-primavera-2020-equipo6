module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      nombre: String,
      ubicacion: {
        type: { String },
        coordinates: [Number]
      },
      id_sala: [Number],
    },
    { typeKey: '$type' },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cine = mongoose.model("cine", schema, "cine");

  return Cine;
};