import React from "react";
import { BsSlack, BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

const Footer = () => {
  const footerLinkSize = 35;
  const footerLinks = [
    {
      name: "Slack",
      icon: <BsSlack size={footerLinkSize} />,
      link: "https://onlinentnu.slack.com/",
    },
    {
      name: "Facebook",
      icon: <BsFacebook size={footerLinkSize} />,
      link: "http://facebook.com/LinjeforeningenOnline",
    },
    {
      name: "Instagram",
      icon: <BsInstagram size={footerLinkSize} />,
      link: "https://www.instagram.com/online_ntnu/",
    },
    {
      name: "Github",
      icon: <BsGithub size={footerLinkSize} />,
      link: "https://github.com/appKom",
    },
  ];

  return (
    <div className="mt-20 w-full h-48 bg-[#0d5474] text-white py-8 flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center gap-8">
        {footerLinks.map((link) => (
          <a
            href={link.link}
            key={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white no-underline transition duration-200 hover:text-[#F9B759]"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div>Feil på siden?</div>
        <div>
          Ta kontakt med <a href="mailto:appkom@online.ntnu.no" className="font-medium transition duration-200 hover:text-[#F9B759]">Appkom</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
