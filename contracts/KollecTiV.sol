// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;  // version must be the same in hardhat.config.js file

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // NFTs
import "@openzeppelin/contracts/access/Ownable.sol"; // access control mechanism, granting exclusive access to specific functions (transfering ownership)
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; //related to security, prevents a contract from calling itself (nonReentrant modifier)
import '@openzeppelin/contracts/finance/PaymentSplitter.sol'; // helps us divide payment if a group of people building selling art for pay mechansim
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol"; // creating a merkle tree from whitelisted accounts, when someone wants to mint they have to be whitelisted and provide proof, we verify in contract
import "@openzeppelin/contracts/utils/Counters.sol"; // counting the nfts
import "@openzeppelin/contracts/utils/Strings.sol";


// Original Author @author codingwithdidem (Youtube channel) with modifications by Dan Espin


contract KollecTiV is 
    ERC721, 
    Ownable, 
    ReentrancyGuard, 
    PaymentSplitter 
{
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public root;
    
    address proxyRegistryAddress; // depends on the network, different for RInkby , mainet, helps users to guest listings after minting process. opensea provides.

    uint256 public maxSupply = 10;

    string public baseURI; 
    string public notRevealedUri = "ipfs://QmP36mVEHhXiiAcoWFH2BknKMeHUaw6wc1wco3hXVH9Ew3/Hidden Image.json";
    string public baseExtension = ".json";

    // controls for presale
    bool public paused = false;
    bool public revealed = false;
    bool public presaleM = false;
    bool public publicM = false;

    uint256 presaleAmountLimit = 1; // max amount a user can mint
    mapping(address => uint256) public _presaleClaimed; // related to presale process how many have been minted by address of person

    uint256 _price = 10000000000000000; // 0.01 ETH , price of the NFT

    Counters.Counter private _tokenIds; // token ids counter

    uint256[] private _teamShares = [25, 35, 40]; // 3 PEOPLE IN THE TEAM
    address[] private _team = [
        0xC94D14C001012c657977dB30E76A23087f2464Ef, // Admin Account gets 25% of the total revenue
        0xA821241d0a43EEcE179B91e8EB57ED10Dc63507D, // Test Account gets 35% of the total revenue
        0xbb6c74C9e991f41825a6d5e8ec78270d9c7768c9 // VIP Account gets 40% of the total revenue
    ];


        // PaymentSplitter(_team, _teamShares)  Split the payment based on the teamshares percentages
       // ReentrancyGuard() A modifier that can prevent reentrancy during certain functions
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
    
    // sets the base URI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    // reveals image no way back, no way to hide nft afterward
    function reveal() public onlyOwner {
        revealed = true;
    }
    // if providing wrong root, only owner can reveal nft
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
    // used in mint presale methods, it takes the proof and verifies it
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

    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
    }

    // you have to be in the whitelisted accounts to call this
    function presaleMint(address account, uint256 _amount, bytes32[] calldata _proof)
    external
    payable
    isValidMerkleProof(_proof)
    onlyAccounts
    {
        require(msg.sender == account,          "KollecTiV: Not allowed"); // security check
        require(presaleM,                       "KollecTiV: Presale is OFF"); // check if in pre-sale
        require(!paused,                        "KollecTiV: Contract is paused"); // check if paused
        require(
            _amount <= presaleAmountLimit,      "KollecTiV: You can't mint so much tokens"); // user doesnt exceed mint amount
        require(
            _presaleClaimed[msg.sender] + _amount <= presaleAmountLimit,  "KollecTiV: You can't mint so much tokens"); // number of nfts minted


        uint current = _tokenIds.current(); 

        require(
            current + _amount <= maxSupply,
            "KollecTiV: max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "KollecTiV: Not enough ETHER sent"
        );
             
        _presaleClaimed[msg.sender] += _amount;

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

    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }
    //  if 
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



