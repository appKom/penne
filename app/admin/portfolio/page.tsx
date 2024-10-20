'use client';

import { useState } from 'react';
import { CompositionType, GraphType } from '@/lib/types';
import TextInput from '@/components/form/TextInput';
import DateInput from '@/components/form/DateInput';
import { UserPlus } from 'lucide-react';

// import { useState } from 'react';
// import toast from 'react-hot-toast';

const PortfolioPage = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const [composition, setComposition] = useState<CompositionType | null>(null);
  const [performance, setPerformance] = useState<GraphType | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    // setIsLoading(true);
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

      <h2 className="text-xl font-semibold mb-2">Sammensetning</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <TextInput
          id="company"
          label="Selskap"
          type="text"
          value={composition?.company || ''}
          onChange={(e) =>
            setComposition({
              ...composition,
              company: e.target.value,
              percentage: composition?.percentage || 0,
              category: composition?.category || '',
            })
          }
        />
        <TextInput
          id="category"
          label="Kategori"
          type="text"
          value={composition?.category || ''}
          onChange={(e) =>
            setComposition({
              ...composition,
              company: composition?.company || '',
              percentage: composition?.percentage || 0,
              category: e.target.value,
            })
          }
        />
        <TextInput
          id="percentage"
          label="Prosentandel"
          type="number"
          value={composition?.percentage?.toString() || '0'}
          onChange={(e) =>
            setComposition({
              ...composition,
              company: composition?.company || '',
              percentage: parseFloat(e.target.value),
              category: composition?.category || '',
            })
          }
        />
        <h2 className="text-xl font-semibold mb-2">Prestasjon</h2>
        <DateInput label="Dato" />
        <TextInput
          id="value"
          label="Verdi"
          type="number"
          value={performance?.value?.toString() || '0'}
          onChange={(e) =>
            setPerformance({
              ...performance,
              value: parseFloat(e.target.value),
              date: performance?.date?.toString() || new Date().toISOString(),
            })
          }
        />

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Oppdater portfølje
        </button>
      </form>
    </div>
  );
};

export default PortfolioPage;
