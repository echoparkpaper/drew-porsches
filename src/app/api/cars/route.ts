import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cars = await db.getCars(session.user.id);
    return NextResponse.json(cars);
  } catch (error) {
    console.error('GET /api/cars error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { make, model, year, price, mileage, condition, notes, valuation } = body;

    if (!make || !model) {
      return NextResponse.json(
        { error: 'Make and model are required' },
        { status: 400 }
      );
    }

    const car = await db.createCar(session.user.id, {
      make,
      model,
      year: parseInt(year) || new Date().getFullYear(),
      price: parseFloat(price) || 0,
      mileage: parseInt(mileage) || 0,
      condition: condition || 'good',
      notes: notes || '',
      valuation: parseFloat(valuation) || 0,
    } as any);

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('POST /api/cars error:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}
