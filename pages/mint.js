export default function Mint() {
  return(
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src="/images/blur.jpeg"
            className="animate-pulse-slow absolute inset-auto block w-full min-h-screen object-cover"
          />
          <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
            <div className="z-1 md:max-w-3xl w-full bg-pink-900/70 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
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
                    <img src="/images/maf.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
    </div>)}