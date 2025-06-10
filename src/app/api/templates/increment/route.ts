import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  const { templateId, walletAddress } = await request.json();

  try {    
    const { data, error } = await supabase.rpc('increment_template_usage', {
      template_id: templateId,
      wallet_address: walletAddress
    });

    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to increment template counter' },
      { status: 500 }
    );
  }
}