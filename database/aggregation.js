// Splits id string into array and converts into numbers
[
  {
    '$project': {
      'id_actores': {
        '$map': {
          'input': {
            '$split': [
              '$id_actor', ' '
            ]
          }, 
          'as': 'numero', 
          'in': {
            '$toInt': '$$numero'
          }
        }
      }
    }
  }
]

// Converts string dates to ISODates
[
  {
    '$project': {
      'horario': {
        '$toInt': '$horario'
      }
    }
  }, {
    '$project': {
      'ts': {
        '$toDate': {
          '$multiply': [
            '$horario', 1000
          ]
        }
      }
    }
  }
]