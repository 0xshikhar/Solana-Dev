// Solana Airdrop Program Quest
// Developed By Shikhar Singh

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");


const newPair = new Keypair(); // wallet object of type Keypair for airdropping SOL
console.log(newPair);

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
// extracting the public key from accountInfo and 
// storing it in a new variable called myPublicKey which is of type string
console.log("Public Key");
console.log(publicKey);


const secretKey = newPair._keypair.secretKey

const getWalletBalance = async () => {
    try {
        console.log("getWalletBalance called");

        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // Creates a connection object that’ll be used to get the balance

        const myWallet = await Keypair.fromSecretKey(secretKey);

        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`Wallet balance: ${walletBalance}`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        console.log("airDropSol called");

        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        // create a connection object and a walletKeyPair object for the airdrop function

        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);

    } catch (err) {
        console.log(err);
    }
};

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();

