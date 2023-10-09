import PerformanceDisplay from "@/components/home/PerformanceDisplay";
import Footer from "@/components/all/Footer";
import rf from "../../public/resources/realfagsbygget.png";
import onlineLogo from "../../public/resources/Online_hvit.png";
import { Splash } from "@/components/home/Splash";
import { Navbar } from "@/components/all/Navbar";
import ScrollDownIcon from "@/components/home/ScrollDownIcon";

export default function IndexPage() {
  return (
    <div className="h-full">
      <div className="w-full h-20 mb-5">
        <Navbar img={onlineLogo.src}/>
      </div>
      <div className="relative mb-[500px]">
        <Splash img={rf.src}/>
      </div>
      <div className="sticky bottom-5 h-full">
          <ScrollDownIcon />
      </div>
      <PerformanceDisplay />
      <Footer/>
    </div>
  );
}
