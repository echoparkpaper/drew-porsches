'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const labelCls = 'eyebrow text-[#5b5b5b] block mb-3';
const inputCls =
  'w-full border-b border-[#e3e3e3] py-2 text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent';

export default function NewMaintenanceRecordPage() {
  const router = useRouter();
  const params = useParams();
  const carId = params.id as string;

  const [formData, setFormData] = useState({
    serviceDate: '',
    description: '',
    cost: '',
    mileageAtService: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.serviceDate || !formData.description) {
      setError('Service date and description are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId,
          serviceDate: formData.serviceDate,
          description: formData.description,
          cost: formData.cost,
          mileageAtService: formData.mileageAtService,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create record');
      }

      router.push(`/cars/${carId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            THE LUCURELL<span className="text-[#d5001c]">.</span>COLLECTION
          </Link>
          <Link href={`/cars/${carId}`} className="eyebrow text-[#0a0a0a] hover:text-[#d5001c] transition-colors">
            ← Vehicle
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 lg:px-10 py-16">
        <p className="eyebrow text-[#d5001c] mb-4">Service</p>
        <h1 className="text-4xl font-light tracking-tight mb-12">Add a Record</h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="border-l-2 border-[#d5001c] bg-[#d5001c]/5 px-4 py-3">
              <p className="text-sm text-[#b00017]">{error}</p>
            </div>
          )}

          <div>
            <label className={labelCls}>Service Date *</label>
            <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} className={`${inputCls} cursor-pointer`} />
          </div>

          <div>
            <label className={labelCls}>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className={inputCls} placeholder="Major service, brake replacement, detailing…" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <label className={labelCls}>Cost</label>
              <input type="number" name="cost" value={formData.cost} onChange={handleChange} className={inputCls} min="0" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <label className={labelCls}>Mileage at Service</label>
              <input type="number" name="mileageAtService" value={formData.mileageAtService} onChange={handleChange} className={inputCls} min="0" placeholder="0" />
            </div>
          </div>

          <div className="flex items-center gap-8 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="eyebrow bg-[#0a0a0a] hover:bg-[#d5001c] text-white px-8 py-4 transition-colors duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Saving…' : 'Add Record'}
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
      </main>
    </div>
  );
}
