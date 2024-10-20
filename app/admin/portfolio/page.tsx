'use client';

import { useEffect, useState } from 'react';
import { GraphType } from '@/lib/types';
import TextInput from '@/components/form/TextInput';
import { UserPlus, Edit, XIcon } from 'lucide-react';
import Table from '@/components/form/Table';
import toast from 'react-hot-toast';
import DateInput from '@/components/form/DateInput';
import { formatDateNorwegian } from '@/lib/dateUtils';

const AdminPortfolioPage = () => {
  const [performances, setPerformances] = useState<GraphType[]>([]);

  const [portfolio, setPortfolio] = useState<GraphType>({
    date: new Date(),
    value: 0,
  });

  const [editingPortfolio, setEditingPortfolio] = useState<GraphType | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/admin/portfolio');
        if (response.ok) {
          const data = await response.json();

          setPerformances(
            data.performance.sort((a: GraphType, b: GraphType) =>
              a.date > b.date ? -1 : 1,
            ),
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Klarte ikke å hente portfølje: ${error.message}`);
        } else {
          toast.error('Klarte ikke å hente portfølje');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append('date', portfolio.date.toISOString());

    formData.append('value', (portfolio?.value || 0).toString());

    try {
      let response;

      if (editingPortfolio) {
        if (editingPortfolio?.id !== undefined) {
          formData.append('id', editingPortfolio.id.toString());
        }
        response = await fetch('/api/admin/portfolio', {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('/api/admin/portfolio', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        toast.success(
          editingPortfolio
            ? 'Sammensettning oppdatert'
            : 'Sammensettning lagt til!',
        );
        resetForm();

        if (editingPortfolio) {
          const updatedComposition = await response.json();
          setPerformances(
            performances.map((portfolio) =>
              portfolio.id === editingPortfolio.id
                ? updatedComposition.performance
                : portfolio,
            ),
          );
        } else {
          setPerformances([
            ...performances,
            (await response.json()).performance,
          ]);
        }

        setEditingPortfolio(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to add application: ${error.message}`);
      } else {
        toast.error(
          editingPortfolio
            ? 'Klarte ikke å oppdatere sammenseetning'
            : 'Klarte ikke å legge til sammensetning',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPortfolio({
      date: new Date(),
      value: 0,
    });
  };

  const handleEdit = (portfolio: GraphType) => {
    setEditingPortfolio(portfolio);
    setPortfolio({
      ...portfolio,
      date: new Date(portfolio.date),
    });
  };

  const handleRemove = async (id: number) => {
    setIsLoading(true);

    const confirmed = window.confirm(
      'Er du sikker på at du vil slette denne søknaden?',
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/portfolio`, {
        body: JSON.stringify({ id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Sammensetning slettet');
        setPerformances(
          performances.filter((portfolio) => portfolio.id !== id),
        );
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Klarte ikke å fjerne sammensetningen: ${error.message}`);
      } else {
        toast.error('Klarte ikke å fjerne sammensetning');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: 'Dato',
      accessor: 'date' as keyof GraphType,
      renderCell: (item: GraphType) => formatDateNorwegian(item.date),
    },
    {
      header: 'Verdi',
      accessor: 'value' as keyof GraphType,
    },
  ];
  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer portfølje</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <DateInput
          label="Dato"
          value={portfolio?.date ? new Date(portfolio.date) : new Date()}
          onChange={(e) =>
            setPortfolio((prevPortfolio) => ({
              ...prevPortfolio,
              date: new Date(e.target.value),
            }))
          }
        />
        <TextInput
          id="value"
          label="Verdi"
          type="number"
          value={portfolio?.value?.toString() || '0'}
          onChange={(e) =>
            setPortfolio((prevPortfolio) => ({
              ...prevPortfolio,
              value: parseFloat(e.target.value),
            }))
          }
        />

        <button
          type="submit"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${editingPortfolio ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {editingPortfolio ? 'Oppdater' : 'Legg til'} verdi
        </button>
      </form>
      {isLoading ? (
        <div className=" text-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-y-2 border-onlineyellow mb-4"></div>
            <h2 className="text-2xl font-semibold">Laster inn portfølje...</h2>
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={performances}
          renderRowActions={(portfolio: GraphType) => (
            <>
              <button
                onClick={() => handleEdit(portfolio)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  portfolio?.id !== undefined && handleRemove(portfolio.id)
                }
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

export default AdminPortfolioPage;
