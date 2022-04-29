export default function Mint() {
  return(
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src="/images/blur.jpeg"
            className="animate-pulse-slow absolute inset-auto block w-full min-h-screen object-cover"
          />
          <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
            <div class="relative">
              <div class="absolute -inset-5 bg-gradient-to-r to-lime-400 from-rose-600 rounded-lg blur"></div>
              <div className="z-1 md:max-w-3xl w-full bg-gradient-to-r from-violet-500 via-rose-600 to-teal-600 first-line:filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center hover:bg-gradient-to-r hover:to-blue-700 hover:from-yellow-500 hover:via-red-700">
                <h1 className="font-mono uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br  from-brand-yellow to-brand-blue bg-clip-text text-transparent mt-3">Pre-Sale</h1>
                <h3 className="text-sm bg-gradient-to-br text-pink-200 bg-clip-text text-transparent mt-3 tracking-widest text-bold">0x252093739b0C60D5B91d6D53d3868cb9ABaaCbc0</h3>
                <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
                  <div className="relative w-full">

                    <div>
                      <img class = "mx-auto" src="/images/maf.png" 
                      className="object-cover w-full sm:w-[280px] md:w-[250px] rounded-md"/>
                    </div>
                    <div className="font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                      <p>
                        <span className="font-mono text-brand-pink">
                          0
                        </span> / 10000
                      </p>
                    </div>
                      <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-10">
                        <div className="font-coiny flex items-center justify-between w-full ">
                          <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:animate-bounce hover:bg-cyan-600 bg-gray-300 font-bold rounded-md">
                          
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                              <p className="flex items-center justify-center flex-1 grow text-center fond-bold text-brand-blue text-3xl md:text-4xl">1</p>
                            <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:animate-bounce  hover:bg-cyan-600 bg-gray-300 font-bold rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>

                        <p className = "text-sm text-pink-200 tracking-widest mt-3 font-bold " >Max Mint Amount: 5</p>
                        
                        <div className="border-t border-b py-4 mt-16 w-full">
                            <div className="w-full text-xl font-coiny flex itmes-center justify-between text-brand-yellow" >
                                <p className="text-slate-900" >Total</p>
                                <div className="flex items-center space-x-3">
                                  <p>0.01 ETH</p>
                                  <span className="text-gray-400">+ GAS</span>
                                </div>
                            </div>
                        </div>



                            <div class="relative overflow-hidden bg-no-repeat bg-cover max-w-xs hover:animate-pulse">
                              <button className="font-coiny mt-12 w-full bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600 shadow-lg px-6 py-3 rounded-md"> 
                                Connect Wallet
                              </button>
                            <div class="absolute top-12 right-0 bottom-0 left-0 px-6 py-3 rounded-md overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-sky-600 via-purple-500 to-fuchsia-800 hover:opacity-70"></div>
                      </div>


                      <div className="rounded-md text-start h-full px-4 py-4 w-full first-line:mx-auto">
                      <p className="text-center flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                        Something went wrong
                      </p>
                    </div>
                    </div>




                    <div className = "border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
                      <h3 className="font-coiny text-2xl bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600 uppercase mt-6">Contract Address</h3>
                      <a href="https://etherscan.io/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce" target="_blank" className="mt-4">
                        <span className=" break-all ... font-bold bg-gradient-to-br from-sky-500 via-yellow-200 to-fuchsia-600">290489023409823446345435353543535345454353535353454353580234828432098432084</span>
                      </a>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
    </div>)}