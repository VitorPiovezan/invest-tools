import { useScoreGainWorld } from '../hooks/useScoreGainWorld';
import {
  ASSET_DISPLAY,
  GROUPS,
  MACRO_DISPLAY,
  MAXB1,
  MAXB2,
  MAXTOTAL,
  assetCardStyle,
  b1Total,
  b2GatilhoTotal,
  col,
  fc,
  ptsM,
  scoreSubtitle,
  thermoPercent,
  totalScore,
  type TriggerKey,
  type TriggerState,
} from '../utils/scoreGainWorld';

function TriggerRow({
  label,
  sub,
  state,
  favLabel,
  desLabel,
  points,
  pointColors,
  onChange,
}: {
  label: string;
  sub: string;
  state: TriggerState;
  favLabel: string;
  desLabel: string;
  points: number;
  pointColors: { bg: string; tx: string };
  onChange: (v: TriggerState) => void;
}) {
  const btnBase =
    'px-2 sm:px-2.5 h-7 sm:h-8 rounded-md border text-[10px] sm:text-xs font-medium cursor-pointer transition-colors';

  return (
    <div className="flex items-center gap-2 sm:gap-3 py-2.5 sm:py-3 border-b border-border/60 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm text-text-secondary leading-tight">{label}</p>
        <span className="text-[10px] sm:text-xs text-text-muted">{sub}</span>
      </div>
      <div className="flex gap-1 shrink-0">
        <button
          type="button"
          className={`${btnBase} ${state === 'n' ? 'bg-surface-light border-border text-text-muted' : 'border-border/60 bg-transparent text-text-muted'}`}
          onClick={() => onChange('n')}
        >
          —
        </button>
        <button
          type="button"
          className={`${btnBase} ${state === 'fav' ? 'bg-green-950 border-green-800 text-green-400' : 'border-border/60 bg-transparent text-text-muted'}`}
          onClick={() => onChange('fav')}
        >
          {favLabel}
        </button>
        <button
          type="button"
          className={`${btnBase} ${state === 'des' ? 'bg-red-950 border-red-800 text-red-400' : 'border-border/60 bg-transparent text-text-muted'}`}
          onClick={() => onChange('des')}
        >
          {desLabel}
        </button>
      </div>
      <div
        className="w-8 sm:w-9 h-7 sm:h-8 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-medium shrink-0"
        style={{ background: pointColors.bg, color: pointColors.tx }}
      >
        {points === 0 ? '·' : `${points > 0 ? '+' : ''}${points}`}
      </div>
    </div>
  );
}

