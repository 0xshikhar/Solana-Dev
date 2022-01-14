var figlet = require('figlet');

const getReturnAmount = (ratio,staked) => {
  const arrRatio = ratio.split(":");
  return staked*parseFloat(arrRatio[1])
}
const totalAmtToBePaid = () => {
}
const randomNumber = () => {
  return Math.round(Math.random() * 5)
}
const logo = ()=>{
  console.log(figlet.textSync('SOL stake', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: false
  }));
}

exports.getReturnAmount = getReturnAmount
exports.randomNumber = randomNumber
exports.logo = logo