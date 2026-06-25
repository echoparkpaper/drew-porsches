import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CarForm } from '@/components/car-form';

export default async function NewCarPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { model } = await searchParams;

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            DREW<span className="text-[#d5001c]">.</span>PORSCHES
          </Link>
          <Link href="/dashboard" className="eyebrow text-[#0a0a0a] hover:text-[#d5001c] transition-colors">
            ← Collection
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
        <p className="eyebrow text-[#d5001c] mb-4">New Acquisition</p>
        <h1 className="text-4xl font-light tracking-tight mb-12">Add a Vehicle</h1>
        <CarForm defaultModelId={model} />
      </main>
    </div>
  );
}
