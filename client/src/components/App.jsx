import { useRef } from 'react'
import axios from 'axios'

const App = () => {
  const convertOutput = useRef(null)
  const login = () => {

  }
  const signUp = () => {

  }
  const convertCurrency = (currencyA, currencyB, amount) => {
    // This needs to be implemented
  
    let ratio1 = currencyA.conversionRate;
    let ratio2 = currencyB.conversionRate;
    let money = amount;
    console.log(ratio1,ratio2,money);
  
    if (ratio1 ===1){
      let a = parseFloat((ratio2 * money).toFixed(2))
      console.log(a)
      return a;
    }
    else{
      let a  = money / ratio1
      console.log(typeof ratio2);
      let b =  parseFloat( (a * ratio2).toFixed(2))
      console.log(b);
      return b;
    }
  
  }
  const addCurrency = async (e) => {
    e.preventDefault()
    console.log(e.target.parentNode.children);
    let id = e.target.parentNode.children[0].value
    let currencyCode = e.target.parentNode.children[1].value
    let countryId = e.target.parentNode.children[2].value
    let conversionRate = e.target.parentNode.children[3].value
    let body = { id, currencyCode, countryId, conversionRate }
    console.log(body);
    let res = await (await fetch('/api/currency', {
      method: 'POST', body: JSON.stringify(body), headers: {
        'Content-Type': 'application/json',
      },
    })).json()
    console.log(res);
  }
  const deleteCurrency = async (e) => {
    let currencyCode = e.target.parentNode.children[0].value.toUpperCase();
    console.log(currencyCode);
    let res1 = await (await fetch('/api/currency/')).json()

    let id = res1.find(x => x.currencyCode == currencyCode).id;
    console.log(id);

    let res2 = await fetch('/api/currency/' + id, { method: "DELETE" })
    console.log(res2);
  }
  const updateCurrency = async (e) => {
    let currencyCode = e.target.parentNode.children[0].value.toUpperCase();
    console.log(currencyCode);
    let res1 = await (await fetch('/api/currency/')).json()

    let id = res1.find(x => x.currencyCode == currencyCode).id;
    console.log(id);
    let amount = e.target.parentNode.children[1].value
    let res2 = await (await fetch('/api/currency/' + id + '/' + amount, { method: 'PUT' })).json()
    console.log(res2);
  }

  const convertClick = async (e) => {
    let currencyCode = e.target.parentNode.children[0].value.toUpperCase();
    let amount = e.target.parentNode.children[1].value
    console.log(currencyCode, amount);

    let res = await axios.get('/api/currency/')
    console.log(res.data);

    let a = res.data.find(x=>x.currencyCode==currencyCode);
    console.log(a);
    let final = convertCurrency({conversionRate:1},{conversionRate:a.conversionRate},amount)

    convertOutput.current.value = final
    console.log(e.target.parentNode.children[3]);
    console.log(e.target.parentNode.children[3].value);
  }


  return (
    <div className="main-container">
      <h2>Login</h2>
      <div className="container">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>LOGIN</button>
        <button>SIGN UP</button>
      </div>
      <h2>Convert</h2>
      <div className="container">
        <input type="text" placeholder="currency code" />
        <input type="text" placeholder="amount" />
        <button onClick={convertClick}>CONVERT</button>
        <input data-testid="output" type="text" ref={convertOutput} placeholder="converted amount" disabled />
      </div>
      <h2>Add Currency</h2>

      <div className="container">
        <input type="text" placeholder="id" />
        <input type="text" placeholder="currencyCode" />
        <input type="text" placeholder="countryId" />
        <input type="text" placeholder="conversionRate" />
        <button onClick={addCurrency}>ADD</button>
      </div>
      <h2>Delete</h2>

      <div className="container">
        <input type="text" placeholder="currency code" />
        <button onClick={deleteCurrency}>DELETE</button>
      </div>
      <h2>Update currency</h2>
      <div className="container">
        <input type="text" placeholder="currency code" />
        <input type="text" placeholder="amount" />
        <button onClick={updateCurrency}>UPDATE</button>
      </div>
    </div>
  )
}

export default App
