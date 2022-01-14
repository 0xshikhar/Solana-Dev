var inquirer = require('inquirer');

const getStake = () =>{
  return inquirer.prompt({
    type: 'number',
    name: 'stake',
    message: "What is the amount of SOL you want to stake?",
    validate(value){
      if(value<=2.5){
        return true
      }
      return 'max stack ius 2.5 SOL';
    }
  })
}
const getRatio = () =>{
  return inquirer.prompt({
    type: 'rawlist',
    name: 'ratio',
    message: "What's the ratio of your staking?",
    choices: ["1:1.25", "1:1.5", "1.75", "1:2"],
  }) 
}

const getGuessNumber = () =>{
  return inquirer.prompt({
    type: 'number',
    name: 'guessNumber',
    message: "Guess a random number from 1 to 5 (both 1,5 included)",
  })
}

exports.getStake = getStake
exports.getRatio = getRatio
exports.getGuessNumber = getGuessNumber

