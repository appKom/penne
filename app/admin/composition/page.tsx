'use client';

import { useEffect, useState } from 'react';
import { CompositionType } from '@/lib/types';
import TextInput from '@/components/form/TextInput';
import { UserPlus, Edit, XIcon } from 'lucide-react';
import Table from '@/components/form/Table';
import toast from 'react-hot-toast';

const AdminCompositionPage = () => {
  const [composition, setComposition] = useState<CompositionType | null>(null);
  const [compositions, setCompositions] = useState<CompositionType[]>([]);

  const [editingComposition, setEditingComposition] =
    useState<CompositionType | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComposition = async () => {
      try {
        const response = await fetch('/api/admin/composition');
        if (response.ok) {
          const data = await response.json();

          setCompositions(data.composition);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Klarte ikke å hente sammensetning: ${error.message}`);
        } else {
          toast.error('Klarte ikke å hente sammensetning');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComposition();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    // setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', composition?.company || '');
    formData.append('category', composition?.category || '');
    formData.append('percentage', composition?.percentage.toString() || '');

    try {
      let response;

      if (editingComposition) {
        if (editingComposition?.id !== undefined) {
          formData.append('id', editingComposition.id.toString());
        }
        response = await fetch('/api/admin/composition', {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('/api/admin/composition', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        toast.success(
          editingComposition
            ? 'Sammensettning oppdatert'
            : 'Sammensettning lagt til!',
        );
        resetForm();

        if (editingComposition) {
          const updatedComposition = await response.json();
          setCompositions(
            compositions.map((composition) =>
              composition.id === editingComposition.id
                ? updatedComposition.composition
                : composition,
            ),
          );
        } else {
          setCompositions([
            ...compositions,
            (await response.json()).composition,
          ]);
        }

        setEditingComposition(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to add application: ${error.message}`);
      } else {
        toast.error(
          editingComposition
            ? 'Klarte ikke å oppdatere sammenseetning'
            : 'Klarte ikke å legge til sammensetning',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setComposition(null);
  };

  const handleEdit = (composition: CompositionType) => {
    setEditingComposition(composition);
    setComposition(composition);
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
      const response = await fetch(`/api/admin/composition`, {
        body: JSON.stringify({ id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Sammensetning slettet');
        setCompositions(
          compositions.filter((composition) => composition.id !== id),
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
      header: 'Selskap',
      accessor: 'company' as keyof CompositionType,
    },
    {
      header: 'Prosentandel',
      accessor: 'percentage' as keyof CompositionType,
    },
    {
      header: 'Kategori',
      accessor: 'category' as keyof CompositionType,
    },
  ];
  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer portfølje</h1>
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

        <button
          type="submit"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${editingComposition ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {editingComposition ? 'Oppdater' : 'Legg til'} selskap
        </button>
      </form>
      {isLoading ? (
        <div className=" text-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-y-2 border-onlineyellow mb-4"></div>
            <h2 className="text-2xl font-semibold">
              Laster inn sammensetning...
            </h2>
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={compositions}
          renderRowActions={(composition: CompositionType) => (
            <>
              <button
                onClick={() => handleEdit(composition)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  composition?.id !== undefined && handleRemove(composition.id)
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

export default AdminCompositionPage;
