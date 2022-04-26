export default function Mint() {
  return(
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src="/images/blur.jpeg"
            className="animate-pulse-slow absolute inset-auto block w-full min-h-screen object-cover"
          />
          <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
            <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
              <h1 className="font-coiny uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br  from-brand-green to-brand-blue bg-clip-text text-transparent mt-3">Pre-Sale</h1>
              <h3 className="text-sm text-pink-200 tracking-widest">0x8977978S7DF79779879S7DV799V7S9DV9V6SVSV (THIS IS FAKE)</h3>
              <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
                <div className="relative w-full">
                  <div>
                    <p>
                      <span>
                        0
                      </span> / 10000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
    </div>)}