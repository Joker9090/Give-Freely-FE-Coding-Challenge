# Give Freely Front End Coding Challenge

 Welcome to the Give Freely Front End Engineer Coding Challenge Interview GitHub project!

For this challenge, you will use the this project to create a small extension that modifies the google search page, as well as creating a pop up on a set of pages provided by an API.

API Spec:
```json
{
    "websites":[
        {
            "name":"TripAdvisor",
            "url":"www.tripadvisor.com",
            "messages":["Thank you","Please shop on our site","sometihng else"],
        },
        {
            "name":"Uber",
            "url":"www.uber.com",
            "messages":["Thank you","Please shop on our site","sometihng else"],
        }
    ]
}
```

### Functional Requirements:
1. Anytime a base url from the API shows up as part of a google search results, create a border around that search result that highlights it to show as a particpant in this extensions product.
2. Add a bell notification to the google search results page that, when clicked, shows a modal with a random message from the messages within the API response and show the Name and Message from the company.
3. When the user navigates one of the sites listed in the API, create a banner at the top of the page that displays one of the messages from their messages array in the API call
4. When the user clicks on the extension (`popup.tsx`), list all the companies in the API call, and when clicked, show the messages from that company, with the ability to go back and select a new company.


### Non-Functional Requirements
1. This project template has been provided as a starting point using the Plasmo Framework, however, if you would like to generate your own extension project, you may. Please ensure you use React and TypeScript, and that it works in Chrome.

2. The code submitted should be production level quality, including tests.

3. You are welcome to design each component as you like, please make sure each section looks polished. 

4. This challenge should take you 3-4 hours. If you hit the end of that time and have more to add, please include a note with the items you were unable to get to


#### Data Access:
*URL:* `https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8`
##### Authentication:
*Header:* X-Access-Key

*Value:* `$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om`

## Submission
Please fork this repository and send your forked repo once completed.

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

## Developer Notes

The project is using node v16.14.
if you are using nvm you can run
```bash
nvm use 16.14
``````

The script is checking for "cite" elements inside checkResults methods, is not checking those that came as Adds.

There is a new npm cmd to run test

```bash
npm run test
``````