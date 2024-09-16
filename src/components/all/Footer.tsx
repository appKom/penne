import { BsSlack, BsFacebook, BsInstagram, BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const footerLinkSize = 35;

const footerLinks = [
  {
    name: 'Slack',
    icon: <BsSlack size={footerLinkSize} />,
    link: 'https://onlinentnu.slack.com/',
  },
  {
    name: 'Facebook',
    icon: <BsFacebook size={footerLinkSize} />,
    link: 'http://facebook.com/LinjeforeningenOnline',
  },
  {
    name: 'Instagram',
    icon: <BsInstagram size={footerLinkSize} />,
    link: 'https://www.instagram.com/online_ntnu/',
  },
  {
    name: 'Github',
    icon: <BsGithub size={footerLinkSize} />,
    link: 'https://github.com/appKom',
  },
];

const Footer = () => (
  <div className="flex flex-col gap-8 py-8 bg-onlineblue mt-28 items-center">
    <div className="flex justify-center gap-8">
      {footerLinks.map((link) => {
        return (
          <a
            href={link.link}
            key={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:text-onlineyellow"
          >
            {link.icon}
          </a>
        );
      })}
    </div>
    <div className="flex flex-col items-center gap-2">
      <div>Feil på siden?</div>
      <div>
        Ta kontakt med{' '}
        <a
          href="mailto:appkom@online.ntnu.no"
          className="font-medium transition-all hover:text-orange-500 text-onlineyellow"
        >
          Appkom
        </a>
      </div>
    </div>
    <div className="flex flex-row items-center gap-8">
      <Link to={'https://www.online.ntnu.no'} className="hover:opacity-80">
        <img src="Online_hvit.svg" className="h-auto w-32" />
      </Link>
      <Link to={'https://www.bekk.no'} className="hover:opacity-80">
        <img src="bekk_white.svg" className="h-auto w-32" />
      </Link>
    </div>
  </div>
);

export default Footer;
