import http from "../http-common";

class PeliculaDataService {
  getAll() {
    return http.get("/peliculas");
  }

  get(id) {
    return http.get(`/peliculas/${id}`);
  }

  create(data) {
    return http.post("/peliculas", data);
  }

  update(id, data) {
    return http.put(`/peliculas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/peliculas/${id}`);
  }

  deleteAll() {
    return http.delete(`/peliculas`);
  }

  findByNombre(title) {
    return http.get(`/peliculas?nombre=${title}`);
  }
}

export default new PeliculaDataService();