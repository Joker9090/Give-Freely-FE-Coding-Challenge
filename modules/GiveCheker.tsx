import { ApiConfig, ApiModule } from "~helpers/api"
import { ApiModuleResponse, WebsiteType } from "~models/models";

export class GiveChecker {
  searcherDOM?: HTMLTextAreaElement;
  searcherHolderDOM?: HTMLElement;
  floatingDOM?: HTMLDivElement;
  bannerDOM?: HTMLDivElement;
  searchList?: HTMLElement;
  apiResults?: ApiModuleResponse;
  domainSelected?: string;
  domain?: string;

  constructor(isTesting: boolean = false) {
    if(!isTesting) this.init()
    this.clickOnFloating = this.clickOnFloating.bind(this)
  }

  init() {
    this.loadStyles()
    this.callAPI()
      .then((response) => this.handleAPISuccess(response))
      .catch(this.handleAPIError)
  }
  
  callAPI(): Promise<ApiModuleResponse> {
    return ApiModule(ApiConfig).call()
  }

  checkSearchList(){
    const ele = document.querySelector('#center_col')
    if(ele) {
      this.searchList = ele as HTMLElement;
      return this.searchList;
    }
  }

  checkResults() {
    // var els = this.searchList.childNodes // OLD VERSION, is not bad but need more filtering
    var els = this.searchList.querySelectorAll("cite");
    var array = Array.prototype.slice.call(els);
    const websites = this.apiResults.record.websites;
    for(var k = 0; k < array.length; k++){
      const ele = array[k];
      for(var i = 0; i < websites.length; i++){
        const websiteData = websites[i];
        if((array[k] as HTMLElement).innerHTML.indexOf(websiteData.url) != -1){
          this.drawResultInSearch(array[k].parentElement.parentElement, websiteData, "url")
        }
        // OLD VERSION, is not bad but need more filtering
        /* 
        if(array[k].innerHTML.indexOf(websiteData.url) > -1){
          this.drawResultInSearch(array[k], websiteData, "url")
        }

        */
        // Remove Name Checker coz will highlight everything
        /* 
        if(array[k].innerHTML.indexOf(websiteData.name) > -1){
          this.drawResultInSearch(array[k], websiteData, "name")
        }
        */
      }
    }
  }

  grabDomainFromBrowser() {
    if(!this.domain) this.domain = window.location.href
    return this.domain;
  }
  
  checkDomains() {
    const domain = this.grabDomainFromBrowser()
    const domainsToCheck = this.apiResults.record.websites.map(w => w.url)
    if(domain.indexOf("www.google.com") != -1){
      this.domainSelected = "google.com";
      const searcherDOM = this.grabSearcher();
      if (searcherDOM) {
        this.searcherDOM = searcherDOM;
        const searcherHolder = this.grabSearchHolder();
        if (searcherHolder) this.searcherHolderDOM = searcherHolder;
      }
        const exist = this.checkSearchList();
        if(exist) this.checkResults();
        this.createFloating()
    } else {
      for (let index = 0; index < domainsToCheck.length; index++) {
        const d = domainsToCheck[index];
        if(domain.indexOf(domainsToCheck[index]) != -1) {
          this.domainSelected = domainsToCheck[index];
          const websiteSelected = this.apiResults.record.websites.find(w => w.url == d)
          this.createBanner(websiteSelected)
        }
      }
    }
   
  }

  handleAPISuccess(results: ApiModuleResponse) {
    this.apiResults = results;
    this.checkDomains()
    
  }
  
  handleAPIError() {
    console.error("GIVE > There was an error loading Give API")
  }

  getRandomWebsite() {
    return this.apiResults.record.websites[Math.floor(Math.random() * ((this.apiResults.record.websites.length -1) - 0 + 1) + 0)]
  }

  getRandomMessageFrom(website: WebsiteType) {
    return website.messages[Math.floor(Math.random() * ((website.messages.length -1) - 0 + 1) + 0)]
  }

  createBanner(website: WebsiteType) {
    this.bannerDOM = document.createElement("div")
    this.bannerDOM.setAttribute("give-attr", "banner")
    const p = document.createElement("p")
    p.appendChild(document.createTextNode(this.getRandomMessageFrom(website)));
    this.bannerDOM.append(p)
    document.body.append(this.bannerDOM)
  }

  drawResultInSearch(ele: HTMLElement, websiteData: WebsiteType, match: string) {    
    ele.setAttribute("give-attr", "result-match")
  }

  loadStyles() {
    //@ts-ignore
    import("~/internalAssets/giveStyles.css")
  }

  killDOMAfter(ele: HTMLElement, time: number) {
    setTimeout(() => {
      ele.remove()
    },time)
  }

  clickOnFloating() {
    const messageDOM = document.createElement("div");
    messageDOM.setAttribute("give-attr", "floating-message");
    const randomWebsite = this.getRandomWebsite();
    // Name
    const n = document.createElement("p");
    n.appendChild(document.createTextNode(randomWebsite.name));
    messageDOM.append(n)
    // Message
    const m = document.createElement("p");
    m.appendChild(document.createTextNode(this.getRandomMessageFrom(randomWebsite)));
    messageDOM.append(m)
    document.body.append(messageDOM)

    this.killDOMAfter(messageDOM, 3000)
  }

  createFloating() {
    this.floatingDOM = document.createElement("div")
    this.floatingDOM.setAttribute("give-attr", "floating")
    this.floatingDOM.addEventListener("click", this.clickOnFloating);
    document.body.append(this.floatingDOM)
  }
  
  grabSearcher() {
    const ele = document.querySelectorAll("textarea")[0];
    if (ele) {
      ele.setAttribute("give-attr", "searcher")
      return ele;
    }
  }

  grabSearchHolder() {
    if (this.searcherDOM) {
      const ele = this.searcherDOM.parentElement.parentElement.parentElement;
      ele.setAttribute("give-attr", "searcher-holder")
      return ele;
    }
  }
}
