import Image from 'next/image';
import { TMember } from '../../lib/types';

const Member = (props: TMember) => (
  <div className="relative flex flex-col items-center justify-center gap-4 text-center w-fit">
    <div className="relative overflow-hidden rounded-full group">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D5474] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-center transition-transform duration-300 transform translate-y-full sm:p-4 group-hover:translate-y-0">
        <p className="text-base font-medium sm:text-lg text-[#F9B759]">
          {props.role || 'Medlem'}
        </p>
      </div>
      <Image
        src={props.imagePath}
        alt={props.name}
        // unsure if these should the right dimensions
        height={512}
        width={512}
        className="object-cover w-32 rounded-full lg:w-48 aspect-square border-[#333b54] border-2 shadow-xl"
      />
    </div>
    {props.role === 'Leder' && (
      <div className="absolute right-10 lg:-top-12 lg:right-12 w-8 h-8 -top-6 rotate-[25deg]">
        <span className="text-4xl lg:text-6xl">👑</span>
      </div>
    )}
    <p className="w-full text-xl">{props.name}</p>
  </div>
);

export default Member;
