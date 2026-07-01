import { useState, useEffect, useCallback } from 'react';
import {
  type AssetKey,
  type TriggerKey,
  type TriggerState,
  TICKER_TO_KEY,
} from '../utils/scoreGainWorld';

const BRAPI_TOKEN = 'oMumddUJbRZtLqtE5ziNkf';

const STOCK_TICKERS = ['VALE3', 'ITUB4', 'PETR4', 'PETR3', 'AXIA3', 'BBDC4', 'ES=F'];

const DEFAULT_TRIGGERS: Record<TriggerKey, TriggerState> = {
  hora: 'n',
  c2: 'n',
  sr: 'n',
};

async function fetchBrapiQuote(ticker: string): Promise<number> {
  const res = await fetch(
    `https://brapi.dev/api/quote/${encodeURIComponent(ticker)}?token=${BRAPI_TOKEN}`,
    { signal: AbortSignal.timeout(8000) },
  );
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.message ?? `status ${res.status}`);
  }
  const pct = data.results?.[0]?.regularMarketChangePercent;
  if (pct == null) throw new Error('sem variação');
  return pct;
}

async function fetchTickers(
  tickers: string[],
  onTicker: (key: AssetKey, pct: number) => void,
  onLog: (msg: string) => void,
): Promise<void> {
  for (const ticker of tickers) {
    const key = TICKER_TO_KEY[ticker];
    if (!key) continue;
    try {
      onLog(`buscando ${ticker}`);
      const pct = await fetchBrapiQuote(ticker);
      onTicker(key, pct);
      onLog(`${ticker} ok`);
    } catch (e) {
      onLog(
        `${ticker} erro: ${e instanceof Error ? e.message : 'falha'}`,
      );
    }
    await new Promise(r => setTimeout(r, 150));
  }
}

async function fetchDolarPct(): Promise<number> {
  const res = await fetch(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  );
  const data = await res.json();
  const pct = parseFloat(data.USDBRL.pctChange);
  if (isNaN(pct)) throw new Error('Dólar indisponível');
  return pct;
}

export function useScoreGainWorld() {
  const [pcts, setPcts] = useState<Partial<Record<AssetKey, number>>>({});
  const [triggers, setTriggers] =
    useState<Record<TriggerKey, TriggerState>>(DEFAULT_TRIGGERS);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const log = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [`${time} ${msg}`, ...prev].slice(0, 8));
  }, []);

  const fetchAll = useCallback(async () => {
    setLastUpdate('atualizando...');

    await fetchTickers(
      STOCK_TICKERS,
      (key, pct) => setPcts(prev => ({ ...prev, [key]: pct })),
      log,
    );

    try {
      const dolPct = await fetchDolarPct();
      setPcts(prev => ({ ...prev, dol: dolPct }));
      log('dólar ok');
    } catch (e) {
      log(`dólar erro: ${e instanceof Error ? e.message : 'falha'}`);
    }

    const now = new Date();
    setLastUpdate(
      `${now.getHours().toString().padStart(2, '0')}h${now.getMinutes().toString().padStart(2, '0')}m${now.getSeconds().toString().padStart(2, '0')}s`,
    );
    setLoading(false);
  }, [log]);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 30_000);
    return () => clearInterval(id);
  }, [fetchAll]);

  const setTrigger = (key: TriggerKey, value: TriggerState) => {
    setTriggers(prev => ({ ...prev, [key]: value }));
  };

  return {
    pcts,
    triggers,
    setTrigger,
    loading,
    lastUpdate,
    logs,
    fetchAll,
  };
}
