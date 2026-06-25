import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const car = await db.getCarById(params.id, session.user.id);

  if (!car) {
    redirect('/dashboard');
  }

  const photos = await db.getCarPhotos(car.id);
  const maintenance = await db.getMaintenanceRecords(car.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {car.year} {car.make} {car.model}
            </h1>
            <p className="text-gray-600">{car.condition}</p>
          </div>
          <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Collection
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Mileage</p>
                  <p className="text-lg font-semibold">{car.mileage.toLocaleString()} miles</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Year</p>
                  <p className="text-lg font-semibold">{car.year}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Purchase Price</p>
                  <p className="text-lg font-semibold">${car.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Current Valuation</p>
                  <p className="text-lg font-semibold">${car.valuation.toLocaleString()}</p>
                </div>
              </div>
              {car.notes && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-gray-600 text-sm mb-2">Notes</p>
                  <p className="text-gray-900">{car.notes}</p>
                </div>
              )}
            </div>

            {/* Maintenance Records */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Maintenance History</h2>
                <a href={`/cars/${car.id}/maintenance/new`} className="text-blue-600 hover:text-blue-700 text-sm">
                  Add Record
                </a>
              </div>

              {maintenance.length === 0 ? (
                <p className="text-gray-500">No maintenance records yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Service</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Mileage</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {maintenance.map((record) => (
                        <tr key={record.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {new Date(record.service_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">{record.description}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{record.mileage_at_service.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm font-semibold text-gray-900">${record.cost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Photos */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Photos</h2>
                <a href={`/cars/${car.id}/photos/upload`} className="text-blue-600 hover:text-blue-700 text-sm">
                  Add Photo
                </a>
              </div>

              {photos.length === 0 ? (
                <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  No photos
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="aspect-square bg-gray-200 rounded overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Photo
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-3">
                <a
                  href={`/cars/${car.id}/edit`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Edit Car
                </a>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure?')) {
                      await fetch(`/api/cars/${car.id}`, { method: 'DELETE' });
                      window.location.href = '/dashboard';
                    }
                  }}
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                  Delete Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
