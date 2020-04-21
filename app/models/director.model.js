module.exports = mongoose => {
  const Director = mongoose.model(
    "director",
    mongoose.Schema(
      {
        _id: Number,
        nombre: String,
        titulo: String
      },
    ),
    "director"
  );

  return Director;
};