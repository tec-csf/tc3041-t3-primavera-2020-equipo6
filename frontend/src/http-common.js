import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-3-22-119-16.us-east-2.compute.amazonaws.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});