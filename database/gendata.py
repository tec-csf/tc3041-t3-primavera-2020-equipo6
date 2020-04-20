import csv
import json
import random
import time

from datetime import date
from pymongo import MongoClient

names = ['albattani', 'allen', 'almeida', 'agnesi', 'archimedes', 'ardinghelli', 'aryabhata', 'austin', 'babbage', 'banach', 'bardeen', 'bartik', 'bassi', 'beaver', 'bell', 'benz', 'bhabha', 'bhaskara', 'blackwell', 'bohr', 'booth', 'borg', 'bose', 'boyd', 'brahmagupta', 'brattain', 'brown', 'carson', 'chandrasekhar', 'chaplygin', 'chatterjee', 'chebyshev', 'shannon', 'clarke', 'colden', 'cori', 'cray', 'curran', 'curie', 'darwin', 'davinci', 'dijkstra', 'dubinsky', 'easley', 'edison', 'einstein', 'elion', 'elbakyan', 'engelbart', 'euclid', 'euler', 'fermat', 'fermi', 'feynman', 'franklin', 'galileo', 'gates', 'goldberg', 'goldstine', 'goldwasser', 'golick', 'goodall', 'haibt', 'hamilton', 'hawking', 'heisenberg', 'hermann', 'heyrovsky', 'hodgkin', 'hoover', 'hopper', 'hugle', 'hypatia', 'jackson', 'jang', 'jennings', 'jepsen', 'johnson', 'joliot', 'jones', 'kalam', 'kapitsa', 'kare', 'keldysh', 'keller', 'kepler', 'khorana', 'kilby', 'kirch', 'knuth', 'kowalevski', 'lalande', 'lamarr', 'lamport', 'leakey', 'leavitt', 'lewin', 'lichterman', 'liskov', 'lovelace', 'lumiere', 'mahavira', 'mayer', 'mccarthy', 'mcclintock', 'mclean', 'mcnulty', 'mendeleev', 'meitner', 'meninsky', 'mestorf', 'minsky', 'mirzakhani', 'morse', 'murdock', 'neumann', 'newton', 'nightingale', 'nobel', 'noether', 'northcutt', 'noyce', 'panini', 'pare', 'pasteur', 'payne', 'perlman', 'pike', 'poincare', 'poitras', 'proskuriakova', 'ptolemy', 'raman', 'ramanujan', 'ride', 'montalcini', 'ritchie', 'roentgen', 'rosalind', 'saha', 'sammet', 'shaw', 'shirley', 'shockley', 'sinoussi', 'snyder', 'spence', 'stallman', 'shtern', 'stonebraker', 'swanson', 'swartz', 'swirles', 'tereshkova', 'tesla', 'thompson', 'torvalds', 'turing', 'varahamihira', 'vaughan', 'visvesvaraya', 'volhard', 'villani', 'wescoff', 'wiles', 'williams', 'wilson', 'wing', 'wozniak', 'wright', 'yalow', 'yonath', 'zhukovsky', ]

