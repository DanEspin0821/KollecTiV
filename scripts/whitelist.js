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
        0xf031c008aC49f1022617B0Dc369CdbA59afcfEE9, //  Account Dan gets 25% of the total revenue
        0xA1Cd0d52CD01Bebd30cfEB26D791dE1019942a6C, // Account Rochelle gets 35% of the total revenue
        0xbdd2c7c4B03cff16b6A56c6C5c8D3958713756e0 // Account Gregg gets 40% of the total revenue
]
