import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const cars = await db.getCars(session.user.id);

  const totalValuation = cars.reduce((sum, car) => sum + (car.valuation || 0), 0);
  const averageMileage = cars.length > 0 ? Math.round(cars.reduce((sum, car) => sum + car.mileage, 0) / cars.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Drew Porsches</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <a href="/api/auth/signout" className="text-sm text-blue-600 hover:text-blue-700">
              Sign out
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Cars</p>
                <p className="text-3xl font-bold text-gray-900">{cars.length}</p>
              </div>
              <div className="text-4xl text-blue-100">🏎️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Valuation</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${(totalValuation / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Mileage</p>
                <p className="text-3xl font-bold text-gray-900">{averageMileage.toLocaleString()}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Add Car Button */}
        <div className="mb-8">
          <Link
            href="/cars/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Add New Car
          </Link>
        </div>

        {/* Cars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 mb-4">No cars in your collection yet.</p>
              <Link
                href="/cars/new"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first car
              </Link>
            </div>
          ) : (
            cars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  No photo
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Mileage: {car.mileage.toLocaleString()}</p>
                    <p>Condition: {car.condition}</p>
                    <p className="font-semibold text-gray-900">
                      ${car.valuation.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
