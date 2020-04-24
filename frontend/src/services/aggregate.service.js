import http from "../http-common";

class AggregateDataService {
  socialNetwork() {
    return http.get(`/aggregates/social`);
  }

  facet() {
    return http.get(`/aggregates/facet`);
  }

  nation(pais) {
    return http.get(`/aggregates/nation/${pais}`);
  }

  moviesByActor(nombre) {
    return http.get(`/aggregates/actor/${nombre}`);
  }

  location(longitud, latitud) {
    return http.get(`/aggregates/geo/${longitud}/${latitud}`);
  }
}

export default new AggregateDataService();