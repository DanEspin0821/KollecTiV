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
              <div className="z-1 md:max-w-3xl w-full bg-gradient-to-r from-violet-500 to-slate-500 first-line:filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center hover:bg-gradient-to-r hover:to-blue-700 hover:from-yellow-400">
                <h1 className="font-mono uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br  from-brand-yellow to-brand-blue bg-clip-text text-transparent mt-3">Pre-Sale</h1>
                <h3 className="text-sm bg-gradient-to-br  from-brand-light to-brand-yellow bg-clip-text text-transparent mt-3 tracking-widest">0x252093739b0C60D5B91d6D53d3868cb9ABaaCbc0</h3>
                <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
                  <div className="relative w-full">
                    <div className="font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                      <p>
                        <span className="font-mono text-brand-pink">
                          0
                        </span> / 10000
                      </p>
                    </div>
                    <div>
                      <img class = "mx-auto" src="/images/maf.png" className="object-cover w-full sm:w-[280px] md:w-[250px] rounded-md"/>
                    </div>

                      <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-10">
                        <div className="font-coiny flex items-center justify-between w-full">
                        <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:bg-cyan-300 bg-gray-300 font-bold rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                              <p className="flex items-center justify-center flex-1 grow text-center fond-bold text-brand-blue text-3xl md:text-4xl">1</p>
                            <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:bg-cyan-300 bg-gray-300 font-bold rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>



                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
    </div>)}