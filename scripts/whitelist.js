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
        0x3E3b8967c39F43C64B267AD8292236b314D233Df, //  Account 1 gets 25% of the total revenue
        0x92B6643D1377ef3500E191c4C39c79a7791C759B, // Account 7 gets 35% of the total revenue
        0x73c43f695abC0326016186F98630024bbf0Fa7cb // Account 8 gets 40% of the total revenue
]
