// Returns social network for an actor (friends' friends)
[
  {
    '$sort': {
      'nombre': 1
    }
  }, {
    '$graphLookup': {
      'from': 'actor', 
      'startWith': '$amigos', 
      'connectFromField': 'amigos', 
      'connectToField': '_id', 
      'as': 'Red Social', 
      'maxDepth': 1
    }
  }, {
    '$lookup': {
      'from': 'actor', 
      'localField': 'amigos', 
      'foreignField': '_id', 
      'as': 'amigos'
    }
  }, {
    '$project': {
      'nombre': 1, 
      'amigos': '$amigos.nombre', 
      'Red Social': '$Red Social.nombre'
    }
  }
]

// Groups movies by director's education and by genre
[
  {
    '$sort': {
      'ano': -1
    }
  }, {
    '$lookup': {
      'from': 'director', 
      'localField': 'id_director', 
      'foreignField': '_id', 
      'as': 'id_director'
    }
  }, {
    '$unwind': {
      'path': '$id_director'
    }
  }, {
    '$facet': {
      'porEstilo': [
        {
          '$group': {
            '_id': '$estilo', 
            'nombre': {
              '$addToSet': '$nombre'
            }
          }
        }
      ], 
      'porEstudiosDeDirector': [
        {
          '$group': {
            '_id': '$id_director.titulo', 
            'nombre': {
              '$addToSet': '$nombre'
            }
          }
        }
      ]
    }
  }
]

// Groups movies by their actor's nationality
[
  {
    '$lookup': {
      'from': 'actor', 
      'localField': 'id_actor', 
      'foreignField': '_id', 
      'as': 'id_actor'
    }
  }, {
    '$unwind': {
      'path': '$id_actor'
    }
  }, {
    '$match': {
      'id_actor.pais': 'France'
    }
  }, {
    '$project': {
      'nombre': 1
    }
  }
]

// Returns movies where specified actor appears
[
  {
    '$lookup': {
      'from': 'actor', 
      'localField': 'id_actor', 
      'foreignField': '_id', 
      'as': 'actores'
    }
  }, {
    '$unwind': {
      'path': '$actores'
    }
  }, {
    '$match': {
      'actores.nombre': 'kirch sinoussi'
    }
  }, {
    '$group': {
      '_id': '$actores._id', 
      'nombre': {
        '$first': '$actores.nombre'
      }, 
      'peliculas': {
        '$addToSet': '$nombre'
      }, 
      'pais': {
        '$first': '$actores.pais'
      }
    }
  }, {
    '$sort': {
      'pais': 1
    }
  }
]

// Returns movie showtimes ordered by location and date
[
  {
    '$geoNear': {
      'near': {
        'type': 'Point', 
        'coordinates': [
          -118.266743, 34.0582395
        ]
      }, 
      'distanceField': 'ubicacion.calculated', 
      'query': {}
    }
  }, {
    '$lookup': {
      'from': 'sala', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'salas'
    }
  }, {
    '$unwind': {
      'path': '$salas'
    }
  }, {
    '$lookup': {
      'from': 'proyeccion', 
      'localField': 'salas.id_proyeccion', 
      'foreignField': '_id', 
      'as': 'proyecciones'
    }
  }, {
    '$unwind': {
      'path': '$proyecciones'
    }
  }, {
    '$unwind': {
      'path': '$proyecciones.id_pelicula'
    }
  }, {
    '$lookup': {
      'from': 'pelicula', 
      'localField': 'proyecciones.id_pelicula', 
      'foreignField': '_id', 
      'as': 'pelicula'
    }
  }, {
    '$unwind': {
      'path': '$pelicula'
    }
  }, {
    '$project': {
      '_id': 0, 
      'cine': '$nombre', 
      'horario': {
        '$toDate': {
          '$multiply': [
            '$proyecciones.horario', 1000
          ]
        }
      }, 
      'numero sala': '$salas.numero', 
      'numero de asientos': '$salas.asientos', 
      'tipo de sala': '$salas.tipo', 
      'precio': '$proyecciones.precio', 
      'nombre': '$pelicula.nombre'
    }
  }, {
    '$limit': 1000
  }, {
    '$sort': {
      'horario': 1
    }
  }
]