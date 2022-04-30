const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORMATIC_KEY
const RPC_URL= process.env.NEXT_PUBLIC_ALCHEMY_RPCURL

const config = {
  title: "KollecTiV Dapp",
  description: "A dapp for degens and aristocrats",
  // contractAddress: '0x0312e42e4b55823a3C41769DC0B07F382dECc247',
  // maxMintAmount: 10,
  // presaleMaxMintAmount: 3,
  // price: 0.01
}

const onboardOptions = {
  dappId: process.env.NEXT_PUBLIC_DAPP_ID,
  networkID: 4, // RInkeby test net
  walletSelect:{
    wallets:[
      { walletName:'metamask', preferred: true},
      { walletName:'coinbase', preferred: true},
      { walletName:'walletLink', preferred: true, rpcUrl: RPC_URL,appName: 'KollecTiV Dapp'},
      { walletName:'trust',  rpcURL: RPC_URL},
      { walletName:'gnosis', preferred: true},
      { walletName:'authereum'},
      { walletName:'ledger', preferred: true, rpcURL: RPC_URL},
      { walletName:'keepkey', preferred: true, rpcUrl: RPC_URL},
      { walletName:'trezor', preferred: true, appURL: APP_URL, email: CONTACT_EMAIL, rpcURL: RPC_URL},
      { walletName:'lattice', preferred: true, rpcUrl: RPC_URL,appName: 'KollecTiV Dapp'},
      { walletName:'fortmatic', preferred: true, apiKey: FORTMATIC_KEY},
      { walletName:'mewwallet', rpcUrl: RPC_URL},
      { walletName:'cobovault', rpcUrl: RPC_URL}
  ]

  },
  walletCheck:[
    {checkName: 'derivationPath'},
    {checkName: 'accounts'},
    {checkName: 'connect'},
    {checkName: 'network'}
  ]
}

export { config,onboardOptions }
