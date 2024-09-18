import Image from 'next/image';

const Splash = () => (
  <div className="relative flex items-center justify-center w-full h-screen mb-32 -mt-20">
    <Image
      src="/realfagsbygget.png"
      alt="Realfagsbygget"
      // unsure what the height and width should be
      height={100000}
      width={100000}
      className="w-4/5 animate-fadeIn"
    />
    <h1 className="text-[150px] tracking-wider absolute font-playfair animate-spashSlideUp w-min leading-tight [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
      ONLINE FONDET
    </h1>
  </div>
);

export default Splash;
