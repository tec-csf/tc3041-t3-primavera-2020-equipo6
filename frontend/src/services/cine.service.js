import http from "../http-common";

class CineDataService {
  getAll() {
    return http.get("/cines");
  }

  get(id) {
    return http.get(`/cines/${id}`);
  }

  create(data) {
    return http.post("/cines", data);
  }

  update(id, data) {
    return http.put(`/cines/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cines/${id}`);
  }

  deleteAll() {
    return http.delete(`/cines`);
  }

  findByNombre(title) {
    return http.get(`/cines?nombre=${title}`);
  }
}

export default new CineDataService();