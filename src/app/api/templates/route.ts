import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  const { name, message, image, wallet_address } = await request.json();
    
  try {
    const { data, error } = await supabase
      .from('templates')
      .insert([{ 
        name, 
        message, 
        image_url: image,
        wallet_address 
      }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error saving template:', error);
    return NextResponse.json(
      { error: 'Failed to save template' },
      { status: 500 }
    );
  }
}