export default function ScoreGainWorldPage() {
  const {
    pcts,
    triggers,
    setTrigger,
    loading,
    lastUpdate,
    logs,
    fetchAll,
  } = useScoreGainWorld();

  const score = totalScore(pcts, triggers);
  const colors = col(score, MAXTOTAL);
  const thermoPct = thermoPercent(score);
  const b1 = b1Total(pcts);
  const b2 = b2GatilhoTotal(triggers);

  const blocks = [
    { l: 'B1 ações', v: b1, m: MAXB1 },
    { l: 'B2 gatilho', v: b2, m: MAXB2 },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-2">
          Score Gain <span className="text-brand">World</span>
        </h1>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs sm:text-sm text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span>4 blocos · pesos reais do IBOV nas ações</span>
          <span className="text-[11px] text-text-muted bg-surface-light px-2.5 py-0.5 rounded-full">
            {lastUpdate ?? '—'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 mb-6">
        <div
          className="flex gap-4 sm:gap-6 items-center rounded-2xl p-5 sm:p-6 lg:p-8 border transition-all duration-400"
          style={{ background: colors.bg, borderColor: colors.bd }}
        >
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs text-text-muted [writing-mode:vertical-rl] rotate-180">
              compra
            </span>
            <div className="w-6 sm:w-7 flex-1 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] rounded-full bg-surface-light border border-border relative overflow-hidden">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
              <div
                className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500"
                style={{ height: `${thermoPct}%`, background: colors.fill }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-text-muted [writing-mode:vertical-rl] rotate-180">
              venda
            </span>
          </div>

          <div
            className="w-2.5 sm:w-3 rounded min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] shrink-0 opacity-40"
            style={{
              background:
                'linear-gradient(to bottom, #4ade80, #86efac, #1e1e1e, #fca5a5, #f87171)',
            }}
          />

          <div className="flex-1 min-w-0">
            <div
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none transition-colors duration-400"
              style={{ color: colors.tx }}
            >
              {loading && score === 0 && Object.keys(pcts).length === 0
                ? '—'
                : `${score >= 0 ? '+' : ''}${score}`}
            </div>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              score total · 4 blocos
            </p>
            <p
              className="text-base sm:text-lg font-medium mt-2 transition-colors duration-400"
              style={{ color: colors.tx }}
            >
              {colors.lbl}
            </p>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              {loading && Object.keys(pcts).length === 0
                ? 'buscando dados ao vivo'
                : scoreSubtitle(colors.dir)}
            </p>
            <span
              className="inline-block text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mt-3 border transition-all duration-300"
              style={{
                color: colors.tx,
                background: colors.badge,
                borderColor: colors.bd,
              }}
            >
              {colors.dir}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {blocks.map(b => {
            const bColors = fc(b.v, b.m * 0.3);
            return (
              <div
                key={b.l}
                className="rounded-xl p-4 sm:p-5 text-center border transition-all duration-300 flex flex-col justify-center"
                style={{
                  background: bColors.bg,
                  borderColor:
                    bColors.bg === '#1e1e1e' ? '#2a2a2a' : 'transparent',
                }}
              >
                <p className="text-[10px] sm:text-xs text-text-muted mb-1">{b.l}</p>
                <p
                  className="text-xl sm:text-2xl font-semibold"
                  style={{ color: bColors.tx }}
                >
                  {b.v >= 0 ? '+' : ''}
                  {b.v}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 mt-2 sm:mt-4">
        <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">
          bloco 1 · ações (peso real ibov)
        </span>
        <span className="text-[10px] sm:text-xs text-green-400 font-medium">
          36,6% cobertura
        </span>
      </div>
      <div className="h-px bg-border mb-3" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3">
        {ASSET_DISPLAY.map(({ key, label, weight }) => {
          const style = assetCardStyle(key, pcts[key] ?? null);
          const pct = pcts[key];
          return (
            <AssetCard
              key={key}
              label={label}
              weight={weight}
              pct={pct}
              style={style}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6">
        {MACRO_DISPLAY.map(({ key, label, weight }) => (
          <AssetCard
            key={key}
            label={label}
            weight={weight}
            pct={pcts[key]}
            style={assetCardStyle(key, pcts[key] ?? null)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">
          bloco 2 · gatilho (manual)
        </span>
      </div>
      <div className="h-px bg-border mb-3" />

      <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 mb-6">
        {GROUPS.b3.map(f => {
          const pv = ptsM(f, triggers[f.k]);
          const pColors = fc(pv, f.w);
          return (
            <TriggerRow
              key={f.k}
              label={f.l}
              sub={f.s}
              state={triggers[f.k]}
              favLabel={f.fl}
              desLabel={f.dl}
              points={pv}
              pointColors={pColors}
              onChange={v => setTrigger(f.k as TriggerKey, v)}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={fetchAll}
        className="w-full py-3 text-sm cursor-pointer rounded-xl bg-surface-light border border-border text-text-secondary hover:border-brand/30 hover:text-text-primary transition-all active:scale-[0.98]"
      >
        ↻ atualizar bloco 1 (ao vivo)
      </button>

      {logs.length > 0 && (
        <div className="mt-3 bg-surface-light border border-border rounded-xl p-2.5 text-[10px] text-text-muted font-mono max-h-[70px] overflow-y-auto">
          {logs.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-text-muted">
        Dados com atraso de até 15 minutos. Fonte: brapi.dev, AwesomeAPI
      </p>
    </main>
  );
}

function AssetCard({
  label,
  weight,
  pct,
  style,
  className = '',
}: {
  label: string;
  weight: string;
  pct: number | undefined;
  style: ReturnType<typeof assetCardStyle>;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl p-3 sm:p-4 border transition-all duration-300 ${className}`}
      style={{ background: style.bg, borderColor: style.bd }}
    >
      <div className="flex justify-between text-[10px] sm:text-xs text-text-muted mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-text-muted/70">{weight}</span>
      </div>
      <p className="text-lg sm:text-xl font-semibold" style={{ color: style.tx }}>
        {pct == null ? '—' : `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`}
      </p>
      <p className="text-[10px] sm:text-xs mt-1" style={{ color: style.tx }}>
        {style.label}
      </p>
      <div
        className="h-1 rounded mt-2 transition-all duration-500"
        style={{ width: `${style.barWidth}%`, background: style.bar }}
      />
    </div>
  );
}
