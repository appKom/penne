import { formatDateNorwegian } from '@/lib/dateUtils';
import { IncrementingNumber } from './IncrementingNumber';
import { prisma } from '@/lib/prisma';

const Splash = async () => {
  const performance = await prisma.performance.findFirst({
    orderBy: {
      date: 'desc',
    },
  });

  if (!performance) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen text-center">
      <div className="pb-48">
        <h1 className="text-6xl sm:text-8xl font-bold">Onlinefondet</h1>
        <h2 className="text-5xl sm:text-6xl text-center text-gray-200">
          <IncrementingNumber target={performance.value} duration={1000} />
        </h2>
        <p className="text-gray-500">
          Markedsverdi pr. {formatDateNorwegian(performance.date)}
        </p>
      </div>
    </div>
  );
};

export default Splash;
