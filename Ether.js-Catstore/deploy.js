const ethers = require("ethers");

//Reading from bin and abi:

const fs = require("fs-extra");

// get dotenv
require("dotenv").config();

async function main() {
  //compile them in our code
  //compile them
  //http:/127.0.0.1:8545

  //Telling our script how we will connect to ganache through ether.js
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  //We use let to connect wallet to provider
  //fromEncryptedJsonSync takes the encryptedjson key and password and returns a wallet object
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);
  //connecting with private key
  //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  //getting the abi and binary

  const abi = fs.readFileSync("./catstore.sol.abi", "utf8");
  const binary = fs.readFileSync("./catstore.sol.bin", "utf8");

  // deploying the contract

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); //STOP wait let contract deploy
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);
  //Interacting readnoofcatbreeds

  const currentNofCatbreeds = await contract.readnoofcatbreeds();

  //String interpolation: mixing variables with string
  //Telling JS that this is A Variable that we want to read we put ${}
  console.log(`Current Favorite Number:${currentNofCatbreeds.toString()}`);

  const transactionResponse = await contract.storenoofcatbreeds("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedNofCatbreeds = await contract.readnoofcatbreeds();
  console.log(`Updated favorite number is: ${updatedNofCatbreeds}`);
}

//syntax for working with async function to
//wait to finish and print out any error

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//deploy script mimicks remix
