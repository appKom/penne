import Image from 'next/image';

const Splash = () => (
  <div className="relative flex items-center justify-center w-full h-screen mb-32 -mt-20">
    <Image
      src="/realfagsbygget.png"
      alt="Realfagsbygget"
      // unsure what the height and width should be
      height={683}
      width={616}
      className="animate-fadeIn w-[200px] sm:w-[300px] xl:w-[400px]"
    />
    <h1 className="text-center absolute font-playfair animate-spashSlideUp leading-tight [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
      <span className="block text-6xl sm:text-8xl xl:text-9xl tracking-wider">
        ONLINE
      </span>
      <span className="block text-6xl sm:text-8xl xl:text-9xl tracking-wider">
        FONDET
      </span>
    </h1>
  </div>
);

export default Splash;
