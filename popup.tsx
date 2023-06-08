import React from "react"
import { ApiConfig, ApiModule } from "~helpers/api"
import { ApiModuleResponse, ServerStatus, WebsiteType } from "~models/models"

const checkDomain = () => {
  return window.location.href.indexOf("www.google.com") != -1
}
function IndexPopup() {
  const [data, setData] = React.useState<ApiModuleResponse>()
  const [status, setStatus] = React.useState<ServerStatus>(ServerStatus.LOADING)

  const checkPage = () => {
    if(checkDomain()) {
      const searchBar = document.querySelectorAll("textarea")[0]
      console.log("searchBar",searchBar)
    }
    
  }
  React.useEffect(() => {
    const apiModule = ApiModule(ApiConfig)
    checkPage();
    apiModule.call()
      .then((result) => {
        setData(result);
        setStatus(ServerStatus.SUCCESS);
      })
      .catch((e) => setStatus(ServerStatus.ERROR))
  }, [])

  return (
    <div style={{ display: "flex", width: "300px", flexDirection: "column", padding: 8 }}>
      <h3> Welcome to your Plasmo Extension!</h3>
      {status == ServerStatus.LOADING && <Loading />}
      {status == ServerStatus.SUCCESS && data != undefined && (<Navigation {...data} />)}
    </div>
  )
}

export const Navigation = ({ record }: ApiModuleResponse) => {
  const [website, setWebsite] = React.useState<WebsiteType>()

  if(website) return (
    <div style={{}}>
      <h4>{website.name}</h4>
      <ul style={{ padding: "0px", listStyle: "none" }}>
        {website.messages.map((message) => (
          <li key={message}>
            <p style={{ marginLeft: "10px" }}>{message}</p>
          </li>
        ))}
      </ul>
      <h4 style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => setWebsite(undefined)}>Back</h4>
    </div>
  )
  return (
    <ul style={{ padding: "0px", listStyle: "none" }}>
      {record.websites.map((website) => (
        <li key={website.name} onClick={() => setWebsite(website)}>
          <p style={{ marginLeft: "10px", cursor: "pointer" }}>{website.name}</p>
        </li>
      ))}
    </ul>
  )
}
export const Loading = () => {
  return (
    <div className="loading">Loading...</div>
  )
}
export default IndexPopup
