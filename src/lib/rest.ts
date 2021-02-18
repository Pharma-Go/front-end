import { baseUrl } from "@/environment/environment";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { oauth } from "./OAuth";

declare module "axios" {
  export interface AxiosRequestConfig {
    public?: boolean;
  }
}

export class Rest {
  axios: AxiosInstance;

  constructor(path: string, config: AxiosRequestConfig = {}) {
    this.axios = axios.create({ baseURL: baseUrl + path, ...config });

    this.axios.interceptors.request.use(async req => {
      if (req.public) {
        return req;
      }

      const token = await oauth.fetchOrRefreshAccessToken();

      req.headers.authorization =
        req.headers.authorization ?? `Bearer ${token}`;
      return req;
    });
  }

  async request(config: AxiosRequestConfig = {}) {
    return this.axios(config).then(response => response.data);
  }

  async create(data: any, config: AxiosRequestConfig = {}) {
    return this.request({ method: "POST", data, ...config });
  }

  async update(data: any, config: AxiosRequestConfig = {}) {
    return this.request({ method: "PUT", data, ...config });
  }

  async save(data: any, config: AxiosRequestConfig = {}) {
    return data.id ? this.update(data, config) : this.create(data, config);
  }

  async get(config: AxiosRequestConfig = {}) {
    return this.request({ method: "GET", ...config });
  }

  async getOne(id: string, config: AxiosRequestConfig = {}) {
    return this.request({ method: "GET", url: id, ...config });
  }

  async deleteOne(id: string, config: AxiosRequestConfig = {}) {
    return this.request({ method: "DELETE", url: id, ...config });
  }
}
