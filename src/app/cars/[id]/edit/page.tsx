import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { CarForm } from '@/components/car-form';

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const car = await db.getCarById(id, session.user.id);

  if (!car) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            The Lucurell Collection
          </Link>
          <Link href={`/cars/${car.id}`} className="eyebrow text-[#0a0a0a] hover:text-[#d5001c] transition-colors">
            ← Vehicle
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
        <p className="eyebrow text-[#d5001c] mb-4">Edit</p>
        <h1 className="text-4xl font-light tracking-tight mb-12">
          {car.year} {car.make} {car.model}
        </h1>
        <CarForm initialData={car} />
      </main>
    </div>
  );
}
