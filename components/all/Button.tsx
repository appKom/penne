'use client';

import Link from 'next/link';

interface Props {
  title: string;
  onClick?: () => void;
  href?: string;
  color: 'orange';
}

export const Button = ({ title, onClick, color, href }: Props) => {
  const colorStyle =
    color === 'orange'
      ? 'border border-onlineyellow text-onlineyellow hover:border-orange-600 hover:text-orange-600'
      : '';

  const buttonStyle = `px-4 py-3 rounded-md  ${colorStyle}`;

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
