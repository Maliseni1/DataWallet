import { NextResponse } from 'next/server';
// FIX: Using a direct relative path because the '@/' alias fails in API routes.
import { db, UserAccounts } from '../../../lib/data';

export async function GET(
  request: Request,
  // 1. The 'params' object is now a Promise
  { params }: { params: Promise<{ operatorId: string }> }
) {
  // 2. We 'await' the promise to get the values
  const { operatorId } = await params;
  const operatorKey = operatorId as keyof UserAccounts;

  if (operatorKey === 'zedmobile' || operatorKey === 'mtn' || operatorKey === 'airtel') {
    // In a real app, you'd fetch this from a database
    const accountData = db.accounts[operatorKey];
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 300)); 
    
    return NextResponse.json(accountData);
  } else {
    return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
  }
}