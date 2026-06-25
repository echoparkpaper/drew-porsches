'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteCarButton({ carId }: { carId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Remove this vehicle from your collection? This cannot be undone.')) {
      return;
    }
    setIsDeleting(true);
    const res = await fetch(`/api/cars/${carId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setIsDeleting(false);
      alert('Failed to delete vehicle.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="eyebrow text-[#d5001c] hover:text-[#b00017] transition-colors disabled:opacity-50"
    >
      {isDeleting ? 'Removing…' : 'Remove Vehicle'}
    </button>
  );
}
