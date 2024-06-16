import Footer from "@/components/all/Footer";
import onlineLogo from "../../public/resources/Online_hvit.png";
import bekkLogo from "../../public/resources/Bekk_navnetrekk_hvit.svg";
import { Navbar } from "@/components/all/Navbar";
import Title from "@/components/appliance/Title";
import { HorizontalLine } from "@/components/appliance/HorizontalLine";
import SubTitle from "@/components/appliance/SubTitle";
import { Paragraph } from "@/components/appliance/Paragraph";

export default function SoknadPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Navbar img={onlineLogo.src} bekk={bekkLogo.src} />

      <div className="w-4/5 p-12 lg:w-11/12 md:w-full bg-aqua">
        <Title title="Søke om støtte" />
        <HorizontalLine />
        <SubTitle title="Hvordan søke om støtte?" />
        <Paragraph text="Alle Onlines medlemmer kan søke Onlines fond om penger. Søknaden skal være velbegrunnet og ha som hensikt å komme flest mulig medlemmer av Online til gode. For at Fondstyre skal kunne ta en god avgjørelse trenger vi en helhetlig forståelse av hvem dere er og hva dere gjør. Skriv gjerne litt for mye, enn litt for lite. Søknaden er kun gyldig dersom det søkes om mellom 10 000 kr og 100 000 kr." />
        <Paragraph text="Søknader sendes til fondet@online.ntnu.no" />
        <Paragraph text="Dette skal være med i søknaden:" />
        <ul className="flex flex-col w-full h-full mt-8 text-left list-none">
          <li className="my-4 ml-16 text-lg font-normal leading-normal text-white list-disc lg:mx-12 md:mx-8 sm:mx-4">Beskriv dere selv</li>
          <li className="my-4 ml-16 text-lg font-normal leading-normal text-white list-disc lg:mx-12 md:mx-8 sm:mx-4">Hva midlene skal brukes til</li>
          <li className="my-4 ml-16 text-lg font-normal leading-normal text-white list-disc lg:mx-12 md:mx-8 sm:mx-4">Hvordan midlene går onlinere til gode</li>
          <li className="my-4 ml-16 text-lg font-normal leading-normal text-white list-disc lg:mx-12 md:mx-8 sm:mx-4">Aktivitetsplan</li>
          <li className="my-4 ml-16 text-lg font-normal leading-normal text-white list-disc lg:mx-12 md:mx-8 sm:mx-4">Budsjett</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
