import Header from "@/components/header";

export default function Home() {
  return (
      <div className="flex items-start w-screen max-w-[1440px] h-screen flex-col">
          <Header/>

          <div className="w-screen h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-[15px]">
                  <p className="text-black text-[40px] font-medium text-center">Modern collection on Solana</p>
                  <p className="text-[#5A5A5A] text-[24px] font-medium text-center">Minting is live and available</p>
                  <a href="/collection">
                      <div className="flex items-center justify-center py-[15px] px-[30px] border-[1px] border-black hover:cursor-pointer text-black hover:text-white hover:bg-black">
                          <p className="text-[16px] font-medium">connect wallet</p>
                      </div>
                  </a>
              </div>
          </div>

          <div className="fixed inset-0 flex items-center justify-center pointer-events-none pt-[100px]" style={{zIndex: -1}}>
              <svg
                  width="102"
                  height="562"
                  viewBox="0 0 102 562"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute"
                  style={{transform: "rotate(20deg)", zIndex: -1}}
              >
                  <rect
                      x="0.5"
                      y="0.5"
                      width="101"
                      height="561"
                      fill="none"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth="1"
                      strokeDasharray="23 23"
                  />
              </svg>

          </div>
      </div>
  );
}
