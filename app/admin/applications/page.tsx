'use client';
import TextInput from '@/components/form/TextInput';
import NumberInput from '@/components/form/NumberInput';
import DateInput from '@/components/form/DateInput';
import { useState } from 'react';
import { FileText, Edit } from 'lucide-react';

const ApplicationsPage = () => {
  const [formål, setFormål] = useState('');
  const [innvilgetBelop, setInnvilgetBelop] = useState(0);
  const [soktBelop, setSoktBelop] = useState(0);
  const [motakker, setMotakker] = useState('');
  const [datoSokt, setDatoSokt] = useState<Date | undefined>(undefined);
  const [datoInnvilget, setDatoInnvilget] = useState<Date | undefined>(
    undefined,
  );
  const [editingApplication, setEditingApplication] = useState(false);

  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer søknader</h1>
      <form className="space-y-4 mb-8">
        <TextInput
          id="formål"
          label="Formål"
          value={formål}
          onChange={(e) => setFormål(e.target.value)}
        />
        <DateInput
          label="Dato søkt"
          value={datoSokt}
          onChange={(e) =>
            setDatoSokt(e.target.value ? new Date(e.target.value) : undefined)
          }
        />
        <DateInput
          label="Dato innvilget"
          value={datoInnvilget}
          onChange={(e) =>
            setDatoInnvilget(
              e.target.value ? new Date(e.target.value) : undefined,
            )
          }
        />
        <TextInput
          id="motakker"
          label="Motakker"
          value={motakker}
          onChange={(e) => setMotakker(e.target.value)}
        />
        <NumberInput
          id="innvilgetBelop"
          label="Innvilget Beløp"
          value={innvilgetBelop}
          onChange={(e) => setInnvilgetBelop(parseFloat(e.target.value))}
        />
        <NumberInput
          id="soktBelop"
          label="Søkt Beløp"
          value={soktBelop}
          onChange={(e) => setSoktBelop(parseFloat(e.target.value))}
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
    </div>
  );
};

export default ApplicationsPage;
