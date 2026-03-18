/**
 * @fileoverview Reusable chart primitives (SVG-only, zero external deps)
 *
 * Design Pattern: Strategy + Presentational Component
 *   Each chart accepts a data array and a colour — the rendering *strategy*
 *   is entirely encapsulated inside the component.  Callers only care about
 *   the interface (props), not the SVG maths inside.
 */

// ── BarChart ───────────────────────────────────────────────────────────────
/**
 * @param {{ data: Array<{label:string,value:number}>, color?: string }} props
 */
export function BarChart({ data, color = "#6366f1" }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-sm transition-all duration-700"
            style={{
              height: `${(d.value / max) * 80}px`,
              background: color,
              opacity: 0.7 + (i / data.length) * 0.3,
            }}
          />
          <span className="text-xs dark:text-gray-400 text-gray-500 font-mono">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── LineChart ──────────────────────────────────────────────────────────────
/**
 * @param {{ data: Array<{label:string,value:number}>, color?: string }} props
 */
export function LineChart({ data, color = "#10b981" }) {
  const W = 280, H = 80;
  const vals = data.map((d) => d.value);
  const max  = Math.max(...vals, 1);
  const min  = Math.min(...vals);
  const range = max - min || 1;

  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((d.value - min) / range) * (H - 8) - 4,
  }));

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${W},${H} L0,${H} Z`;
  const gradId = `lg-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
    </svg>
  );
}

// ── DonutChart ─────────────────────────────────────────────────────────────
/**
 * @param {{ segments: Array<{label:string,value:number,color:string}> }} props
 */
export function DonutChart({ segments }) {
  const total       = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R           = 40;
  const cx = 50, cy = 50;
  const circumference = 2 * Math.PI * R;
  let   offset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32" aria-hidden="true">
        {segments.map((seg) => {
          const dash = (seg.value / total) * circumference;
          const el = (
            <circle
              key={seg.label}
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
            />
          );
          offset += dash;
          return el;
        })}
        <circle cx={cx} cy={cy} r="28" fill="#0f172a" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          {total}
        </text>
      </svg>

      <div className="space-y-1.5 w-full">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="dark:text-gray-400 text-gray-500">{s.label}</span>
            </div>
            <span className="dark:text-white text-slate-900 font-semibold tabular-nums">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
