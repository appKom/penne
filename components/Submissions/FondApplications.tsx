'use client';
import useSWR from 'swr';
import ErrorPage from '../all/Error';
import ApplicationCard, { SkeletonApplication } from './ApplicationCard';
import { ApplicationType } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FondApplications = () => {
  const { data, error } = useSWR('/api/admin/application', fetcher);

  if (error) return <ErrorPage error="Søknader" />;

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold">Søknader til fondet</h1>

      {data
        ? data.applications.map((application: ApplicationType) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        : Array.from({ length: 2 }).map((_, index) => (
            <SkeletonApplication key={index} />
          ))}
    </section>
  );
};

export default FondApplications;
