'use client';

import Link from 'next/link';

interface Props {
  title: string;
  onClick?: () => void;
  href?: string;
  color: 'orange' | 'white';
  className?: string;
}

const Button = ({ title, onClick, color, href, className }: Props) => {
  let colorStyle = '';

  switch (color) {
    case 'orange':
      colorStyle =
        'border border-onlineyellow text-onlineyellow hover:border-orange-600 hover:text-orange-600';
      break;

    case 'white':
      colorStyle =
        'border border-white text-white hover:border-gray-600 hover:text-gray-600';
      break;
  }

  const buttonStyle = `px-4 py-3 rounded-md  ${colorStyle} ${className}`;

  if (onClick) {
    return (
      <button className={`${buttonStyle}`} onClick={onClick}>
        {title}
      </button>
    );
  }
  if (href) {
    return (
      <Link className={`${buttonStyle}`} href={href}>
        {title}
      </Link>
    );
  }
};

export default Button;
