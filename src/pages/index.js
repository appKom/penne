import PerformanceDisplay from "@/components/home/PerformanceDisplay";
import Footer from "@/components/all/Footer";
import rf from "../../public/resources/realfagsbygget.png";
import onlineLogo from "../../public/resources/Online_hvit.png";
import { Splash } from "@/components/home/Splash";
import { Navbar } from "@/components/all/Navbar";
import ScrollDownIcon from "@/components/home/ScrollDownIcon";
import style from "./index.module.css"

export default function IndexPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-full h-20 mb-5 sticky top-0 z-20 bg-[#131620]">
        <Navbar img={onlineLogo.src} />
      </div>
      <div className="relative mb-[500px] w-full" id={style.splash}>
        <Splash img={rf.src}/>
      </div>
      <div className="sticky bottom-10" id={style.scroll}>
          <ScrollDownIcon />
      </div>
      <h1 id={style.overskrift}> Halo </h1>
      <div className="w-3/4 mb-10 text-lg">
        <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <br></br>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
      <PerformanceDisplay />
      <Footer/>
    </div>
  );
}
