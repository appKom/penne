'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { FileText, Edit, XIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import NumberInput from '@/components/form/NumberInput';
import DateInput from '@/components/form/DateInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import Table from '@/components/form/Table';

import { ApplicationType } from '@/lib/types';
import { formatDateNorwegian } from '@/lib/dateUtils';
import Checkbox from '@/components/form/Checkbox';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [editingApplication, setEditingApplication] =
    useState<ApplicationType | null>(null);

  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [grantedAmount, setGrantedAmount] = useState(0);
  const [amountApplied, setAmountApplied] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [dateApplied, setDateApplied] = useState<Date | undefined>();
  const [dateGranted, setDateGranted] = useState<Date | undefined>();
  const [approved, setApproved] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admin/application');
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? `Klarte ikke å hente søknader: ${error.message}`
            : 'Klarte ikke å hente søknader',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const resetForm = () => {
    setPurpose('');
    setDescription('');
    setGrantedAmount(0);
    setAmountApplied(0);
    setRecipient('');
    setDateApplied(undefined);
    setDateGranted(undefined);
    setAttachment(null);
    setAttachmentPreview(null);
    setEditingApplication(null);
    setApproved(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('purpose', purpose);
    formData.append('description', description);
    formData.append('grantedAmount', grantedAmount.toString());
    formData.append('amountApplied', amountApplied.toString());
    formData.append('recipient', recipient);
    formData.append('dateApplied', dateApplied?.toISOString() || '');
    formData.append('dateGranted', dateGranted?.toISOString() || '');
    formData.append('approved', approved ? 'true' : 'false');
    if (attachment) {
      formData.append('attachment', attachment);
    }

    const isEditing = Boolean(editingApplication);
    const method = isEditing ? 'PUT' : 'POST';

    try {
      if (isEditing && editingApplication) {
        formData.append('id', editingApplication.id.toString());
      }

      const response = await fetch('/api/admin/application', {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const { application } = await response.json();
      toast.success(isEditing ? 'Søknad oppdatert' : 'Søknad lagt til!');

      setApplications((prev) => {
        if (isEditing) {
          return prev.map((app) =>
            app.id === editingApplication?.id ? application : app,
          );
        }
        return [...prev, application];
      });

      resetForm();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Feil ved lagring av søknad: ${error.message}`
          : 'Klarte ikke å lagre søknad',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (application: ApplicationType) => {
    setEditingApplication(application);
    setPurpose(application.purpose);
    setDescription(application.description || '');
    setGrantedAmount(application.grantedAmount);
    setAmountApplied(application.amountApplied);
    setRecipient(application.recipient);
    setApproved(application.approved);
    setDateApplied(
      application.dateApplied ? new Date(application.dateApplied) : undefined,
    );
    setDateGranted(
      application.dateGranted ? new Date(application.dateGranted) : undefined,
    );

    if (application.attachment) {
      setAttachmentPreview(application.attachment);
      setAttachment(new File([], application.attachment));
    }
  };

  const handleRemove = async (id: number) => {
    if (!window.confirm('Er du sikker på at du vil slette denne søknaden?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/application', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success('Søknad fjernet!');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Klarte ikke å fjerne søknad: ${error.message}`
          : 'Klarte ikke å fjerne søknad',
      );
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      setAttachmentPreview(URL.createObjectURL(file));
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error('Ikke støttet filtype. Last opp PDF eller bilde.');
      return;
    }

    setAttachment(file);
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
      renderCell: (item: ApplicationType) =>
        formatDateNorwegian(item.dateApplied),
    },
    {
      header: 'Dato Innvilget',
      accessor: 'dateGranted' as keyof ApplicationType,
      renderCell: (item: ApplicationType) =>
        formatDateNorwegian(item.dateGranted),
    },
    {
      header: 'Innvilget',
      accessor: 'approved' as keyof ApplicationType,
      renderCell: (item: ApplicationType) => (item.approved ? 'Ja' : 'Nei'),
    },
    {
      header: 'Vedlegg',
      accessor: 'attachment' as keyof ApplicationType,
      renderCell: (application: ApplicationType) => {
        if (!application.attachment) return null;
        const isPdf = application.attachment.endsWith('.pdf');

        return isPdf ? (
          <iframe
            src={application.attachment}
            title="PDF Preview"
            width="50"
            height="50"
          />
        ) : (
          <Image
            src={application.attachment}
            alt={application.purpose}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-4 w-full items-start">
      <h1 className="text-2xl font-bold mb-4">Administrer søknader</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <TextInput
          id="purpose"
          label="Formål"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />
        <TextInput
          id="recipient"
          label="Mottaker"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <TextAreaInput
          id="description"
          label="Beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

        <Checkbox
          id="approved"
          label="Er søknaden innvilget?"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
        />

        {attachmentPreview && (
          <div className="mt-4 w-full max-w-md">
            {attachmentPreview.endsWith('.pdf') ||
            attachment?.type === 'application/pdf' ? (
              <iframe
                src={attachmentPreview}
                title="PDF Preview"
                width="100%"
                height="500px"
              />
            ) : (
              <img
                src={attachmentPreview}
                alt="Preview"
                className="max-w-full h-auto"
              />
            )}
          </div>
        )}

        <div className="flex flex-row gap-2">
          {attachmentPreview && (
            <button
              type="button"
              onClick={() => {
                setAttachment(null);
                setAttachmentPreview(null);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              <XIcon className="inline-block mr-2 h-4 w-4" />
              Fjern vedlegg
            </button>
          )}

          <input
            id="fileInput"
            type="file"
            accept="application/pdf, image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md"
          >
            <Upload className="inline-block mr-2 h-4 w-4" />
            Last opp vedlegg
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
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
        </div>
        <p className="text-gray-300">Last opp PDF, PNG eller JPG</p>
      </form>

      <h2 className="text-xl font-semibold mb-2">Søknader</h2>
      {isLoading ? (
        <div className="text-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-y-2 border-onlineyellow mb-4"></div>
            <h2 className="text-2xl font-semibold">Laster inn søknader...</h2>
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
