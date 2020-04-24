# Tarea 3. Bases de datos NoSQL (MongoDB)

---

##### Integrantes:
1. *Salomon Levy Becherano* - *A01023530* - *TEC SF*
2. *Sebastian Gonzalo Vives Faus* - *A01025211* - *TEC CSF*
3. *Luis Armando Ortiz Revilla* - *A01022320* - *TEC CSF*
4. *Luis Antonio García García* - *A01021865* - *TEC CSF*

---
## 1. Aspectos generales

Las orientaciones de la tarea se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte de la tarea, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.


### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos de la tarea, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en la tarea, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/), [AWS](https://aws.amazon.com/es/free/) u otra.
* La arquitectura de la solución deberá estar separada claramente por capas (*frontend*, *backend*, datos y almacenamiento).
* Todo el código, *scripts* y la documentación de la tarea debe alojarse en este repositorio de GitHub, siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio

El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de toda la tarea
    - README.md			# Archivo con la información general de la tarea (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (API)
    - scripts		        # Carpeta con los scripts necesarios para generar la base de datos, cargar datos y ejecutar las consultas
    - database			# Carpeta con el modelo de la bases de datos utilizando JSON Schema

```

### 1.3 Documentación de la tarea

Como parte de la entrega de la tarea, se debe incluir la siguiente información:

* Diagrama del *Modelo de la base de datos utilizando JSON Schema*.
* *Scripts* para generar la base de datos, cargar datos y ejecutar consultas.
* Guía de configuración, instalación y despliegue de la aplicación en la plataforma en la nube  seleccionada.
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución de la tarea.
### *Link de la aplicaición en la nube:* [http://ec2-3-22-119-16.us-east-2.compute.amazonaws.com:8081]

### 2.1 Modelo de la *base de datos* 

[Modelo JSON Schema](database/DatabaseJsonScheme.json)

Este modelo fue creado en la página web: https://jsonschema.net/ [Version Draft-07]
Cada documento consiste de un schema, el cual contiene un tipo, variables requeridas y sus propiedades. En sus propiedades, se encuentra el schema de cada una de las variables, el cual incluye: su tipo (si es integer, string, object, etc), una descripcion y un ejemplo del mismo. Si la variable llega a ser un objeto, aplica la misma funcionalidad, donde se describe cada una de sus propiedades d ela misma manera. Finalmente, si la variable es un arreglo, se describen las propiedades de los items dentro de ese arreglo.

### 2.2 Arquitectura de la solución

![](database/Diagrama.png)

### 2.3 Frontend

Para el frontend, utilizamos React Native para la creacion y maniuplacion de la Web Page. Intsalamos las librerias/dependencias con yarn/npm (react). Para la base y diseño de la página, se utilizo HTML y estilos CSS en la aplicación. En la carpeta de *src/components*, se encuentran los archivos de cada componente de la Web Page (incluido los aggregate).

*(https://github.com/facebook/create-react-app).*

#### 2.3.1 Lenguaje de programación
Javascript, HTML, CSS
#### 2.3.2 Framework
React
#### 2.3.3 Librerías de funciones o dependencias
Node, Bootstrap, Axios, Yarn/NPM

### 2.4 Backend

Para el *backend*, tenemos nuestra base de datos en *MongoAtlas*; para probar los queries y agregaciones utilizamos *MongoDBCompass*; Para probar los POST y GET de los queries y agregaciones utilizamos *Postman*. En la carpeta de *models* tenemos el *schema* de cada uno de los documentos, y en la carpeta de *controllers* tenemos cada controlador de cada documento, donde agarra su *schema* de *models* yse hacen los POST.

#### 2.4.1 Lenguaje de programación
Javascript, JSON.
#### 2.4.2 Framework
Mongoose
#### 2.4.3 Librerías de funciones o dependencias
Express, Node, Mongoose

## 2.5 Pasos a seguir para utilizar la aplicación

#### 1. Clonar el repositorio utilizando github, seleccionando la carpeta deseada en donde clonar el repositorio y correr el comando: [$git clone https://github.com/tec-csf/tc3041-t3-primavera-2020-equipo6.git]
#### 2. Entrar al repositorio clonado, donde se pueden ver todas las carpetas y archivos del proyecto.
#### 3. Entrar a la carpeta *frontend*, abrir una terminal CMD y correr el comando: *npm install*. Despues de unos cuantos segundos las librerias necesarias seran descargadas en tu ordenador.
#### 4. Nos volvemos a la carpeta principal, y repetimos el paso *3* en la carpeta *backend*.
#### 5. Una vez instaladas las dependencias, utilizamos el comando *node server.js* dentro de la carpeta *backend* para iniciar el servidor en el puerto 8080 y conectarnos a la base de datos.
#### 6. Nos regresamos a la carpeta de *frontend* y volvemos a abrir la terminal, donde corremos el comando *npm start* para iniciar el frontend de la web application. En unos segundos se nos abrirá una nueva pestaña en nuestro navegador de preferencia con la web page.
#### 7. La web page nos recibe en la seccion de *Directores*, donde podemos ver varios botones y funcionalidades *CRUD*, en la barra superior se encuentran los registros de "Director, Actor, Pelicula, Proyeccion, Sala y Cine".
![](database/page1.png)
#### 8. En la barra de *Search*, podemos buscar por nombre a los Directores, Actores, Peliculas y Cines. En el caso de Proyeccion es por precio y Sala es por numero.
![](database/pagesearch.png)
#### 9. Si seleccionamos un nombre, nos da el resto de la información sobre el/ella y la opción de editarlo.
![](database/pageselect.png)
#### 10. Dentro del editor, se pueden modificar todas las propiedades del objeto (incluido el ID, pero si llegara a coincidir con otro, la edicion sera rechazada). Tambien, se puede eliminar el objeto con el boton rojo de *Delete*.
![](database/pageedit.png)
#### 11. En la sección de *Agregaciones*, el usuario puede hacer 5 consultas diferentes utilizanod varias etapas de agregación:
1. Social Network te muestra una lista de actores, seleccionando a uno nos muestra su nombre y su red social, la cual es toda su lista de los amigos de sus amigos (graphLookup).
2. Facet devuelve las peliculas por diferentes categorias, por genero de cine y por carrera de director.
3. El boton 3 te deja buscar un país y te muestra las peliculas actuadas por actores/actrices con respectivo país de origen.
4. Busca un actor y te muestra todas las peliculas que ha actuado ese actor.
5. Finalmente, al insertar tus coordenadas (actualmente solo funciona en EU) te muestra todos los cines cercanos a ti, incluyendo sus peliculas que estan proyectando ahorita (geoNear).

## 3. Referencias

https://medium.com/@nishankjaintdk/setting-up-a-node-js-app-on-a-linux-ami-on-an-aws-ec2-instance-with-nginx-59cbc1bcc68c

https://bezkoder.com/react-node-express-mongodb-mern-stack/

https://bezkoder.com/node-express-mongodb-crud-rest-api/

https://bezkoder.com/node-express-mongodb-crud-rest-api/

http://ec2-3-22-119-16.us-east-2.compute.amazonaws.com:8081
