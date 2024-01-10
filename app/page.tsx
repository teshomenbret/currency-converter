import { ExchangeRate } from '@/utils/api';
import CurrencyConverter from './CurrencyConverter';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Currency Converter App',
  description: 'Currency Converter App',
}

const NEXT_URL = process.env.NEXT_URL || "http://localhost:3000";

async function fetchData(): Promise<ExchangeRate[]> {
  const res = await fetch('NEXT_URL/api/rates', { next: { revalidate: 3600 } });
  const data = await res.json();
  return data.exchangeRates;
}



export default async function Home() {
  const exchangeRates = await fetchData();

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Currency Converter App</h1>
        <p className="text-sm text-gray-600 mb-4">
          This app fetches real-time exchange rates from{' '}
          <a
            href="https://www.combanketh.et/en/exchange-rate/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Commercial Bank of Ethiopia
          </a>{' '}
          and allows you to convert amounts to Ethiopian Birr (ETB).
        </p>
        <CurrencyConverter exchangeRates={exchangeRates} />
        <p className="mt-4 text-xs text-gray-500">
          * Exchange rates are subject to change based on market conditions.
        </p>
      </div>
    </main>
  );
}
