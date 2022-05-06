# NFT Marketplace - Lets Build a Rug Pull

## ART

1) To start with a collection, you need art. To make Art, its ideal to have a photo editor if you want it to be spiffy, otherwise, Powerpoint (PPT) is fine

Using a Photo Editor, we will need to create:
-PNG file(s) that are of our art
-Metadata file(s) that correspond to our art

2) Next, we will upload these files to IPFS (https://www.pinata.cloud)
3) Create a front end using:
-[Next.js](https://nextjs.org/) - to handle routing
-[Tailwindcss](https://tailwindcss.com/)

4) Create NFT Smart Contract on Rinkeby Testnet and integrate front end to communicate with NFT contract.

To Run this:
pip install react
npm install react react-dom
npm install merkletreejs keccak256 --force
npm install @alch/alchemy-web3 --force
npm i @nomiclabs/hardhat-etherscan --force

 npx hardhat run scripts/deployContracts.js --network

installs npm install hardhat ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers @openzeppelin/contracts dotenv

5) Compile the smart contract
Before compiliation:
- ensure whitelist addresseses are set
- ensure the .env file has the following:
    a) NEXT_PUBLIC_ALCHEMY_RPCURL=url of api setup with https://www.alchemy.com/
    b) NEXT_PUBLIC_FORMATIC_KEY=pk_test_871FF65535DB9AA2
    c) NEXT_PUBLIC_DAPP_ID=80ca0f11-a118-4898-b48f-5f5c3c21007c
    d) METAMASK_PRIVATE_KEY=<private key of meta maskwallet>
    e) ETHERSCAN_API_KEY=K2NBCJ5AJB2499UK7UB7IURUTTT2VMFA94
To compile and get the artifacts file:

npx hardhat compile 


the smart contract



This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
https://rinkeby.etherscan.io/address/0xcCE228DA3671347111c6480e07D04a25ABA4eaD5#code