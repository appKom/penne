import Footer from "@/components/all/Footer";
import onlineLogo from "../../public/resources/Online_hvit.png";

import { Navbar } from "@/components/all/Navbar";
import Title from "@/components/appliance/title";
import { HorizontalLine } from "@/components/appliance/HorizontalLine";
import SubTitle from "@/components/appliance/SubTitle";
import { Paragraph } from "@/components/appliance/Paragraph";

import  styles from "@/components/soknad/SoknadPage.module.css";

export default function SoknadPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
    <div className="w-full h-20 mb-5 sticky top-0 z-20 bg-[#131620]">
      <Navbar img={onlineLogo.src} />
    </div>
    <Title title="Søke om støtte" />
   <HorizontalLine />
   <SubTitle title="Hvordan søke om støtte?" />
   <Paragraph text="Alle Onlines medlemmer kan søke Onlines fond om penger. Søknaden skal være velbegrunnet og ha som hensikt å komme flest mulig medlemmer av Online til gode. For at Fondstyre skal kunne ta en god avgjørelse trenger vi en helhetlig forståelse av hvem dere er og hva dere gjør. Skriv gjerne litt for mye, enn litt for lite. Søknaden er kun gyldig dersom det søkes om mellom 10 000 kr og 100 000 kr."/>
   <Paragraph text="Dette skal være med i søknaden:"/>
   <ul className={styles.ul} >
      <li>Beskriv dere selv</li>
      <li>Hva midlene skal brukes til</li>
      <li>Hvordan midlene går onlinere til gode</li>
      <li>Aktivitetsplan</li>
      <li>Budsjett</li>
    </ul>
    <Footer/>
  </div>
    );
  
}

