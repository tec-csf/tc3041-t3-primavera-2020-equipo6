import http from "../http-common";

class DirectorDataService {
  getAll() {
    return http.get("/directors");
  }

  get(id) {
    return http.get(`/directors/${id}`);
  }

  create(data) {
    return http.post("/directors", data);
  }

  update(id, data) {
    return http.put(`/directors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/directors/${id}`);
  }

  deleteAll() {
    return http.delete(`/directors`);
  }

  findByNombre(title) {
    return http.get(`/directors?nombre=${title}`);
  }
}

export default new DirectorDataService();