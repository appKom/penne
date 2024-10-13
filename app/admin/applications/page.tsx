'use client';
import TextInput from '@/components/form/TextInput';
import NumberInput from '@/components/form/NumberInput';
import DateInput from '@/components/form/DateInput';
import { useState, useEffect } from 'react';
import { FileText, Edit, XIcon } from 'lucide-react';
import { ApplicationType } from '@/lib/types';
import toast from 'react-hot-toast';
import Table from '@/components/form/Table';

const ApplicationsPage = () => {
  const [purpose, setPurpose] = useState('');
  const [grantedAmount, setGrantedAmount] = useState(0);
  const [amountApplied, setAmountApplied] = useState(0);
  const [recipient, setrecipient] = useState('');
  const [dateApplied, setDateApplied] = useState<Date | undefined>(undefined);
  const [dateGranted, setDateGranted] = useState<Date | undefined>(undefined);
  const [editingApplication, setEditingApplication] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<ApplicationType[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admin/application');
        if (response.ok) {
          const data = await response.json();

          setApplications(data.applications);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Klarte ikke å hente søknader: ${error.message}`);
        } else {
          toast.error('Klarte ikke å hente søknader');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleEdit = (application: ApplicationType) => {
    setPurpose(application.purpose);
    setGrantedAmount(application.grantedAmount);
    setAmountApplied(application.amountApplied);
    setrecipient(application.recipient);
    setDateApplied(application.dateApplied);
    setDateGranted(application.dateGranted);

    setEditingApplication(true);
  };

  const handleRemove = async (id: number) => {
    return id;
  };

  const columns = [
    {
      header: 'Formål',
      accessor: 'purpose' as keyof ApplicationType,
    },
    {
      header: 'Innvilget Beløp',
      accessor: 'grantedAmount' as keyof ApplicationType,
    },
    {
      header: 'Søkt Beløp',
      accessor: 'amountApplied' as keyof ApplicationType,
    },
    {
      header: 'Mottaker',
      accessor: 'recipient' as keyof ApplicationType,
    },
    {
      header: 'Dato Søkt',
      accessor: 'dateApplied' as keyof ApplicationType,
    },
    {
      header: 'Dato Innvilget',
      accessor: 'dateGranted' as keyof ApplicationType,
    },
  ];

  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer søknader</h1>
      <form className="space-y-4 mb-8">
        <TextInput
          id="purpose"
          label="Formål"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <DateInput
          label="Dato søkt"
          value={dateApplied}
          onChange={(e) =>
            setDateApplied(
              e.target.value ? new Date(e.target.value) : undefined,
            )
          }
        />
        <DateInput
          label="Dato innvilget"
          value={dateGranted}
          onChange={(e) =>
            setDateGranted(
              e.target.value ? new Date(e.target.value) : undefined,
            )
          }
        />
        <TextInput
          id="recipient"
          label="Motakker"
          value={recipient}
          onChange={(e) => setrecipient(e.target.value)}
        />
        <NumberInput
          id="grantedAmount"
          label="Innvilget Beløp"
          value={grantedAmount}
          onChange={(e) => setGrantedAmount(parseFloat(e.target.value))}
        />
        <NumberInput
          id="amountApplied"
          label="Søkt Beløp"
          value={amountApplied}
          onChange={(e) => setAmountApplied(parseFloat(e.target.value))}
        />

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingApplication ? (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Oppdater søknad
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Legg til søknad
            </>
          )}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Medlemsliste</h2>
      {isLoading ? (
        <div className=" text-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-y-2 border-onlineyellow mb-4"></div>
            <h2 className="text-2xl font-semibold">Laster inn medlemmer...</h2>
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={applications}
          renderRowActions={(application: ApplicationType) => (
            <>
              <button
                onClick={() => handleEdit(application)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleRemove(application.id)}
                className="text-red-500 hover:text-red-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
