import PerformanceDisplay from "@/components/home/PerformanceDisplay";
import Footer from "@/components/all/Footer";
import Table from "@/components/home/Table";
import PieChart from "@/components/home/PieChart";
import rf from "../../public/resources/realfagsbygget.png";
import onlineLogo from "../../public/resources/Online_hvit.png";
import bekkLogo from "../../public/resources/Bekk_navnetrekk_hvit.svg";
import { Splash } from "@/components/home/Splash";
import { Navbar } from "@/components/all/Navbar";
 import { Provider } from "react-redux";
import { store } from "@/services/Store";
import ScrollDownIcon from "@/components/home/ScrollDownIcon";
import style from "./index.module.css"

export default function IndexPage() {
  return (
    <Provider store={store} >
    <div className="h-full flex flex-col justify-center items-center">
  
        <Navbar img={onlineLogo.src} bekk={bekkLogo.src}/>

      <div id={style.splash} className="relative mb-[500px] w-full">
        <Splash img={rf.src}/>
      </div>
      <div className="sticky bottom-10" id={style.scroll}>
          <ScrollDownIcon />
      </div>
      <h1 id={style.overskrift}> Halo </h1>
      <div className="w-3/4 mb-10 text-lg text-justify">
        <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <br></br>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
      <PerformanceDisplay />
      <PieChart/>
      <Table/>
      <Footer/>
    </div>
    </Provider>
  );
}
