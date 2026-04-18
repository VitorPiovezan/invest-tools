import { useState, useEffect } from 'react';

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  loading: boolean;
  error: boolean;
  source: string;
}

const BRAPI_TOKEN = import.meta.env.VITE_BRAPI_TOKEN || '';

async function fetchDolar(): Promise<Partial<MarketIndex>> {
  const res = await fetch(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  );
  const data = await res.json();
  const usd = data.USDBRL;
  const pct = parseFloat(usd.pctChange);
  return {
    value: `R$ ${parseFloat(usd.bid).toFixed(2)}`,
    change: `${pct >= 0 ? '+' : ''}${usd.varBid}`,
    changePercent: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
    isPositive: pct >= 0,
    source: 'AwesomeAPI',
  };
}

async function fetchSelic(): Promise<Partial<MarketIndex>> {
  const res = await fetch(
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json',
  );
  const data = await res.json();
  const valor = parseFloat(data[0].valor);
  return {
    value: `${valor.toFixed(2)}% a.a.`,
    change: '',
    changePercent: '',
    isPositive: true,
    source: 'Banco Central',
  };
}

async function fetchCDI(): Promise<Partial<MarketIndex>> {
  const res = await fetch(
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json',
  );
  const data = await res.json();
  const valor = parseFloat(data[0].valor);
  return {
    value: `${valor.toFixed(2)}% a.a.`,
    change: '',
    changePercent: '',
    isPositive: true,
    source: 'Banco Central',
  };
}

async function fetchBrapiQuote(ticker: string): Promise<Partial<MarketIndex>> {
  if (!BRAPI_TOKEN) throw new Error('Token nao configurado');
  const res = await fetch(
    `https://brapi.dev/api/quote/${ticker}?token=${BRAPI_TOKEN}`,
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  const result = data.results[0];
  const pct = result.regularMarketChangePercent ?? 0;
  return {
    value: result.regularMarketPrice?.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    }),
    change: `${pct >= 0 ? '+' : ''}${result.regularMarketChange?.toFixed(2)}`,
    changePercent: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
    isPositive: pct >= 0,
    source: 'brapi.dev',
  };
}

const INDICES_CONFIG = [
  {
    name: 'Ibovespa',
    ticker: '^BVSP',
    fetcher: () => fetchBrapiQuote('^BVSP'),
  },
  { name: 'IFIX', ticker: 'IFIX', fetcher: () => fetchBrapiQuote('IFIX') },
  { name: 'S&P 500', ticker: '^GSPC', fetcher: () => fetchBrapiQuote('^GSPC') },
  { name: 'Dolar (USD/BRL)', ticker: 'USD', fetcher: fetchDolar },
  { name: 'SELIC', ticker: 'SELIC', fetcher: fetchSelic },
  { name: 'CDI', ticker: 'CDI', fetcher: fetchCDI },
];

export function useMarketData() {
  const [indices, setIndices] = useState<MarketIndex[]>(
    INDICES_CONFIG.map(cfg => ({
      name: cfg.name,
      value: '-',
      change: '',
      changePercent: '',
      isPositive: true,
      loading: true,
      error: false,
      source: '',
    })),
  );

  useEffect(() => {
    INDICES_CONFIG.forEach((cfg, i) => {
      cfg
        .fetcher()
        .then(data => {
          setIndices(prev => {
            const next = [...prev];
            next[i] = { ...next[i], ...data, loading: false, error: false };
            return next;
          });
        })
        .catch(() => {
          setIndices(prev => {
            const next = [...prev];
            next[i] = { ...next[i], loading: false, error: true };
            return next;
          });
        });
    });
  }, []);

  const hasToken = !!BRAPI_TOKEN;

  return { indices, hasToken };
}
