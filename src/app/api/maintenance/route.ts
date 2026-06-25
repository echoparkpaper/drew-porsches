import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { carId, serviceDate, description, cost, mileageAtService } = body;

    if (!carId || !serviceDate || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify car ownership
    const car = await db.getCarById(carId, session.user.id);
    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    const record = await db.addMaintenanceRecord(carId, {
      service_date: new Date(serviceDate),
      description,
      cost: parseFloat(cost) || 0,
      mileage_at_service: parseInt(mileageAtService) || 0,
    } as any);

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('POST /api/maintenance error:', error);
    return NextResponse.json(
      { error: 'Failed to create maintenance record' },
      { status: 500 }
    );
  }
}
