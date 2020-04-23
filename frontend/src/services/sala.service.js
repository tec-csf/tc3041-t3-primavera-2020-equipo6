import http from "../http-common";

class SalaDataService {
  getAll() {
    return http.get("/salas");
  }

  get(id) {
    return http.get(`/salas/${id}`);
  }

  create(data) {
    return http.post("/salas", data);
  }

  update(id, data) {
    return http.put(`/salas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/salas/${id}`);
  }

  deleteAll() {
    return http.delete(`/salas`);
  }

  findByNumero(numero) {
    return http.get(`/salas?numero=${numero}`);
  }
}

export default new SalaDataService();
