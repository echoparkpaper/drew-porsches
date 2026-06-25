import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

const fmtCurrency = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const cars = await db.getCars(session.user.id);
  const primaryPhotos = await db.getPrimaryPhotoIds(cars.map((c) => c.id));

  const totalValuation = cars.reduce((sum, car) => sum + (Number(car.valuation) || 0), 0);
  const averageMileage =
    cars.length > 0
      ? Math.round(cars.reduce((sum, car) => sum + (Number(car.mileage) || 0), 0) / cars.length)
      : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            The Lucurell Collection
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="eyebrow text-[#0a0a0a]">
              Collection
            </Link>
            <Link href="/library" className="eyebrow text-[#5b5b5b] hover:text-[#0a0a0a] transition-colors">
              Library
            </Link>
            <span className="hidden md:inline text-sm text-[#5b5b5b]">{session.user.email}</span>
            <a href="/api/auth/signout" className="eyebrow text-[#0a0a0a] hover:text-[#d5001c] transition-colors">
              Sign out
            </a>
          </div>
        </div>
      </header>

      {/* Hero / stats */}
      <section className="border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow text-[#d5001c] mb-4">The Collection</p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-16">
            Your Collection
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e3e3e3] border border-[#e3e3e3]">
            <Stat label="Vehicles" value={cars.length.toString()} />
            <Stat label="Total Valuation" value={fmtCurrency(totalValuation)} />
            <Stat label="Average Mileage" value={averageMileage.toLocaleString()} />
          </div>
        </div>
      </section>

      {/* Collection grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl font-light tracking-tight">
            {cars.length > 0 ? 'Vehicles' : 'Begin your collection'}
          </h2>
          <Link
            href="/cars/new"
            className="eyebrow bg-[#0a0a0a] hover:bg-[#d5001c] text-white px-6 py-3 transition-colors duration-300"
          >
            Add Vehicle
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="border border-dashed border-[#e3e3e3] py-24 text-center">
            <p className="text-[#5b5b5b] mb-6">No vehicles in your collection yet.</p>
            <Link
              href="/cars/new"
              className="eyebrow text-[#d5001c] hover:text-[#b00017] transition-colors"
            >
              Add your first vehicle →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Link key={car.id} href={`/cars/${car.id}`} className="group block">
                <div className="car-media relative aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                  {primaryPhotos[car.id] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/photos/${primaryPhotos[car.id]}`}
                      alt={`${car.make} ${car.model}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl font-thin text-white/10 select-none">
                        {car.make.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#d5001c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
                <div className="pt-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-medium tracking-tight">
                      {car.make} {car.model}
                    </h3>
                    <span className="text-sm text-[#5b5b5b]">{car.year}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-[#5b5b5b]">
                    <span>{Number(car.mileage).toLocaleString()} mi</span>
                    <span className="w-px h-3 bg-[#e3e3e3]" />
                    <span className="capitalize">{car.condition}</span>
                  </div>
                  <p className="mt-3 text-base font-medium text-[#0a0a0a]">
                    ${Number(car.valuation).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-8 py-10">
      <p className="eyebrow text-[#5b5b5b] mb-4">{label}</p>
      <p className="text-4xl lg:text-5xl font-light tracking-tight">{value}</p>
    </div>
  );
}