countries = [ 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica (the territory South of 60 deg S)', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island (Bouvetoya)', 'Brazil', 'British Indian Ocean Territory (Chagos Archipelago)', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Faroe Islands', 'Falkland Islands (Malvinas)', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Korea', 'Kuwait', 'Kyrgyz Republic', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands Antilles', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard & Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'United States Minor Outlying Islands', 'United States Virgin Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe', ]

carreras = ['Ingeniero Civil','Ingeniero en Innovación y Desarrollo','Ingeniero Mecánico','Ingeniero en Mecatrónica','Ingeniero en Electrónica','Ingeniero Industrial y de Sistemas','Ingeniero Biomédico','Ingeniero en Robótica y Sistemas Digitales','Ingeniero en Transformación Digital de Negocios','Ingeniero en Tecnologías Computacionales','Ingeniero en Biosistemas Agroalimentarios','Ingeniero en Desarrollo Sustentable','Ingeniero en Alimentos','Ingeniero en Biotecnología','Ingeniero Químico','Ingeniero en Ciencia de Datos y Matemáticas','Ingeniero Físico Industrial','Ingeniero en Nanotecnología','Licenciado en Contaduría Pública y Finanzas','Licenciado en Desarrollo de Talento y Cultura Organizacional','Licenciado en Emprendimiento','Licenciado en Estrategia y Transformación de Negocios','Licenciado en Finanzas','Licenciado en Inteligencia de Negocios','Licenciado en Mercadotecnia','Licenciado en Negocios Internacionales','Bachelor in Global Business','Licenciado en Biociencias','Licenciado en Psicología Clínica y de la Salud','Licenciado en Nutrición y Bienestar Integral','Médico Cirujano','Médico Cirujano Odontólogo','Arquitecto (multientrada)','Ingeniero Civil','Licenciado en Urbanismo','Arquitecto multientrada','Licenciado en Comunicación','Licenciado en Innovación Educativa','Licenciado en Tecnología y Producción Musical','Licenciado en Arte Digital','Licenciado en Diseño','Licenciado en Letras Hispánicas','Licenciado en Periodismo','Licenciado en Economía','Licenciado en Relaciones Internacionales','Licenciado en Derecho','Licenciado en Gobierno y Transformación Pública']

estilos = ['Cine adolescente','Cine arte','Cine BDSM','Cine bélico','Cine de gánsteres','Cine catástrofe','Cine costumbrista','Cine cristiano','Cine de acción','Cine de animación','Cine de artes marciales','Cine de autor','Cine de aventuras','Cine de ciencia ficción','Cine de misterio','Cine de samuráis','Cine de terror','Cine documental','Cine de explotación','Cine épico','Cine erótico (no pornográfico)','Cine experimental','Cine fantástico','Cine fetichista','Cine histórico','Cine musical','Novela negra','Cine negro','Cine neo noir','Cine Tech Noir','Vigilante film','Cine de Rumberas','Pinku eiga','Telefilm','Cine peplum','Cine policíaco','Cine de crimen','Cine político','Cine pornográfico','Cine propagandístico','Cine romántico','Cine S','Cine surrealista','Cine underground','Clase B','Comedia','Drama','Dramedia','Melodrama','Películas snuff','Road movie','Spoof movie','Thriller','Western']

palabras = ['humanidad','humano','persona','gente','hombre','mujer','bebé','niño','niña','adolescente','adulto','adulta','anciano','anciana','don','doña','señor','señora','caballero','dama','Cuerpo humano y salud','cuerpo','pierna','pie','talón','espinilla','rodilla','muslo','cabeza','cara','boca','labio','diente','ojo','nariz','barba','bigote','cabello','oreja','cerebro','estómago','brazo','codo','hombro','uña','mano','muñeca','palma','dedo','trasero','culo','cola','glúteos','abdomen','hígado','músculo','cuello','corazón','mente','alma','espíritu','pecho','cintura','cadera','espalda','corazón','sangre','carne','piel','hueso','resfriado','gripe','diarrea','salud','enfermedad','Familia y otras relaciones','familia','amigo','amiga','conocido','conocida','colega','pareja','esposo','esposa','matrimonio','amor','padre','madre','hermano','hermana','hijo','hija','abuelo','abuela','bisabuelo','bisabuela','nieto','nieta','bisnieto','bisnieta','primo','prima','tío','tía','sobrino','sobrina','Vida','criatura','especie','ser','vida','nacimiento','reproducción','muerte','Geografía','naturaleza','campo','bosque','selva','jungla','desierto','costa','playa','río','laguna','lago','mar','océano','cerro','monte','montaña','luz','energía','Animales','animal','perro','gato','vaca','cerdo','caballo','yegua','oveja','mono','ratón','rata','tigre','conejo','dragón','ciervo','rana','león','jirafa','elefante','pájaro','gallina','gorrión','cuervo','águila','halcón','pez','camarón','langosta','sardina','atún','calamar','pulpo','insecto','bicho','mariposa','polilla','saltamontes','araña','mosca','mosquito','cucaracha','caracol','babosa','lombriz','marisco','molusco','lagarto','serpiente','cocodrilo','Plantas y alimentos','alimento','comida','bebida','vegetal','planta','pasto','césped','flor','fruta','semilla','árbol','hoja','raíz','tallo','hongo','ciruela','pino','bambú','nuez','almendra','castaña','arroz','avena','cebada','trigo','verdura','patatas','papas','judías','guisantes','porotos','rábano','zanahoria','manzana','naranja','plátano','pera','castaño','durazno','tomate','sandía','carne','gaseosa','Tiempo','tiempo','calendario','edad','época','era','fecha','instante','momento','segundo','minuto','hora','día','semana','entre semana','fin de semana','mes','año','década','siglo','milenio','ayer','hoy','mañana','amanecer','mediodía','tarde','anochecer','noche','lunes','martes','miércoles','jueves','viernes','sábado','domingo','Espacio','ambiente','espacio','entorno','área','superficie','volumen','región','zona','lado','mundo','planeta','sol','luna','estrella','galaxia','universo','clima','despejado','nublado','lluvia','nieve','viento','trueno','rayo','tormenta','cielo','este','oeste','sur','norte','derecha','izquierda','diagonal','exterior','interior','Materiales','calor','agua','hielo','vapor','fuego','gas','aire','atmósfera','tierra','piso','suelo','metal','metálico','hierro','oro','plata','plomo','sal','barro','lodo','Medidas','peso','metro','milímetro','centímetro','kilómetro','litro','gramo','kilo','cantidad','total','medida','Sociedad','sociedad','comunidad','reunión','encuentro','estructura','administración','organización','asociación','empresa','equipo','autoridad','cargo','campaña','club','comisión','congreso','consejo','partido','país','nación','gobierno','estado','provincia','departamento','municipio','democracia','dictadura','política','político','presidente','ministro','director','parlamentario','congresista','senador','diputado','representante','gobernador','intendente','alcalde','policía','bomberos','capital','ciudad','población','pueblo','villa','obligación','libertad','derecho','permiso','prohibición','constitución','ley','decreto','norma','Economía','economía','consumo','demanda','compañía','comercio','mercado','servicio','producto','producción','transacción','almacén','hotel','fábrica','cuenta','boleto','entrada','dinero','billete','vuelto','cambio','máquina expendedora','precio','tarifa','valor','Objetos hechos por el ser humano','Hogar','escritorio','silla','mesa','cama','dormitorio','habitación','cuarto','oficina','panel','puerta','ventana','entrada','hogar','casa','apartamento','departamento','edificio','construcción','elevador','ascensor','escalera','Herramientas','aparato','cámara','aguja','clavo','hilo','cuerda','cordel','cordón','bolsillo','bolso','bolsa','paraguas','parasol','pantalla','pomo','llave','trancar','arma','escultura','libro','revista','cuadro','grabado','electricidad','corriente','base','pata','conexión','Ropa','ropa','prenda','manga','solapa','cuello','botón','cremallera','cierre','cinturón','zapato','gafas','pantalón','camisa','camiseta','zapatilla','cordones','abrigo','chaqueta','calcetines','bragas','calzón','calzoncillo','sujetador','sostén','falda','Transportes','transporte','transporte público','transporte privado','tránsito','tráfico','vehículo','tren','ferrocarril','subterráneo','metro','camino','vía','ruta','calle','carretera','autopista','avenida','estación','parada','avión','aeropuerto','automóvil','coche','auto','bus','autobús','ómnibus','ambulancia','Lenguaje','número','alfabeto','símbolo','punto','coma','raíz','origen','fuente','papel','carta','comunicación','expresión','voz','texto','periodismo','periódico','diario','diccionario','documento','informe','noticia','computadora','ordenador','idioma extranjero','japonés','inglés','chino','alemán','español','francés','Colores','color','blanco','negro','gris','rojo','naranja','anaranjado','amarillo','verde','celeste','azul','violeta','rosa','rosado','marrón','café','Actividades','cultura','autor','actuación','espectador','espectáculo','entretenimiento','arte','cine','dibujo','pintura','música','religión','dios','artículo','educación','escuela','instituto','colegio','universidad','clase','curso','estudio','formación','análisis','investigación','conocimiento','idea','información','dato','forma','manera','modo','estilo','figura','elemento','uso','utilización','ciencia','aritmética','historia','geografía','educación física','deporte','carrera','competición','competencia','ayuda','favor','apoyo','búsqueda','duda','pregunta','respuesta','cuestión','solicitud','decisión','elección','consejo','sugerencia','orden','control','sistema','trabajo','empleo','profesión','esfuerzo','Números','cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','cien','ciento','mil','millón','Espacio y cantidad','lugar','posición','movimiento','velocidad','aceleración','dirección','tamaño','largo','longitud','alto','altura','ancho','mayoría','minoría','aumento','reducción','crecimiento','fondo','frente','Sustantivos abstractos','cosa','aspecto','contenido','objeto','parte','sector','palabra','nombre','código','secreto','formalidad','presente','pasado','futuro','ocasión','vez','acción','actividad','acto','programa','proyecto','obra','acuerdo','actitud','atención','capacidad','concepto','tema','condición','caso','conjunto','grupo','creación','destrucción','origen','destino','objetivo','meta','función','relación','realidad','situación','problema','intento','solución','efecto','resultado','logro','éxito','fracaso','causa','consecuencia','beneficio','perjuicio','calidad','tipo','ataque','defensa','paz','conflicto','guerra','carácter','característica','crisis','cambio','desarrollo','progreso','avance','retroceso','mejora','deterioro','comienzo','inicio','principio','transcurso','fin','final','cabo','etapa','fase','paso','serie','secuencia','grado','nivel','proceso','corte','interrupción','espera','diferencia','similitud','sentido','sensación','vista','oído','tacto','olfato','dolor','conciencia','percepción','imagen','fuerza','potencia','presencia','existencia','experiencia','posibilidad','probabilidad','verdad','mentira','razón','acierto','equivocación','necesidad','falta','significado','carácter','personalidad','pensamiento','memoria','recuerdo','deseo','alegría','tristeza','enojo','enfado','placer','éxtasis','empatía','interés','aburrimiento','cansancio','sorpresa','susto','seguridad','confianza','miedo','temor','ejemplo','Adjetivos','Adjetivos de calidad','bueno','buen','malo','superior','inferior','central','lateral','frontal','trasero','posterior','cierto','real','falso','mayor','menor','importante','necesario','absoluto','relativo','caro','barato','viejo','joven','nuevo','cada','cualquier','dado','actual','reciente','capaz','fácil','simple','sencillo','difícil','complicado','posible','imposible','probable','improbable','estricto','serio','general','particular','común','especial','usual','único','raro','extraño','fuerte','débil','correcto','acertado','incorrecto','desacertado','contrario','opuesto','inverso','igual','diferente','distinto','parecido','similar','otro','diverso','manual','automático','universal','mundial','continental','internacional','nacional','regional','local','urbano','rural','social','político','cultural','artístico','propio','ajeno','público','privado','Adjetivos de forma','alto','bajo','gran','grande','pequeño','amplio','angosto','compacto','delgado','grueso','Adjetivos sensoriales','caliente','frío','ligero','pesado','suave','firme','flexible','duro','blando','caluroso','frío','fresco','delicioso','apetitoso','horrible','dulce','picante','salado','amargo','anterior','posterior','siguiente','cercano','lejano','junto','unido','separado','alejado','Adjetivos de sentimientos y sensaciones','feliz','triste','solo','solitario','contento','tranquilo','enojado','enfadado','calmo','agitado','ansioso','interesado','aburrido','encantado','cansado','sorprendido','asustado','atemorizado','doloroso','picante','ardiente','apestoso','maloliente','Adjetivos ordinales','primer','primero','primera','segundo','tercero','cuarto','quinto','décimo','centésimo','millonésimo','penúltimo','último','Adjetivos posesivos','mi','tu','su','nuestro','nuestra','vuestro','vuestra','Verbos','Auxiliares','ser','estar','haber','Existencia','aparecer','desaparecer','existir','cambiar','crecer','vivir','nacer','morir','Movimiento','ir','venir','volver','partir','llegar','llevar','traer','mover','arrojar','lanzar','coger','agarrar','poner','quitar','sacar','alcanzar','acercar','alejar','lanzar','arrojar','lanzar','coger','agarrar','sujetar','golpear','patear','poner','quitar','sacar','alcanzar','acercar','alejar','recoger','levantar','tomar','pegar','Sensaciones','sentir','ver','oír','escuchar','tocar','oler','percibir','Emociones','amar','querer','desear','odiar','detestar','entristecerse','llorar','reír','enojarse','enfadarse','admirar','alabar','elogiar','alegrarse','encantarse','consolar','interesarse','aburrirse','cansarse','sorprenderse','asustarse','atemorizarse','Actividades','comunicarse','afirmar','negar','decir','hablar','callar','escribir','leer','analizar','pensar','cantar','señalar','apuñalar','morder','clavar','comer','beber','acordar','afectar','generar','añadir','agregar','mejorar','empeorar','seguir','avanzar','retroceder','ayudar','complicar','reunirse','entrevistar','abrir','desenvolver','jugar','tener','faltar','dar','recibir','romper','doblar','cortar','comprar','vender','llevar puesto','cambiar','intercambiar','sustituir','reemplazar','cerrar','buscar','encontrar','obtener','conseguir','crear','creer','comenzar','iniciar','empezar','terminar','acabar','abandonar','dejar','entrar','quedarse','salir','atender','medir','pesar','considerar','comparar','evaluar','decidir','construir','destruir','deber','poder','conocer','entender','comprender','atar','saber','trabajar','separar','dividir','partir','descansar','dormir','despertar','aceptar','rechazar','descartar','acompañar','pedir','solicitar','pretender','proponer','sugerir','usar','utilizar','hacer','fabricar','arreglar','reparar','explicar','mostrar','tratar','evitar','probar','intentar','comprobar','verificar','variar','esperar','necesitar','precisar','significar','parecer','distinguir','Adverbios','Adverbios de cantidad','más','menos','muy','mucho','poco','apenas','algo','casi','aproximadamente','exactamente','bastante','justo','demasiado','etcétera','solo','solamente','tan','tanto','todo','nada','cómo','cuándo','cuánto','cuál','cuáles','dónde','Adverbios de calidad','bien','mal','mejor','peor','regular','despacio','deprisa','tal','como','adrede','claro','exacto','obvio','inclusive','además','asimismo','únicamente','especialmente','incluso','viceversa','siquiera','inicialmente','finalmente','Adverbios de posibilidad','siempre','nunca','jamás','también','tampoco','quizá','quizás','acaso','fácilmente','difícilmente','probablemente','posiblemente','seguramente','Adverbios temporales','antes','anteriormente','actualmente','ahora','enseguida','inmediatamente','ya','todavía','aún','recién','mientras','después','luego','pronto','tarde','temprano','ayer','anoche','hoy','mañana','de nuevo','próximamente','Adverbios de ubicación','arriba','encima','abajo','debajo','adelante','delante','atrás','detrás','centro','medio','alrededor','enfrente','cerca','lejos','adentro','dentro','afuera','fuera','aquí','acá','ahí','allá','allí','Otros adverbios','así','adónde','dónde','Preposiciones','a','al','ante','bajo','con','contra','de','del','desde','durante','en','entre','hacia','hasta','mediante','para','por','según','sin','sobre','tras','Conjunciones','aunque','como','cuando','entonces','excepto','ni','o','pero','porque','pues','que','salvo','si','sino','y','Pronombres','Pronombres personales','yo','tú','vos','usted','él','ella','ello','nosotros','nosotras','vosotros','vosotras','ustedes','ellos','ellas','mí','conmigo','ti','contigo','sí','consigo','me','te','le','la','lo','se','nos','os','Pronombres posesivos','mío','mía','tuyo','tuya','suyo','suya','nuestro','nuestra','vuestro','vuestra','cuyo','cuya','Pronombres indefinidos','un','una','uno','algún','alguna','algo','ninguno','ninguna','nada','varios','varias','otro','otra','mismo','misma','tan','tanto','tanta','alguien','nadie','cualquiera','ambos','demás','Pronombres interrogativos','cuál','cuánto','quién','qué','Demostrativos','este','esta','esto','estos','estas','ese','esa','eso','esos','esas','aquel','aquella','aquello','aquellos','aquellas','Interjecciones','sí','no','Locuciones','gracias','acerca de','a lo mejor','a menudo','a pesar de','a propósito','a través de','dado que','es decir','ni siquiera','o sea','por cierto','por ejemplo','por favor','por tanto','sin embargo','tal vez','ya que']

tipos = ['Clasica', 'VIP', '3D', '4D', 'IMAX']

cines = ['Cinemex ', 'Cinepolis ', 'Cinemark ', 'Autocinema Coyote ']

def genActor(size):
  rows = []
  names_size = len(names)
  countries_size = len(countries)

  for i in range(size):
    nombre = names[random.randint(0, names_size-1)] + " " + names[random.randint(0, names_size-1)]
    edad = random.randint(0, 100)
    pais = countries[random.randint(0, countries_size-1)]
    dictionary = {
      '_id': i,
      'nombre': nombre,
      'edad': edad,
      'pais':pais
    }
    rows.append(dictionary)
  
  return rows

def genDirector(size):
  rows = []
  names_size = len(names)
  carreras_size = len(carreras)
  estilos_size = len(estilos)

  for i in range(size):
    nombre = names[random.randint(0, names_size-1)] + " " + names[random.randint(0, names_size-1)]
    carrera = carreras[random.randint(0, carreras_size-1)]
    estilo = estilos[random.randint(0, estilos_size-1)]
    dictionary = {
      '_id': i,
      'nombre': nombre,
      'titulo': carrera,
      'estilo': estilo
    }
    rows.append(dictionary)
  
  return rows

def genPelicula(size, director_range, actor_range):
  rows = []
  carreras_size = len(carreras)
  estilos_size = len(estilos)

  for i in range(size):
    nombre = genPeliculaName(5)
    ano = random.randint(1900, 2020)
    id_director = genForeignIds(director_range, 1)
    id_actor = genForeignIds(actor_range, 10)
    dictionary = {
      '_id': i,
      'nombre': nombre,
      'ano': ano,
      'id_director': id_director,
      'id_actor': id_actor
    }
    rows.append(dictionary)
  
  return rows

def genProyeccion(size, pelicula_range):
  # field names  
  rows = []

  for i in range(size):
    horario = genRandomDate()
    precio = random.randint(60, 200)
    id_pelicula = genForeignIds(pelicula_range, 1)
    # data rows of csv file
    dictionary = {
      '_id': i,
      'horario': horario,
      'precio': precio,
      'id_pelicula': id_pelicula
    }
    rows.append(dictionary)
  
  return rows

def genSala(size, proyeccion_range):
  rows = []
  tipos_size = len(tipos)

  for i in range(size):
    numero = random.randint(1, 15)
    asientos = random.randint(50, 100)
    tipo = tipos[random.randint(0, tipos_size-1)]
    id_proyeccion = genForeignIds(proyeccion_range, 1)
    dictionary = {
      '_id': i,
      'numero': numero,
      'asientos': asientos,
      'tipo': tipo,
      'id_proyeccion': id_proyeccion
    }
    rows.append(dictionary)
  
  return rows

def genCine(size, sala_range):
  # field names  
  rows = []
  cines_size = len(cines)
  locations = readCsvFile("location.csv")
  randLocations = getRandomLocations(locations, size)

  for i in range(size):
    cine = cines[random.randint(0, cines_size-1)]
    nombre = cine + randLocations[i][0]
    coords = randLocations[i][1].split(" ")
    coordsTmp = float(coords[0])
    coords[0] = float(coords[1])
    coords[1] = coordsTmp
    ubicacion = {
      "type" : "Point",
      "coordinates" : coords
    }
    id_sala = genForeignIds(sala_range, 15)
    dictionary ={ 
      "_id" : i, 
      "nombre" : nombre, 
      "ubicacion" : ubicacion, 
      "id_sala" : id_sala
    }
    rows.append(dictionary)
  
  return rows

def genRandomDate():
  timestamp = int(time.time())
  addition = random.randint(0, 4000000)
  return timestamp + addition

def genPeliculaName(maxN):
  n = random.randint(1, maxN)
  palabras_size = len(palabras)
  res = ""
  for i in range(n):
    res += palabras[random.randint(0, palabras_size-1)]
    if i < n-1:
      res += " "
  return res

def genForeignIds(idRange, maxIds):
  n = random.randint(1, maxIds)
  res = []
  for i in range(n):
    index = random.randint(0,idRange-1)
    res.append(str(index))
  return res

def writeToFile(filename, fields, rows):
  # writing to csv file  
  with open(filename, 'w') as csvfile:  
      # creating a csv writer object  
      csvwriter = csv.writer(csvfile)  
          
      # writing the fields  
      csvwriter.writerow(fields)  
          
      # writing the data rows  
      csvwriter.writerows(rows) 

def writeToJson(filename, dictionaries):
  json_object = ""
  # Serializing json
  for dictionary in dictionaries:
    json_object += json.dumps(dictionary) + "\n"
    
  # Writing to sample.json
  with open(filename, "w") as outfile:
      outfile.write(json_object)

def readCsvFile(filename):
  # initializing the titles and rows list 
  fields = [] 
  rows = [] 
    
  # reading csv file 
  with open(filename, 'r') as csvfile: 
      # creating a csv reader object 
      csvreader = csv.reader(csvfile, delimiter = ';') 
        
      # extracting field names through first row 
      fields = next(csvreader) 
    
      # extracting each data row one by one 
      for row in csvreader: 
          rows.append(row) 

  return rows

def getRandomLocations(locations, n):
  locations_size = len(locations)
  results = []
  for i in range(n):
    location = locations[random.randint(0, locations_size-1)]
    results.append([location[0], location[5]])
  return results

def connectToDb(password):
  client = MongoClient("mongodb+srv://dbUser:" + password + "@tarea3-apbg3.gcp.mongodb.net/test?retryWrites=true&w=majority")
  db = client.Cartelera
  return db

def insertToDb(collection, document):
  collection.insert_many(document)

def main():
  db = connectToDb("x3jPieXWD5lEXmPr")

  filename = "gen/actores.json"
  actores = genActor(100000)
  writeToJson(filename, actores)
  actor_c = db.actor
  insertToDb(actor_c, actores)

  filename = "gen/directores.json"
  directores = genDirector(100000)
  writeToJson(filename, directores)
  director_c = db.director
  insertToDb(director_c, directores)

  filename = "gen/peliculas.json"
  peliculas = genPelicula(100000, len(directores), len(actores))
  writeToJson(filename, peliculas)
  pelicula_c = db.pelicula
  insertToDb(pelicula_c, peliculas)

  filename = "gen/proyecciones.json"
  proyecciones = genProyeccion(100000, len(peliculas))
  writeToJson(filename, proyecciones)
  proyeccion_c = db.proyeccion
  insertToDb(proyeccion_c, proyecciones)

  filename = "gen/salas.json"
  salas = genSala(100000, len(proyecciones))
  writeToJson(filename, salas)
  sala_c = db.sala
  insertToDb(sala_c, salas)

  filename = "gen/cines.json"
  cines = genCine(100000, len(salas))
  writeToJson(filename, cines)
  cin = db.cine
  insertToDb(cin, cines)

main()