import { NextResponse } from "next/server";
import { fetchExchangeRates } from '@/utils/api';


export async function GET(request: Request) {
    const exchangeRates = await fetchExchangeRates();
    
    return NextResponse.json( exchangeRates, { status: 200 });
}
