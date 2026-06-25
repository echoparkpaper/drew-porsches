'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car } from '@/types';

interface CarFormProps {
  initialData?: Car;
  onSubmit?: (data: Partial<Car>) => Promise<void>;
  isLoading?: boolean;
}

export function CarForm({ initialData, onSubmit, isLoading = false }: CarFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    make: initialData?.make || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    condition: initialData?.condition || 'good',
    notes: initialData?.notes || '',
    valuation: initialData?.valuation || 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['year', 'price', 'mileage', 'valuation'].includes(name) ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.make || !formData.model) {
      setError('Make and model are required');
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        const method = initialData ? 'PUT' : 'POST';
        const url = initialData ? `/api/cars/${initialData.id}` : '/api/cars';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to save car');
        }

        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Make *</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="e.g., Porsche"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model *</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="e.g., 911"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year *</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Valuation</label>
          <input
            type="number"
            name="valuation"
            value={formData.valuation}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Add any notes about the car..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Car' : 'Add Car'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center rounded-md bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
