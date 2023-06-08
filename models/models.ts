
export type ApiConfigType = {
  url: string,
  token: string,
}

export type WebsiteType = {
  name: string,
  url: string,
  messages: string[]
}

export type ApiModuleResponse = {
  record: {
    websites: WebsiteType[]
  },
  metadata: {
    id: string,
    private: boolean,
    createdAt: string,
    name: string,
  }
}

export type ApiModuleType = {
  call: () => Promise<ApiModuleResponse>,
}

export enum ServerStatus { "LOADING", "SUCCESS", "ERROR" }

