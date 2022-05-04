/**
 *  This array contains the addresses of the whitelisted users.
 *  Make sure to add your white-listed users to this array. Otherwise,
 *  they will not be able to interact with the contract and mint on pre-sale process. For the public sale,
 *  the whitelist is not required.
 *
 *  ** IMPORTANT: **
 *  Since we are passing the whitelist root (merkleroot) to the contract constructor when deploying,
 *  if you add a new user address to the whitelist or remove an existing user address from the whitelist,
 *  you must change the merkleroot in the contract. For this reason, I created a new script to update the merkleroot
 *  in the contract. You can find it in `scripts/setMerkleRoot.js`.
 */

module.exports = [
  '0xA821241d0a43EEcE179B91e8EB57ED10Dc63507D',
  '0xC94D14C001012c657977dB30E76A23087f2464Ef',
  '0xbb6c74C9e991f41825a6d5e8ec78270d9c7768c9',
  '0xCFcf791ede9f33107b40b01d81708032a7e267E1'
]
