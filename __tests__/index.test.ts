import { GiveChecker } from "~modules/GiveCheker";
import { expect, test } from 'vitest'

const isTesting = true
const module = new GiveChecker(isTesting);

const deletePreExistent = () => {
  document.querySelectorAll('[give-attr="floating"]').forEach(i => i.remove())
  document.querySelectorAll('[give-attr="banner"]').forEach(i => i.remove())
}

const checkDomain = async () => {
  const randomDomain = grabRandomDomain()
  module.domain = randomDomain;
  const results = await module.callAPI()
  module.apiResults = results;
  module.checkDomains();
  if (module.domain == "www.random.com") {
    expect(module.domainSelected).toBe(null)
  } else if (module.domain == "www.google.com") {
    expect(module.domainSelected).toBe("google.com")
  } else {
    const grabURL = module.apiResults.record.websites.map(w => w.url).find(f => f.indexOf(module.domain))
    expect(module.domainSelected).toBe(grabURL)
  }
}

const grabRandomDomain = () => {
  const domains = ["www.google.com", "www.uber.com", "www.random.com"]
  const randomPos = Math.floor(Math.random() * ((domains.length - 1) - 0 + 1) + 0)
  return domains[randomPos]
}

test('API Test Endpoint Call', async () => {
  const results = await module.callAPI()
  expect(Object.keys(results).length).toBe(2)
})

test('API Test Endpoint Response', async () => {
  const results = await module.callAPI()
  expect(results.record.websites.length).toBe(3)

})

test('Check domain 1', async () => checkDomain)

test('Check domain 2', async () => checkDomain)

test('Check domain 3', async () => checkDomain)

test('Check banner creation', async () => {
  deletePreExistent()
  const randomDomain = grabRandomDomain()
  module.domain = randomDomain;
  const results = await module.callAPI()
  module.apiResults = results;
  module.checkDomains();
  const grabWebsite = module.apiResults.record.websites.find(f => f.url.indexOf(module.domain))
  module.createBanner(grabWebsite)
  expect(document.querySelectorAll('[give-attr="banner"]').length).toBe(1)
})

test('Check bell floatting GOOD', async () => {
  deletePreExistent()
  const randomDomain = "www.google.com"
  module.domain = randomDomain;
  const results = await module.callAPI()
  module.apiResults = results;
  module.checkDomains();
  expect(document.querySelectorAll('[give-attr="floating"]').length).toBe(1)
})

test('Check bell floatting BAD', async () => {
  deletePreExistent()
  const randomDomain = "www.random.com"
  module.domain = randomDomain;
  const results = await module.callAPI()
  module.apiResults = results;
  module.checkDomains();
  expect(document.querySelectorAll('[give-attr="floating"]').length).toBe(0)
})