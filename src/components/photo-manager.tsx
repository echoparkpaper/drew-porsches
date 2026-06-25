'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CarPhoto } from '@/types';

export function PhotoManager({
  carId,
  photos,
}: {
  carId: string;
  photos: CarPhoto[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError('');
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append('file', file);
        const res = await fetch(`/api/cars/${carId}/photos`, {
          method: 'POST',
          body,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Upload failed');
        }
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm('Remove this photo?')) return;
    const res = await fetch(`/api/photos/${photoId}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light tracking-tight">Gallery</h2>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="eyebrow text-[#d5001c] hover:text-[#b00017] transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : '+ Add Photos'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="border-l-2 border-[#d5001c] bg-[#d5001c]/5 px-4 py-3 mb-6">
          <p className="text-sm text-[#b00017]">{error}</p>
        </div>
      )}

      {photos.length === 0 ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border border-dashed border-[#e3e3e3] py-20 text-center hover:border-[#0a0a0a] transition-colors"
        >
          <p className="text-[#5b5b5b]">Drag in or click to add photos of this vehicle.</p>
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-[4/3] bg-[#f2f2f2] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/photos/${photo.id}`}
                alt="Vehicle"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#d5001c]"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
