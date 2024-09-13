import { Navbar } from "@/components/all/Navbar";
import onlineLogo from "../../../public/resources/Online_hvit.png";
import bekkLogo from "../../../public/resources/Bekk_navnetrekk_hvit.svg";
import { useState } from "react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col">
        <Navbar img={onlineLogo.src} bekk={bekkLogo.src} />
        <div className="flex items-center justify-center px-6">
          <h1 className="text-3xl">Vennligst logg inn</h1>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !isAdmin) {
    return (
      <div className="flex flex-col px-6">
        <Navbar img={onlineLogo.src} bekk={bekkLogo.src} />
        <div className="flex items-center justify-center">
          <h1 className="text-3xl">Du har ikke tilgang til denne siden</h1>
        </div>
      </div>
    );
  }
}
