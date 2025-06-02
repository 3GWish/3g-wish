import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  const { walletAddress } = await request.json();

  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('wallet_address', walletAddress);

    if (error) throw error;    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user templates' },
      { status: 500 }
    );
  }
}

