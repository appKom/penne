'use client';
import TextInput from '@/components/form/TextInput';
import NumberInput from '@/components/form/NumberInput';
import DateInput from '@/components/form/DateInput';
import { useState, useEffect, useRef } from 'react';
import { FileText, Edit, XIcon, Upload } from 'lucide-react';
import { ApplicationType } from '@/lib/types';
import toast from 'react-hot-toast';
import Table from '@/components/form/Table';
import { formatDateNorwegian } from '@/lib/dateUtils';
import Image from 'next/image';
import TextAreaInput from '@/components/form/TextAreaInput';

const ApplicationsPage = () => {
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [grantedAmount, setGrantedAmount] = useState(0);
  const [amountApplied, setAmountApplied] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [dateApplied, setDateApplied] = useState<Date | undefined>(undefined);
  const [dateGranted, setDateGranted] = useState<Date | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null,
  );

  const [attachment, setAttachment] = useState<File | null>(null);

  const [editingApplication, setEditingApplication] =
    useState<ApplicationType | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('purpose', purpose);
    formData.append('grantedAmount', grantedAmount.toString());
    formData.append('amountApplied', amountApplied.toString());
    formData.append('recipient', recipient);
    formData.append('dateApplied', dateApplied?.toISOString() || '');
    formData.append('dateGranted', dateGranted?.toISOString() || '');
    formData.append('description', description);

    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      let response;

      if (editingApplication) {
        formData.append('id', editingApplication.id.toString());
        response = await fetch('/api/admin/application', {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('/api/admin/application', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        toast.success(
          editingApplication ? 'Søknad oppdatert' : 'Søknad lagt til!',
        );
        resetForm();

        if (editingApplication) {
          const updatedApplication = await response.json();
          setApplications(
            applications.map((application) =>
              application.id === editingApplication.id
                ? updatedApplication.application
                : application,
            ),
          );
        } else {
          setApplications([
            ...applications,
            (await response.json()).application,
          ]);
        }

        setEditingApplication(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to add application: ${error.message}`);
      } else {
        toast.error(
          editingApplication
            ? 'Klarte ikke å oppdatere søknad'
            : 'Klarte ikke å legge til søknad',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPurpose('');
    setGrantedAmount(0);
    setAmountApplied(0);
    setRecipient('');
    setDescription('');
    setDateApplied(undefined);
    setDateGranted(undefined);
    setEditingApplication(null);
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleEdit = (application: ApplicationType) => {
    setEditingApplication(application);
    setPurpose(application.purpose);
    setDescription(application.description || '');
    setGrantedAmount(application.grantedAmount);
    setAmountApplied(application.amountApplied);
    setRecipient(application.recipient);
    setDateApplied(
      application.dateApplied ? new Date(application.dateApplied) : undefined,
    );
    setDateGranted(
      application.dateGranted ? new Date(application.dateGranted) : undefined,
    );
    setAttachmentPreview(application.attachment);
    setAttachment(
      application.attachment ? new File([], application.attachment) : null,
    );
  };

  const handleRemove = async (id: number) => {
    const confirmed = window.confirm(
      'Er du sikker på at du vil slette denne søknaden?',
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch('/api/admin/application', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setApplications(
          applications.filter((application) => application.id !== id),
        );
        toast.success('Søknad fjernet!');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Klarte ikke å fjerne søknad: ${error.message}`);
      } else {
        toast.error('Klarte ikke å fjerne søknad');
      }
    }
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
      header: 'Vedlegg',
      accessor: 'attachments' as keyof ApplicationType,
      renderCell: (application: ApplicationType) => {
        if (!application.attachment) return null;

        const fileType = application.attachment.split('.').pop();

        return fileType === 'pdf' ? (
          <iframe
            src={application.attachment}
            title="PDF Preview"
            width="50"
            height="50"
          />
        ) : (
          <Image
            height={50}
            width={50}
            src={application.attachment}
            alt={application.purpose}
            className="w-10 h-10 rounded-full object-cover"
          />
        );
      },
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);

      if (file.type === 'application/pdf') {
        const previewUrl = URL.createObjectURL(file);
        setAttachmentPreview(previewUrl);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Unsupported file type. Please upload a PDF or an image.');
      }
    }
  };

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
          label="Motakker"
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
        {attachmentPreview && (
          <div className="mt-4 w-full max-w-md">
            {attachmentPreview.split('.').pop() === 'pdf' ||
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
            <div>
              <button
                type="button"
                onClick={() => {
                  setAttachment(null);
                  setAttachmentPreview(null);
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="inline-block mr-2 h-4 w-4" />
                Slett vedlegg
              </button>
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="inline-block mr-2 h-4 w-4" />
            Last opp vedlegg
          </button>

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
        </div>
        <p className="text-gray-300">Last opp PDF, PNG eller JPG</p>
      </form>

      <h2 className="text-xl font-semibold mb-2">Søknader</h2>
      {isLoading ? (
        <div className=" text-white flex items-center justify-center">
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
