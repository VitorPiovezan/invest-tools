export type AssetKey =
  | 'vale'
  | 'itub'
  | 'petr4'
  | 'petr3'
  | 'axia'
  | 'bbdc'
  | 'dol'
  | 'emini';

export type TriggerKey = 'hora' | 'c2' | 'sr';
export type TriggerState = 'n' | 'fav' | 'des';

export interface AssetConfig {
  ticker: string | null;
  w: number;
  inv: boolean;
}

export interface TriggerConfig {
  k: TriggerKey;
  l: string;
  s: string;
  w: number;
  fl: string;
  dl: string;
}

export interface ScoreColors {
  bg: string;
  bd: string;
  tx: string;
  bar: string;
  fill: string;
  lbl: string;
  dir: string;
  badge: string;
}

export interface BlockColors {
  bg: string;
  tx: string;
}

export const ATIVOS_B1: Record<AssetKey, AssetConfig> = {
  vale: { ticker: 'VALE3', w: 124, inv: false },
  itub: { ticker: 'ITUB4', w: 83, inv: false },
  petr4: { ticker: 'PETR4', w: 76, inv: false },
  petr3: { ticker: 'PETR3', w: 43, inv: false },
  axia: { ticker: 'AXIA3', w: 40, inv: false },
  bbdc: { ticker: 'BBDC4', w: 37, inv: false },
  dol: { ticker: null, w: 60, inv: true },
  emini: { ticker: 'ES=F', w: 50, inv: false },
};

export const ATIVOS = ATIVOS_B1;

export const TICKER_TO_KEY: Record<string, AssetKey> = {
  VALE3: 'vale',
  ITUB4: 'itub',
  PETR4: 'petr4',
  PETR3: 'petr3',
  AXIA3: 'axia',
  BBDC4: 'bbdc',
  'ES=F': 'emini',
};

export const GROUPS = {
  b3: [
    {
      k: 'hora' as const,
      l: 'horário',
      s: '09h15–10h30 ou 14h–15h30',
      w: 30,
      fl: 'ok',
      dl: 'fora',
    },
    {
      k: 'c2' as const,
      l: 'candle 2min',
      s: 'corpo forte na direção',
      w: 30,
      fl: 'confirma',
      dl: 'indeciso',
    },
    {
      k: 'sr' as const,
      l: 'S/R nível',
      s: 'máx/mín de ontem',
      w: 25,
      fl: 'em nível',
      dl: 'sem nível',
    },
  ] satisfies TriggerConfig[],
};

export const MAXB1 = Object.values(ATIVOS_B1).reduce((a, v) => a + v.w, 0);
export const MAXB2 = GROUPS.b3.reduce((a, f) => a + f.w, 0);
export const MAXTOTAL = MAXB1 + MAXB2;

export const ASSET_DISPLAY: {
  key: Exclude<AssetKey, 'dol' | 'emini'>;
  label: string;
  weight: string;
}[] = [
  { key: 'vale', label: 'VALE3', weight: '12,4%' },
  { key: 'itub', label: 'ITUB4', weight: '8,3%' },
  { key: 'petr4', label: 'PETR4', weight: '7,6%' },
  { key: 'petr3', label: 'PETR3', weight: '4,3%' },
  { key: 'axia', label: 'AXIA3', weight: '4,0%' },
  { key: 'bbdc', label: 'BBDC4', weight: '3,7%' },
];

export const MACRO_DISPLAY: {
  key: 'dol' | 'emini';
  label: string;
  weight: string;
}[] = [
  { key: 'dol', label: 'USD/BRL', weight: 'inv.' },
  { key: 'emini', label: 'Futuros E-mini S&P500', weight: 'índice' },
];

function getAssetConfig(key: AssetKey): AssetConfig {
  return ATIVOS_B1[key];
}

export function favA(
  key: AssetKey,
  pct: number | null,
): boolean | null {
  if (pct === null) return null;
  const a = getAssetConfig(key);
  return Math.abs(pct) < 0.05 ? null : a.inv ? pct < 0 : pct > 0;
}

export function ptsA(key: AssetKey, pct: number | null): number {
  const f = favA(key, pct);
  if (f === null) return 0;
  return f ? getAssetConfig(key).w : -getAssetConfig(key).w;
}

export function ptsM(
  trigger: TriggerConfig,
  state: TriggerState,
): number {
  if (state === 'n') return 0;
  return (state === 'fav' ? 1 : -1) * trigger.w;
}

export function b1Total(pcts: Partial<Record<AssetKey, number>>): number {
  return (Object.keys(ATIVOS_B1) as AssetKey[]).reduce(
    (s, k) => s + ptsA(k, pcts[k] ?? null),
    0,
  );
}

