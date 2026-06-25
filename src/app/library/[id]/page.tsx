import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getModelById, CATALOG, startYear } from '@/lib/porsche-catalog';

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    redirect('/library');
  }

  const related = CATALOG.filter(
    (m) => m.line === model.line && m.id !== model.id
  );

  const addHref = `/cars/new?model=${encodeURIComponent(model.id)}`;

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            DREW<span className="text-[#d5001c]">.</span>PORSCHES
          </Link>
          <Link href="/library" className="eyebrow text-[#0a0a0a] hover:text-[#d5001c] transition-colors">
            ← Library
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[20rem] leading-none font-thin text-white/5 select-none whitespace-nowrap">
            {model.line}
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <p className="eyebrow text-[#d5001c] mb-4">
            {model.generation} · {model.years}
          </p>
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight">{model.name}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-white/70">
            <span>{model.category}</span>
            <span>{model.cooling}</span>
            <span>{model.layout}</span>
          </div>
          <div className="mt-10">
            <Link
              href={addHref}
              className="eyebrow bg-white text-[#0a0a0a] hover:bg-[#d5001c] hover:text-white px-6 py-3 transition-colors duration-300"
            >
              Add to Garage
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-light tracking-tight mb-8">Specification</h2>
          <dl className="space-y-px bg-[#e3e3e3] border border-[#e3e3e3]">
            <Spec label="Generation" value={model.generation} />
            <Spec label="Production" value={model.years} />
            <Spec label="Category" value={model.category} />
            <Spec label="Engine" value={model.engine} />
            <Spec label="Power" value={model.power} />
            <Spec label="Layout" value={model.layout} />
            <Spec label="Cooling" value={model.cooling} />
            <Spec label="Body Styles" value={model.bodyStyles} />
          </dl>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-light tracking-tight mb-8">Overview</h2>
          <p className="text-lg text-[#0a0a0a] leading-relaxed max-w-2xl">
            {model.notable}
          </p>

          {related.length > 0 && (
            <div className="mt-16">
              <p className="eyebrow text-[#5b5b5b] mb-6">More from {model.line}</p>
              <div className="flex flex-wrap gap-3">
                {related.map((m) => (
                  <Link
                    key={m.id}
                    href={`/library/${m.id}`}
                    className="text-sm px-4 py-2 border border-[#e3e3e3] text-[#5b5b5b] hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                  >
                    {m.name} · {m.years}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-6 py-5">
      <p className="eyebrow text-[#5b5b5b] mb-1">{label}</p>
      <p className="text-[#0a0a0a] font-medium">{value}</p>
    </div>
  );
}
