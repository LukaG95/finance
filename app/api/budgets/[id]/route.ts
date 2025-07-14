import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = client.db();
    const budgetId = params.id;

    if (!ObjectId.isValid(budgetId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await db.collection('budgets').deleteOne({ _id: new ObjectId(budgetId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Budget Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const db = client.db();
    const budgetId = context.params.id;

    if (!ObjectId.isValid(budgetId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { category, theme, amount } = body;

    if (!category || !theme || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const result = await db.collection('budgets').updateOne(
      { _id: new ObjectId(budgetId) },
      { $set: { category, theme, amount } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update Budget Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
