/**
 * This file is meant to be where you will complete the utility function below, for performing a conversion of some amount
 * to another currency.
 */

/**
 * TODO:
 * @receives two currency objects, currencyA and currencyB, as well as an integer-amount of cash in currencyA
 * @performs a currency conversion between integer amount of currencyA to an integer amount of currencyB
 * @returns an integer
 */
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

module.exports = convertCurrency