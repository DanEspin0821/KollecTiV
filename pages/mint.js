import { initOnboard } from '../utils/onboard'
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets
} from '@web3-onboard/react'
import { useState, useEffect } from 'react'
import {config} from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPreSaleState,
  isPublicSaleState,
  presaleMint,
  publicMint
} from '../utils/interact'
export default function Mint() {
  const [maxSupply, setMaxSupply] = useState(0)
  const [mintAmount, setMintAmount] = useState(1)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isPreSale, setIsPreSale] = useState(false)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [isMinting, setIsMinting] = useState(false)
  const [totalMinted, setTotalMinted] = useState(0)
  const [status, setStatus] = useState(null)
  const [onboard, setOnboard] = useState(null)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()




  useEffect(()=>{
    setOnboard(initOnboard)
  },[])

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())
      setPaused(await isPausedState())
      setIsPublicSale(await isPublicSaleState())
      const isPreSale = await isPreSaleState()
      setIsPreSale(isPreSale)

      setMaxMintAmount(
        isPreSale ? config.presaleMaxMintAmount : config.maxMintAmount
       )
    }

    init()
  }, [])
  
  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }

  const presaleMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await presaleMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden bg-brand-background">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <img
          src="/images/blur.jpeg " rel="noreferrer"
          className="absolute inset-auto block object-cover w-full min-h-screen animate-pulse-slow "
        />
        <div className="flex flex-col items-center justify-center w-full h-full px-2 md:px-10">
          <div className="relative flex flex-col items-center w-full px-2 py-4 rounded-md z-1 md:max-w-3xl bg-gray-900/90 filter bg-gradient-to-r from-violet-500 via-rose-600 to-teal-600 first-line:filter backdrop-blur-sm md:px-10 hover:bg-gradient-to-r hover:to-blue-700 hover:from-yellow-500 hover:via-red-700">
            <h1 className="mt-3 font-mono text-3xl font-bold text-transparent uppercase md:text-4xl bg-gradient-to-br from-brand-yellow to-brand-blue bg-clip-text">
              {paused ? 'Paused' : isPreSale ? 'Pre-Sale' : 'Public Sale'}
            </h1>
            <div className="absolute z-10 flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-black border rounded-md font-coiny top-2 left-2 opacity-80 filter backdrop-blur-lg border-brand-purple">
              <p>
                <span className="font-mono text-brand-pink">{totalMinted}</span> / {maxSupply}
              </p>
            </div>
            <h3 className="mt-3 text-sm tracking-widest text-transparent text-pink-200 bg-gradient-to-br bg-clip-text text-bold">
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>
            <div className="flex flex-col w-full mt-10 md:flex-row md:space-x-14 md:mt-14">
              <div className="relative w-full">
                <div>
                  <img
                    src="/images/maf.png" rel="noreferrer"
                    className="mx-auto object-cover w-full sm:w-[280px] md:w-[250px] rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-10">
                  <div className="flex items-center justify-between w-full font-coiny ">
                    <button className="flex items-center justify-center h-10 font-bold bg-gray-300 rounded-md w-14 md:w-16 md:h-12 text-brand-background hover:animate-bounce hover:bg-cyan-600"
                    onClick={incrementMintAmount}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:h-8 md:w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <p className="flex items-center justify-center flex-1 text-3xl text-center grow fond-bold text-brand-blue md:text-4xl">
                      {mintAmount}
                    </p>
                    <button className="flex items-center justify-center h-10 font-bold bg-gray-300 rounded-md w-14 md:w-16 md:h-12 text-brand-background hover:animate-bounce hover:bg-cyan-600"
                    onClick={decrementMintAmount}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:h-8 md:w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-3 text-sm font-bold tracking-widest text-pink-200 ">
                    Max Mint Amount: {maxMintAmount}
                  </p>
                  <div className="w-full py-4 mt-16 border-t border-b">
                    <div className="flex justify-between w-full text-xl font-coiny itmes-center text-brand-yellow">
                      <p className="text-slate-900">Total</p>
                      <div className="flex items-center space-x-3">
                        <p>{Number.parseFloat(config.price * mintAmount).toFixed(
                          2
                          )}{' '} ETH</p>{' '} 
                        <span className="text-gray-400">+ GAS</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover hover:animate-pulse">
                    {wallet ? (
                  <button
                  className={` ${
                    paused || isMinting
                      ? 'bg-gray-900 cursor-not-allowed'
                      : 'from-sky-500 via-yellow-200 to-fuchsia-600'
                  } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                  disabled={paused || isMinting}
                  onClick={isPreSale ? presaleMintHandler : publicMintHandler}
                >
                  {isMinting ? 'Minting...' : 'Mint'}
                </button>
                    ) : (
                      <button className="w-full px-6 py-3 mt-12 rounded-md shadow-lg font-coiny bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600"
                        onClick={() => connect()}
                      >
                        Connect Wallet
                      </button>
                    )}

                  </div>
                  {status && (
                    <div
                      className={`border ${
                        status.success ? 'border-green-500' : 'border-brand-pink-400 '
                      } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
                    >
                      <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                        {status.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center w-full py-2 mt-10 border-t border-gray-800">
                    <h3 className="mt-6 text-2xl uppercase font-coiny bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600">
                      Contract Address
                    </h3>
                  <a
                      href={'https://rinkeby.etherscan.io/address/0xC492B2E44D2FAA06f5a139aC68A30bfdA97868dc'}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4"
                    >
                      <span className=" break-all ... font-bold bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600">
                        {config.contractAddress}
                      </span>
                    </a>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
