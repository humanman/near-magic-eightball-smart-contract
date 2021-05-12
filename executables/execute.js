// *************************************************************** //
// BELOW CODE CAN BE FOUND FROM the figment tutorial on NEAR

// https://learn.figment.io/network-documentation/near/tutorials/intro-pathway-write-and-deploy-your-first-near-smart-contract/5.-writing-and-deploying-your-first-near-smart-contract
// *************************************************************** //

// Load environment variables
require("dotenv").config();

// Load NEAR Javascript API components
const near = require("near-api-js");

// Directory where NEAR credentials are going to be stored
const credentialsPath = "./credentials";

// Configure the keyStore to be used with the NEAR Javascript API
const UnencryptedFileSystemKeyStore = near.keyStores.UnencryptedFileSystemKeyStore;
const keyStore = new UnencryptedFileSystemKeyStore(credentialsPath)
console.log('key store', keyStore)
// Setup default client options
const options = {
  networkId: process.env.NEAR_NETWORK,
  nodeUrl: process.env.NEAR_NODE_URL,
  walletUrl: `https://wallet.${process.env.NEAR_NETWORK}.near.org`,
  helperUrl: `https://helper.${process.env.NEAR_NETWORK}.near.org`,
  explorerUrl: `https://explorer.${process.env.NEAR_NETWORK}.near.org`,
  accountId: process.env.NEAR_ACCOUNT,
  deps: {
    keyStore: keyStore
  }
}

async function main() {
  // Configure the client with options and our local key store
  const client = await near.connect(options);
  const account = await client.account(options.accountId);

  // // We're using the same contract name, feel free to create a different one.
  const contractName = options.accountId;

  // // Construct a new contract object, we'll be using it to perform calls
  const contract = new near.Contract(account, contractName, {
    // viewMethods: [""],   // TODO: add methods to list answers + previously asked questions
    changeMethods: ["answerMyQuestion","addNewAnswerToMagic8Ball", "seedAnswers"], // our write function
    sender: options.accountId   // account used to sign contract call transactions
  });
 

  // // We will send the current date when calling `answerMyQuestion`
  const value = "Will I be a NEARionnaire?";

  console.log(`Calling contract call 'answerMyQuestion' with '${value}'`);
  const result = await contract.answerMyQuestion({ question: value });

  // // Log magic8Ball's response
  console.log("ResultAsked:", result);
  const newAnswer = "Hmm... I'm not sure about that."
  // const newItem = await contract.addNewAnswerToMagic8Ball({ answerToAdd: "I am not sure about that." });
  // console.log("ResultAdded:", newItem);
};

main();

// $watch -d -n 1 yarn storage $CONTRACT