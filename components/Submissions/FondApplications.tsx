import ApplicationCard, { SkeletonApplication } from './ApplicationCard';
import { ApplicationType } from '@/lib/types';
import { prisma } from '@/lib/prisma';

const FondApplications = async () => {
  const applications = await prisma.application.findMany({
    orderBy: {
      dateApplied: 'desc',
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold">Søknader til fondet</h1>

      {applications
        ? applications.map((application: ApplicationType) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        : Array.from({ length: 2 }).map((_, index) => (
            <SkeletonApplication key={index} />
          ))}
    </section>
  );
};

export default FondApplications;
