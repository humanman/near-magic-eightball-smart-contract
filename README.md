Magic Eight Ball Smart Contract
-------------------------------


![Magic Eight Ball Logo](assets/Magic-8-Ball-Logo-1-300x172.jpeg)

Will I become a NEARionaire? 
Should I make pasta tonight?
Am I too old to Tik and/or Tok?

These are some of the pressing questions we face everyday. Luckily, we finally have Magic Eight Ball &trade; on the blockchain to help answer them!

Overview
--------

This Smart Contract takes a question, and returns an answer randomly, er, magically selected from a list of answers.
In addition, a user can:
* retrieve a list of all available answers
* add a unique answer to the list of answers
* retrieve a list of previous questions with the answers that were given.
* save their answered question to a list of previous questions.

Currently, this app runs exclusively from the terminal, but you can imagine how cool a front end for this could be. I asked the magic eight ball if I should make one, and it said, "ask again later". So, I guess we will just worry about getting the contract up and running for now.

Local Set Up
------------

After you've cloned this repo, Go ahead and run `yarn` in the terminal of the project's root directory.

You will need to configure your deployment environment if you haven't already. It's pretty simple. You need to make sure you have a NEAR account associated with your contract, and that this account has commit permission to wherever you plan to deploy the contract, e.g GitHub. If this is new to you, don't worry. Head over to this [Figment Tutorial](https://learn.figment.io/network-documentation/near/tutorials/intro-pathway-write-and-deploy-your-first-near-smart-contract/1.-connecting-to-a-near-node-using-datahub), to learn how to create an account, and configure your deployment environment. In fact, if you haven't already, please take an hour or so to complete it.That entire tutorial is amazing! 

After you've set up your `credentials/` directory with your _TestNet_ account for your contract your `.env` file should look something like this: 

```.env
NEAR_NODE_URL=https://near-testnet--rpc.datahub.figment.io/apikey/009090909090909090909090
NEAR_NETWORK=testnet
NEAR_ACCOUNT=my-magic-eightball-contract.testnet
DATAHUB_API_KEY=009090909090909090909090
```
These variables will be used when we deploy.

Test
----


