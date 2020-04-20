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