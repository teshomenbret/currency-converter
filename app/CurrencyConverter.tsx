"use client"

import { ExchangeRate } from '@/utils/api';
import { useState, useEffect } from 'react';

interface CurrencyConverterProps {
  exchangeRates: ExchangeRate[];
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ exchangeRates }) => {
  const [amount, setAmount] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [convertedAmountTransaction, setConvertedAmountTransaction] = useState<number | null>(null);

  const convertCurrency = () => {
    if (isNaN(amount) || amount <= 0) {
      setConvertedAmount(null);
      return;
    }

    const selectedRate = exchangeRates.find((rate) => rate.currency === selectedCurrency);
    if (selectedRate) {
      const convertedCash = amount * parseFloat(selectedRate.cashBuying);
    const convertedTransaction = amount * parseFloat(selectedRate.transactionalBuying);
      setConvertedAmount(convertedCash);
      setConvertedAmountTransaction(convertedTransaction);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [selectedCurrency, amount, exchangeRates]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Amount:</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          type="number"
          value={isNaN(amount) ? '' : amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">From Currency:</label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {exchangeRates.map((rate) => (
            <option key={rate.currency} value={rate.currency}>
              {rate.currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm font-medium">
          {isNaN(amount) || amount <= 0
            ? 'Please enter a valid amount'
            : convertedAmount !== null
            ? `${amount} ${selectedCurrency} is equal to ${convertedAmount.toFixed(4)} ETB (Cash) and ${convertedAmountTransaction?.toFixed(4)} ETB (Transaction)`
            : ''}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;

