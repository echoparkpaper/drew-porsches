'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car } from '@/types';

interface CarFormProps {
  initialData?: Car;
  onSubmit?: (data: Partial<Car>) => Promise<void>;
  isLoading?: boolean;
}

const labelCls = 'eyebrow text-[#5b5b5b] block mb-3';
const inputCls =
  'w-full border-b border-[#e3e3e3] py-2 text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['year', 'price', 'mileage', 'valuation'].includes(name)
        ? parseFloat(value)
        : value,
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
          throw new Error(data.error || 'Failed to save vehicle');
        }

        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="border-l-2 border-[#d5001c] bg-[#d5001c]/5 px-4 py-3">
          <p className="text-sm text-[#b00017]">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <label className={labelCls}>Make *</label>
          <input type="text" name="make" value={formData.make} onChange={handleChange} className={inputCls} placeholder="Porsche" />
        </div>

        <div>
          <label className={labelCls}>Model *</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} className={inputCls} placeholder="911 Carrera S" />
        </div>

        <div>
          <label className={labelCls}>Year *</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} className={inputCls} min="1900" max={new Date().getFullYear() + 1} />
        </div>

        <div>
          <label className={labelCls}>Mileage</label>
          <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className={inputCls} min="0" />
        </div>

        <div>
          <label className={labelCls}>Purchase Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className={inputCls} min="0" step="0.01" />
        </div>

        <div>
          <label className={labelCls}>Current Valuation</label>
          <input type="number" name="valuation" value={formData.valuation} onChange={handleChange} className={inputCls} min="0" step="0.01" />
        </div>

        <div>
          <label className={labelCls}>Condition</label>
          <select name="condition" value={formData.condition} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className={inputCls} placeholder="Provenance, modifications, service notes…" />
      </div>

      <div className="flex items-center gap-8 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="eyebrow bg-[#0a0a0a] hover:bg-[#d5001c] text-white px-8 py-4 transition-colors duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Saving…' : initialData ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="eyebrow text-[#5b5b5b] hover:text-[#0a0a0a] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
