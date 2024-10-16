'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PortfolioPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    // try {
    //   let response;

    //   if (editingApplication) {
    //     formData.append('id', editingApplication.id.toString());
    //     response = await fetch('/api/admin/application', {
    //       method: 'PUT',
    //       body: formData,
    //     });
    //   } else {
    //     response = await fetch('/api/admin/application', {
    //       method: 'POST',
    //       body: formData,
    //     });
    //   }

    //   if (response.ok) {
    //     toast.success(
    //       editingApplication ? 'Søknad oppdatert' : 'Søknad lagt til!',
    //     );
    //     resetForm();

    //     if (editingApplication) {
    //       const updatedApplication = await response.json();
    //       setApplications(
    //         applications.map((application) =>
    //           application.id === editingApplication.id
    //             ? updatedApplication.application
    //             : application,
    //         ),
    //       );
    //     } else {
    //       setApplications([
    //         ...applications,
    //         (await response.json()).application,
    //       ]);
    //     }

    //     setEditingApplication(null);
    //   } else {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     toast.error(`Failed to add application: ${error.message}`);
    //   } else {
    //     toast.error(
    //       editingApplication
    //         ? 'Klarte ikke å oppdatere søknad'
    //         : 'Klarte ikke å legge til søknad',
    //     );
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer portfølje</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8"></form>
    </div>
  );
};

export default PortfolioPage;
