// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;  // version must be the same in line 12 of the hardhat.config.js file, these numbers have to match

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // NFTs
import "@openzeppelin/contracts/access/Ownable.sol"; // basic access control mechanism, account owner granting exclusive access to specific functions (transfering ownership). Owner can change with an transfer ownership function.
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; //related to security, prevents a contract from calling itself (nonReentrant modifier) directly or indirectly
import '@openzeppelin/contracts/finance/PaymentSplitter.sol'; // helps us divide payment if a group of people building or selling art for pay mechansim, helps lower gas
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol"; // creating a merkle tree from whitelisted accounts (whitelist.js), we create a proof, and when someone wants to mint they have to be whitelisted and user does this by providing proof, we verify in contract
import "@openzeppelin/contracts/utils/Counters.sol"; // counting the nfts
import "@openzeppelin/contracts/utils/Strings.sol";

// inheritances
contract KollecTiV is 
    ERC721, 
    Ownable, 
    ReentrancyGuard, 
    PaymentSplitter 
{
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public root; // this will help with whitelisted accounts
    
    address proxyRegistryAddress; // Users-Guest list: depends on the network, different for Rinkeby , Mainet, helps users to guest listings after minting process. This is an address OpenSea provides you.

    uint256 public maxSupply = 10; // What is the supply of NFTs

    string public baseURI; // this is the IPFS metadata of our NFT collection. IPFS is Pinata
    string public notRevealedUri = "ipfs://QmP36mVEHhXiiAcoWFH2BknKMeHUaw6wc1wco3hXVH9Ew3/Hidden Image.json"; // this is the metadata of the hidden questionmark image. Its an image of a questionmark, users will see not revealed version of NFT when they first mint, and once revealed they will see what is in the base URI
    string public baseExtension = ".json";

    // controls for presale
    bool public paused = false; // pause the contract
    bool public revealed = false; // switching mechanism for base uri
    bool public presaleM = false; // presale minting state
    bool public publicM = false; // public minting state

    uint256 presaleAmountLimit = 1; // max amount a user can mint
    mapping(address => uint256) public _presaleClaimed; // related to presale process, shwoing how many have been minted by address of the person 

    uint256 _price = 10000000000000000; // 0.01 ETH , price of the NFT in Wei format, you can check on  (https://eth-converter.com/)

    Counters.Counter private _tokenIds; // token ids counter

    uint256[] private _teamShares = [25, 35, 40]; // 3 PEOPLE IN THE TEAM
    address[] private _team = [
        0xf031c008aC49f1022617B0Dc369CdbA59afcfEE9, //  Account 1 gets 25% of the total revenue
        0xA1Cd0d52CD01Bebd30cfEB26D791dE1019942a6C, // Account 7 gets 35% of the total revenue
        0xbdd2c7c4B03cff16b6A56c6C5c8D3958713756e0 // Account 8 gets 40% of the total revenue
    ];


        // PaymentSplitter(_team, _teamShares)  Split the payment based on the teamshares percentages
       // ReentrancyGuard() A modifier that can prevent reentrancy during certain functions
      // uri is the base-uri of the ipfs data of our collection 
    constructor(string memory uri, bytes32 merkleroot, address _proxyRegistryAddress)
        ERC721("KollecTiV", "KLTV")
        PaymentSplitter(_team, _teamShares)
        ReentrancyGuard()
    {
        root = merkleroot;
        proxyRegistryAddress = _proxyRegistryAddress;

        setBaseURI(uri);
    }
    // any time mistake is made lets you reset baseuri. if something wrong at deployment it can be updated.
    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }
    
    // returns the base URI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    // reveals image no way back, no way to hide nft afterward
    function reveal() public onlyOwner {
        revealed = true;
    }
    // if providing wrong root, only owner can call this and only owner can reveal nft
    function setMerkleRoot(bytes32 merkleroot) 
    onlyOwner 
    public 
    {
        root = merkleroot;
    }
    // prevents phishing attack the message sender has to be the one that called this function
    modifier onlyAccounts () {
        require(msg.sender == tx.origin, "Not allowed origin");
        _;
    }
    // used in mint presale methods, it takes the proof and verifies it, use in presale to verify
    modifier isValidMerkleProof(bytes32[] calldata _proof) {
         require(MerkleProof.verify(
            _proof,
            root,
            keccak256(abi.encodePacked(msg.sender))
            ) == true, "Not allowed origin");
        _;
   }
    // toggles pause 
    function togglePause() public onlyOwner {
        paused = !paused;
    }
    // toggle presale
    function togglePresale() public onlyOwner {
        presaleM = !presaleM;
    }
    // toggle public sale state
    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
    }

    // you have to be in the whitelisted accounts to call this. // are you in the whitelist or not isValidMerkleProof(_proof)
    function presaleMint(address account, uint256 _amount, bytes32[] calldata _proof)
    external
    payable
    isValidMerkleProof(_proof) 
    onlyAccounts
    {
        require(msg.sender == account,          "KollecTiV: Not allowed"); // security check
        require(presaleM,                       "KollecTiV: Presale is OFF"); // check if in pre-sale is active
        require(!paused,                        "KollecTiV: Contract is paused"); // check if not paused
        require(
            _amount <= presaleAmountLimit,      "KollecTiV: You can't mint so much tokens"); // user doesnt exceed mint amount
        require(
            _presaleClaimed[msg.sender] + _amount <= presaleAmountLimit,  "KollecTiV: You can't mint so much tokens"); // number of nfts minted

        // number of nfts minted up until now
        uint current = _tokenIds.current(); 
        // is the max supply exceeded
        require(
            current + _amount <= maxSupply,
            "KollecTiV: max supply exceeded"
        );
        // is there enough Eth in the wallet to mint
        require(
            _price * _amount <= msg.value,
            "KollecTiV: Not enough ETHER sent"
        );
        // keep track of the addresses minted amount  
        _presaleClaimed[msg.sender] += _amount;
        // how many total nfts minted
        for (uint i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function publicSaleMint(uint256 _amount) 
    external 
    payable
    onlyAccounts
    {
        require(publicM,"KollecTiV: PublicSale is OFF");
        require(!paused, "KollecTiV: Contract is paused");
        require(_amount > 0, "KollecTiV: zero amount");

        uint current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "KollecTiV: Max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "KollecTiV: Not enough ethers sent"
        );
        
        
        for (uint i = 0; i < _amount; i++) {
            mintInternal();
        }
    }
    // non re-entrant prevents calling itself, minting process.
    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }
    //  if reveal is false we are showing not reveal uri, if true we get the base uri
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721 Metadata: URI query for nonexistent token"
        );
        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
    
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }
    
    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }
    // how many NFTs minted
    function totalSupply() public view returns (uint) {
        return _tokenIds.current();
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}



/**
  @title An OpenSea delegate proxy contract which we include for whitelisting.
  @author OpenSea
*/
contract OwnableDelegateProxy {}

/**
  @title An OpenSea proxy registry contract which we include for whitelisting.
  @author OpenSea
*/
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}



