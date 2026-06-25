import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { DeleteCarButton } from '@/components/delete-car-button';

export default async function CarDetailPage({
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

  const maintenance = await db.getMaintenanceRecords(car.id);
  const totalService = maintenance.reduce((s, r) => s + (Number(r.cost) || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[18rem] leading-none font-thin text-white/5 select-none">
            {car.make.charAt(0)}
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <p className="eyebrow text-[#d5001c] mb-4">{car.year}</p>
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight">
            {car.make} {car.model}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-white/70">
            <span>{Number(car.mileage).toLocaleString()} miles</span>
            <span className="capitalize">{car.condition} condition</span>
            <span className="text-white font-medium">
              ${Number(car.valuation).toLocaleString()}
            </span>
          </div>
          <div className="mt-10 flex items-center gap-8">
            <Link
              href={`/cars/${car.id}/edit`}
              className="eyebrow bg-white text-[#0a0a0a] hover:bg-[#d5001c] hover:text-white px-6 py-3 transition-colors duration-300"
            >
              Edit Details
            </Link>
            <DeleteCarButton carId={car.id} />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Specs */}
        <div className="lg:col-span-1 space-y-10">
          <h2 className="text-2xl font-light tracking-tight">Specification</h2>
          <dl className="space-y-px bg-[#e3e3e3] border border-[#e3e3e3]">
            <Spec label="Year" value={car.year.toString()} />
            <Spec label="Mileage" value={`${Number(car.mileage).toLocaleString()} mi`} />
            <Spec label="Condition" value={car.condition} capitalize />
            <Spec label="Purchase Price" value={`$${Number(car.price).toLocaleString()}`} />
            <Spec label="Valuation" value={`$${Number(car.valuation).toLocaleString()}`} />
            <Spec label="Service Spend" value={`$${totalService.toLocaleString()}`} />
          </dl>

          {car.notes && (
            <div>
              <p className="eyebrow text-[#5b5b5b] mb-3">Notes</p>
              <p className="text-[#0a0a0a] leading-relaxed">{car.notes}</p>
            </div>
          )}
        </div>

        {/* Maintenance */}
        <div className="lg:col-span-2">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-light tracking-tight">Service History</h2>
            <Link
              href={`/cars/${car.id}/maintenance/new`}
              className="eyebrow text-[#d5001c] hover:text-[#b00017] transition-colors"
            >
              + Add Record
            </Link>
          </div>

          {maintenance.length === 0 ? (
            <div className="border border-dashed border-[#e3e3e3] py-20 text-center">
              <p className="text-[#5b5b5b]">No service records logged.</p>
            </div>
          ) : (
            <div className="border-t border-[#e3e3e3]">
              {maintenance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start justify-between gap-6 py-6 border-b border-[#e3e3e3]"
                >
                  <div>
                    <p className="text-sm text-[#5b5b5b] mb-1">
                      {new Date(record.service_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-[#0a0a0a]">{record.description}</p>
                    <p className="text-sm text-[#5b5b5b] mt-1">
                      {Number(record.mileage_at_service).toLocaleString()} mi
                    </p>
                  </div>
                  <p className="text-base font-medium whitespace-nowrap">
                    ${Number(record.cost).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Spec({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="bg-white px-6 py-5 flex items-center justify-between">
      <span className="eyebrow text-[#5b5b5b]">{label}</span>
      <span className={`text-[#0a0a0a] font-medium ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </span>
    </div>
  );
}
