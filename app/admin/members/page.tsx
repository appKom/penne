'use client';

import { useState, useRef, useEffect } from 'react';
import { UserPlus, Upload, XIcon } from 'lucide-react';
import { MemberType, GenderType } from '@/lib/types';
import toast from 'react-hot-toast';

const AdminMemberPage = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderType>('Annet');
  const [role, setRole] = useState('Medlem');
  const [isCurrent, setIsCurrent] = useState(true);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const roles = ['Leder', 'Medlem'];
  const genders: GenderType[] = ['Mann', 'Kvinne', 'Annet'];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/admin/member');
        if (response.ok) {
          const data = await response.json();
          setMembers(data.members);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Klarte ikke å hente medlemmer: ${error.message}`);
        } else {
          toast.error('Klarte ikke å hente medlemmer');
        }
      }
    };

    fetchMembers();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('gender', gender);
    formData.append('isCurrent', isCurrent.toString());
    formData.append('year', selectedYear.toString());
    formData.append('image', image);

    try {
      const response = await fetch('/api/admin/member', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Medlem lagt til!');
        resetForm();
        setMembers([...members, (await response.json()).member]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to add member: ${error.message}`);
      } else {
        toast.error('Failed to add member');
      }
    }
  };

  const handleRemove = async (id: number) => {
    try {
      const response = await fetch('/api/admin/member', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id));
        toast.success('Medlem fjernet!');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to remove member: ${error.message}`);
      } else {
        toast.error('Failed to remove member');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setImage(null);
    setImagePreview(null);
    setRole('');
    setGender('Annet');
    setIsCurrent(true);
    setSelectedYear(currentYear);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrer medlemmer</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200"
          >
            Navn
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-1 block w-full max-w-lg rounded-md bg-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <div className="flex items-center gap-4  mt-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            {isCurrent && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="inline-block mr-2 h-4 w-4" />
                Last opp bilde
              </button>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Rolle
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-800 text-gray-200"
          >
            <option className="text-gray-200" value="" disabled>
              Velgt en rolle
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Kjønn
          </label>
          <select
            value={gender}
            required
            onChange={(e) => setGender(e.target.value as GenderType)}
            className="mt-1 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-800 text-gray-200"
          >
            <option className="text-gray-200" value="" disabled>
              Velgt kjønn
            </option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="current-member"
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label
            htmlFor="current-member"
            className="text-sm font-medium text-gray-200"
          >
            Aktivt medlem
          </label>
        </div>
        {!isCurrent && (
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Aktivt år
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="mt-1 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-800 text-gray-200"
            >
              <option className="text-gray-200" value="" disabled>
                Velgt et år
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Legg til medlem
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Member List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600 border border-gray-600 text-white">
          <thead className="bg-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Navn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Bilde
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Rolle
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-600">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={member.imageHref}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {member.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {member.isCurrent ? 'Aktiv' : `(${member.year})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMemberPage;
