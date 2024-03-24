/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";
import {http, rest} from 'msw'
import {setupServer} from 'msw/node'
/**
 * Import all the related component(s) here:
 * 
 * 
 */

/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */


const mockData =[
    {
        "id": 2,
        "currencyCode": "US",
        "countryId": 2,
        "conversionRate": 4.1
    },
    {
        "id": 9,
        "currencyCode": "PASTA",
        "countryId": 7,
        "conversionRate": 2.2
    },
    {
        "id": 10,
        "currencyCode": "USD",
        "countryId": 2,
        "conversionRate": 0.75
    },
    {
        "id": 1,
        "currencyCode": "CAD",
        "countryId": 1,
        "conversionRate": 2
    }
]


const server = setupServer(
    // rest.get('/api/currency', (req, res, ctx) => {
    //   return res(ctx.json(mockData))
    // }),
    http.get('/api/currency', () => {
        return new Response(JSON.stringify(mockData),{
        headers:{
            'Content-Type': 'application/json',
        }
      })
    }),
  
    
  )

  beforeAll(() => server.listen())
  afterAll(() => server.close())

test('Testing conversion section', async () => {




    // convertCurrency is a mock function now
    render(<App />)

    const convertCurrency = require('../../utils/currency_utils')

    console.log(convertCurrency);
    const user = userEvent.setup();


    // Your code here
    await user.type(screen.getAllByPlaceholderText("currency code")[0], 'USD');
    await user.type(screen.getAllByPlaceholderText("amount")[0], '50');
    await user.click(screen.getByText("CONVERT"))
    console.log(screen.getAllByPlaceholderText("currency code")[0].value);

    console.log(screen.getAllByPlaceholderText("currency code")[0].value);
    expect(screen.getAllByPlaceholderText("currency code")[0]).toHaveValue('USD')
    expect(screen.getAllByPlaceholderText("amount")[0]).toHaveValue('50')
    await waitFor(async () => {
        const input = await screen.findByTestId('output');
        let a = convertCurrency({ conversionRate: 1 }, { conversionRate: 0.75 }, '50')


        expect(parseFloat(input.value)).toBe(a)

    })


});


