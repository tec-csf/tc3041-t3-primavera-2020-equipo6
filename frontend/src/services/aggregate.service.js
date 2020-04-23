import http from "../http-common";

class AggregateDataService {
  socialNetwork() {
    return http.get(`/aggregates/social`);
  }

  facet() {
    return http.get(`/aggregates/facet`);
  }

  nation() {
    return http.get("/aggregates/nation");
  }

  moviesByActor(nombre) {
    return http.get(`/aggregates/actor/${nombre}`);
  }

  location(ubicacion) {
    return http.get(`/aggregates/geo/${ubicacion}`);
  }
}

export default new AggregateDataService();