export function b2GatilhoTotal(states: Record<TriggerKey, TriggerState>): number {
  return GROUPS.b3.reduce((s, f) => s + ptsM(f, states[f.k]), 0);
}

export function totalScore(
  pcts: Partial<Record<AssetKey, number>>,
  states: Record<TriggerKey, TriggerState>,
): number {
  return b1Total(pcts) + b2GatilhoTotal(states);
}

export function col(sc: number, max: number): ScoreColors {
  const p = sc / max;
  if (p > 0.5)
    return {
      bg: '#0f1a0a',
      bd: '#1a4a1a',
      tx: '#4ade80',
      bar: '#16a34a',
      fill: '#4ade80',
      lbl: 'compra forte',
      dir: 'COMPRA',
      badge: '#0d2a0d',
    };
  if (p > 0.25)
    return {
      bg: '#0f180a',
      bd: '#1a3a1a',
      tx: '#3dcc6e',
      bar: '#15803d',
      fill: '#3dcc6e',
      lbl: 'compra',
      dir: 'COMPRA',
      badge: '#0a1e0a',
    };
  if (p > 0.06)
    return {
      bg: '#111411',
      bd: '#252a25',
      tx: '#86e88e',
      bar: '#2d6e35',
      fill: '#86e88e',
      lbl: 'leve compra',
      dir: 'leve compra',
      badge: '#151a15',
    };
  if (p > -0.06)
    return {
      bg: '#141414',
      bd: '#2a2a2a',
      tx: '#e0a800',
      bar: '#c49200',
      fill: '#e0a800',
      lbl: 'neutro',
      dir: 'NEUTRO',
      badge: '#1a1608',
    };
  if (p > -0.25)
    return {
      bg: '#1a1500',
      bd: '#3a2a00',
      tx: '#f5c518',
      bar: '#b45309',
      fill: '#f5c518',
      lbl: 'leve venda',
      dir: 'leve venda',
      badge: '#241800',
    };
  if (p > -0.5)
    return {
      bg: '#1a0a0a',
      bd: '#4a1a1a',
      tx: '#f87171',
      bar: '#dc2626',
      fill: '#f87171',
      lbl: 'venda',
      dir: 'VENDA',
      badge: '#2a0a0a',
    };
  return {
    bg: '#160808',
    bd: '#5a1a1a',
    tx: '#fca5a5',
    bar: '#991b1b',
    fill: '#fca5a5',
    lbl: 'venda forte',
    dir: 'VENDA',
    badge: '#220808',
  };
}

export function fc(sc: number, w: number): BlockColors {
  if (!sc) return { bg: '#1e1e1e', tx: '#737373' };
  if (sc >= w) return { bg: '#0d1f0d', tx: '#4ade80' };
  if (sc > 0) return { bg: '#0a180a', tx: '#3dcc6e' };
  if (sc <= -w) return { bg: '#1f0d0d', tx: '#f87171' };
  return { bg: '#1a0d0d', tx: '#fca5a5' };
}

function assetStatusLabel(key: AssetKey, fv: boolean): string {
  if (key === 'dol') return fv ? 'dólar caindo ✓' : 'dólar subindo ✗';
  if (key === 'emini') return fv ? 'apoio ao índice ✓' : 'pressão no índice ✗';
  return fv ? 'favorável ✓' : 'pressão ✗';
}

export function assetCardStyle(
  key: AssetKey,
  pct: number | null,
): {
  bg: string;
  bd: string;
  tx: string;
  bar: string;
  label: string;
  barWidth: number;
} {
  const fv = favA(key, pct);
  const neu = fv === null || pct === null;
  const [bg, bd, tx, bar] = neu
    ? ['#141414', '#2a2a2a', '#737373', '#333']
    : fv
      ? ['#0d1f0d', '#1a4a1a', '#4ade80', '#16a34a']
      : ['#1f0d0d', '#4a1a1a', '#f87171', '#dc2626'];

  const label = neu
    ? pct === null
      ? 'aguardando'
      : 'neutro'
    : assetStatusLabel(key, fv);

  const barWidth = pct === null ? 0 : Math.min(96, Math.max(4, 50 + Math.abs(pct) * 10));

  return { bg, bd, tx, bar, label, barWidth };
}

export function thermoPercent(sc: number): number {
  return Math.round(((sc + MAXTOTAL) / (2 * MAXTOTAL)) * 100);
}

export function scoreSubtitle(dir: string): string {
  if (dir === 'NEUTRO') return 'aguardar — sem confluência';
  if (dir.includes('COMPRA') || dir.includes('compra'))
    return 'blocos alinhados para cima';
  return 'blocos alinhados para baixo';
}
