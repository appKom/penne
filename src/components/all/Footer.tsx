import {
  Slack,
  Facebook,
  Instagram,
  Github,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { name: 'Slack', icon: <Slack />, link: 'https://onlinentnu.slack.com/' },
  {
    name: 'Facebook',
    icon: <Facebook />,
    link: 'http://facebook.com/LinjeforeningenOnline',
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    link: 'https://www.instagram.com/online_ntnu/',
  },
  { name: 'Github', icon: <Github />, link: 'https://github.com/appKom' },
];

const Footer = () => (
  <footer className="px-4 py-12 text-gray-200 bg-gray-950 md:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-between mb-8 space-y-8 md:flex-row md:space-y-0">
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h2 className="text-2xl font-bold">Onlinefondet</h2>
          <div className="flex items-center space-x-2 transition-colors hover:text-onlineyellow">
            <Mail size={18} className="" />
            <Link to="mailto:onlinefondet@online.ntnu.no">
              onlinefondet@online.ntnu.no
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 md:items-end">
          <div className="flex space-x-4">
            {footerLinks.map((link, index) => (
              <Link
                to={link.link}
                key={index}
                className="transition-colors hover:text-onlineyellow"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Feil på siden?</p>
            <Link
              to="mailto:appkom@online.ntnu.no"
              className="flex items-center justify-center space-x-1 transition-colors hover:underline hover:text-onlineyellow md:justify-end"
            >
              <span>Ta kontakt med Appkom</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between py-8 space-y-6 border-t border-gray-800 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-6">
          <Link to="https://online.ntnu.no/" className='transition hover:opacity-50'>
            <img
              src="Online_hvit.svg"
              alt="Online logo"
              className="w-32 h-auto"
            />
          </Link>
          <Link to="https://www.bekk.no/" className='transition hover:opacity-50'>
            <img src="bekk_white.svg" alt="Bekk logo" className="w-32 h-auto" />
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Onlinefondet. Alle rettigheter
          reservert.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
