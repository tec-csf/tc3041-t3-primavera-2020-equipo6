import http from "../http-common";

class ProyeccionDataService {
  getAll() {
    return http.get("/proyeccions");
  }

  get(id) {
    return http.get(`/proyeccions/${id}`);
  }

  create(data) {
    return http.post("/proyeccions", data);
  }

  update(id, data) {
    return http.put(`/proyeccions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/proyeccions/${id}`);
  }

  deleteAll() {
    return http.delete(`/proyeccions`);
  }

  findByNombre(title) {
    return http.get(`/proyeccions?nombre=${title}`);
  }
}

export default new ProyeccionDataService();