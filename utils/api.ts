import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export interface ExchangeRate {
  currency: string;
  cashBuying: string;
  cashSelling: string;
  transactionalBuying: string;
  transactionalSelling: string;
}
const url = 'https://www.combanketh.et/en/exchange-rate/';


export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    const exchangeRates: ExchangeRate[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('tbody tr');

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);


    $('tbody tr').each((index, element) => {
      const currency = $(element).find('td:nth-child(1) .text-gray-900').text().trim();
      const cashBuying = $(element).find('td:nth-child(2) .text-gray-900').text().trim();
      const cashSelling = $(element).find('td:nth-child(3) .text-gray-900').text().trim();
      const transactionalBuying = $(element).find('td:nth-child(4) .text-gray-900').text().trim();
      const transactionalSelling = $(element).find('td:nth-child(5) .text-gray-900').text().trim();

      const exchangeRate: ExchangeRate = {
        currency,
        cashBuying,
        cashSelling,
        transactionalBuying,
        transactionalSelling,
      };

      exchangeRates.push(exchangeRate);
    });

    await browser.close();
    
    return exchangeRates;
};
