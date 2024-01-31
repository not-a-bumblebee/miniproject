
const App = () => {

  const login = () => {

  }
  const signUp = () => {

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
    let res = await (await fetch('http://localhost:3001/api/currency', {
      method: 'POST', body: JSON.stringify(body), headers: {
        'Content-Type': 'application/json',
      },
    })).json()
    console.log(res);
  }
  const deleteCurrency = async (e) => {
    let currencyCode = e.target.parentNode.children[0].value.toUpperCase();
    console.log(currencyCode);
    let res1 = await (await fetch('http://localhost:3001/api/currency/')).json()

    let id = res1.find(x=>x.currencyCode == currencyCode).id;
    console.log(id);

    let res2 = await fetch('http://localhost:3001/api/currency/' + id, { method: "DELETE" })
    console.log(res2);
  }
  const updateCurrency = async (e) => {
    let currencyCode = e.target.parentNode.children[0].value.toUpperCase();
    console.log(currencyCode);
    let res1 = await (await fetch('http://localhost:3001/api/currency/')).json()

    let id = res1.find(x=>x.currencyCode == currencyCode).id;
    console.log(id);
    let amount = e.target.parentNode.children[1].value
    let res2 = await (await fetch('http://localhost:3001/api/currency/' + id + '/' + amount, { method: 'PUT' })).json()
    console.log(res2);
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
        <button>CONVERT</button>
        <input type="text" placeholder="converted amount" disabled />
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
