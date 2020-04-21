module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      _id: Number,
      nombre: String,
      titulo: String
    },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Director = mongoose.model("director", schema, "director");

  return Director;
};