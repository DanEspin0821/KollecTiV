import { initOnboard } from '../utils/onboard'
import { useState, useEffect } from 'react'
export default function Mint() {
  const [onboard, setOnboard] = useState(null)
  const [walletAddress, setWalletAddress] = useState('')
  useEffect(() => {
    const onboardData = initOnboard({
      address: (address) => setWalletAddress(address ? address : ''),
      wallet: (wallet) => {
        if (wallet.prover) {
          window.localStorage.setItem('selectedWallet', wallet.name)
        } else {
          window.localStorage.RemoveItem('selectedWallet')
        }
      }
    })
    setOnboard(onboardData)
  }, [])
  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect()
    if (walletSelected) {
      await onboard.walletCheck()
      window.location.reload(true)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden bg-brand-background">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <img
          src="/images/blur.jpeg"
          className="absolute inset-auto block object-cover w-full min-h-screen animate-pulse-slow"
        />
        <div className="flex flex-col items-center justify-center w-full h-full px-2 md:px-10">
          <div className="relative flex flex-col items-center w-full px-2 py-4 rounded-md z-1 md:max-w-3xl bg-gray-900/90 filter bg-gradient-to-r from-violet-500 via-rose-600 to-teal-600 first-line:filter backdrop-blur-sm md:px-10 hover:bg-gradient-to-r hover:to-blue-700 hover:from-yellow-500 hover:via-red-700">
            <h1 className="mt-3 font-mono text-3xl font-bold text-transparent uppercase md:text-4xl bg-gradient-to-br from-brand-yellow to-brand-blue bg-clip-text">
              Pre-Sale
            </h1>
            <div className="absolute z-10 flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-black border rounded-md font-coiny top-2 left-2 opacity-80 filter backdrop-blur-lg border-brand-purple">
              <p>
                <span className="font-mono text-brand-pink">0</span> / 10000
              </p>
            </div>
            <h3 className="mt-3 text-sm tracking-widest text-transparent text-pink-200 bg-gradient-to-br bg-clip-text text-bold">
              {walletAddress
               ? walletAddress.slice(0,8) + '...' + walletAddress.slice(-4)
               : ''}
            </h3>
            <div className="flex flex-col w-full mt-10 md:flex-row md:space-x-14 md:mt-14">
              <div className="relative w-full">
                <div>
                  <img
                    class="mx-auto"
                    src="/images/maf.png"
                    className="object-cover w-full sm:w-[280px] md:w-[250px] rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-10">
                  <div className="flex items-center justify-between w-full font-coiny ">
                    <button className="flex items-center justify-center h-10 font-bold bg-gray-300 rounded-md w-14 md:w-16 md:h-12 text-brand-background hover:animate-bounce hover:bg-cyan-600">
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
                      1
                    </p>
                    <button className="flex items-center justify-center h-10 font-bold bg-gray-300 rounded-md w-14 md:w-16 md:h-12 text-brand-background hover:animate-bounce hover:bg-cyan-600">
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
                    Max Mint Amount: 5
                  </p>
                  <div className="w-full py-4 mt-16 border-t border-b">
                    <div className="flex justify-between w-full text-xl font-coiny itmes-center text-brand-yellow">
                      <p className="text-slate-900">Total</p>
                      <div className="flex items-center space-x-3">
                        <p>0.01 ETH</p>
                        <span className="text-gray-400">+ GAS</span>
                      </div>
                    </div>
                  </div>

                  <div class="relative overflow-hidden bg-no-repeat bg-cover max-w-xs hover:animate-pulse">
                    <button
                      className="w-full px-6 py-3 mt-12 rounded-md shadow-lg font-coiny bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600"
                      onClick={connectWalletHandler}
                    >
                      Connect Wallet
                    </button>
                    <div class="absolute top-12 right-0 bottom-0 left-0 px-6 py-3 rounded-md overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-sky-600 via-purple-500 to-fuchsia-800 hover:opacity-70"></div>
                  </div>

                  <div className="w-full h-full px-4 py-4 mt-8 border rounded-md border-brand-pink-400 text-start first-line:mx-auto md:mt-4">
                    <p className="text-center flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                      Something went wrong
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full py-2 mt-10 border-t border-gray-800">
                  <h3 className="mt-6 text-2xl uppercase font-coiny bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600">
                    Contract Address
                  </h3>
                  <a
                    href="https://etherscan.io/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
                    target="_blank"
                    className="mt-4"
                  >
                    <span className=" break-all ... font-bold bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600">
                      290489023409823446345435353543535345454353535353454353580234828432098432084
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
