// const web3 = require("@solana/web3.js");

// const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
// //For checking whether the connection is successfully made
// console.log(connection);

// const userWallet=web3.Keypair.generate();
// console.log(userWallet);

// const userWallet=web3.Keypair.fromSecretKey(Uint8Array.from(userSecretKey));

// const transaction=new web3.Transaction().add(
//     web3.SystemProgram.transfer({
//         fromPubkey:new web3.PublicKey(from.publicKey.toString()),
//         toPubkey:new web3.PublicKey(to.publicKey.toString()),
//         lamports:web3.LAMPORTS_PER_SOL
//     })
// );

// const web3 = require("@solana/web3.js");

// const transferSOL=async (from,to,transferAmt)=>{
//     try{
//         const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//         const transaction=new web3.Transaction().add(
//             web3.SystemProgram.transfer({
//                 fromPubkey:new web3.PublicKey(from.publicKey.toString()),
//                 toPubkey:new web3.PublicKey(to.publicKey.toString()),
//                 lamports:transferAmt*web3.LAMPORTS_PER_SOL
//             })
//         )
//         const signature=await web3.sendAndConfirmTransaction(
//             connection,
//             transaction,
//             [from]
//         )
//         return signature;
//     }catch(err){
//         console.log(err);
//     }
// }

// const getWalletBalance=async (pubk)=>{
//     try{
//         const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//         const balance=await connection.getBalance(new web3.PublicKey(pubk));
//         return balance/web3.LAMPORTS_PER_SOL;
//     }catch(err){
//         console.log(err);
//     }
// }

// const { getReturnAmount, totalAmtToBePaid, randomNumber } = require('./helper');
// const {getWalletBalance,transferSOL,airDropSol}=require("./solana");

const chalk = require("chalk");
const web3 = require("@solana/web3.js");
const { logo,getReturnAmount, totalAmtToBePaid, randomNumber } = require('./helper');
const {getWalletBalance,transferSOL,airDropSol}=require("./solana");
const {getGuessNumber,getRatio,getStake}=require("./asks");


//bank wallet
const newPair1 = new web3.Keypair();
playerSecretKey=[
   79,   9, 173,  14, 150, 110, 246,  43, 248, 134,
    3, 120,  12, 250, 227,  59, 230, 126, 163,  36,
  250, 115, 117, 188,  81, 147, 113, 213, 153,  26,
  212,  92, 228, 150, 214, 122, 175, 252,  18, 223,
  182, 200, 183, 215, 146, 193, 109, 120, 138, 122,
   13,  39, 192, 101, 167, 196,  75, 207, 122,  71,
  143, 132, 196, 209
]
const playerWallet=web3.Keypair.fromSecretKey(Uint8Array.from(playerSecretKey));

//bank wallet

const bankSecretKey=[
  239, 229,  26,  85, 53, 251,  85, 147, 173, 121, 215,
  162,  54,   6,  61, 31, 207,  96,  68,  65, 183,  50,
  168, 243, 131, 109, 73,  89, 244, 141,  64, 168, 181,
  150, 251, 145,  52, 73,  71,  66, 185, 219,  53, 156,
  252, 249, 147,  52,  6, 195, 245, 138, 137,  41, 198,
  121,  78,   6,   0, 72, 206, 211,  77,  46
]
const bankWallet=web3.Keypair.fromSecretKey(Uint8Array.from(bankSecretKey));



const gameExecution =async()=>{
  logo()
  console.log(chalk.yellow('the max binding amount is 2.5 SOL'));
  const {stake} = await getStake()
  const {ratio} = await getRatio()
  console.log(`You need to pay ${chalk.green(stake)} for move forward`)
  const reward = getReturnAmount(ratio,stake)
  console.log(chalk.green(`You will get ${reward} if guessing the number correctly`))
  
  const balance = await getWalletBalance(playerWallet)
  console.log(chalk.blue(`Your balance: ${balance}SOL`));

  if(balance<stake){
    console.log(chalk.red("Not enough SOL"))
    return
  }

  const randomNumberRes =randomNumber()
  console.log(randomNumberRes)
  const {guessNumber} = await getGuessNumber()
  const paymentSignarture = await transferSOL(playerWallet,bankWallet,stake)
  console.log(chalk.green(`Payment signature: ${paymentSignarture}`))
  if(randomNumberRes===guessNumber){
    const prizeSignature = await transferSOL(bankWallet,playerWallet,reward)
    console.log(chalk.green("Correct !!!"))
    console.log(chalk.green(`Prize signature: ${prizeSignature}`))
  }else{
    console.log(chalk.red('Better luck next time'))
  }
}

gameExecution()