import { ApiConfigType, ApiModuleResponse, ApiModuleType } from "~models/models"
import axios from "axios";

export const ApiConfig: ApiConfigType = {
  url: "https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8",
  token: "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"
}

export const ApiModule = (config: ApiConfigType): ApiModuleType => {
  function call() {
    return new Promise<ApiModuleResponse>((resolve, reject) => {
      axios.get(config.url, {
        headers: { "X-Access-Key": config.token }
      })
        .then((response) => resolve(response.data as ApiModuleResponse))
        .catch((e) => reject(e))
    })
  }
  return {
    call
  }
}