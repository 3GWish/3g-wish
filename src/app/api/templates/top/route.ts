import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('id, name, image_url, wallet_address, usage_count')
      .order('usage_count', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch top templates' },
      { status: 500 }
    );
  }
}