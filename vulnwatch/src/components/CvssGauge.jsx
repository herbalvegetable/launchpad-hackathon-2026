import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

function colorForScore(score) {
  if (score >= 9) return 'var(--critical)';
  if (score >= 7) return 'var(--high)';
  if (score >= 4) return 'var(--medium)';
  if (score > 0) return 'var(--low)';
  return 'var(--none-sev)';
}

export default function CvssGauge({ label, score = 0 }) {
  const color = colorForScore(score);
  const data = [{ name: label, value: score, fill: color }];

  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={140}
        height={140}
        cx={70}
        cy={70}
        innerRadius={48}
        outerRadius={64}
        barSize={12}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 10]} angleAxisId={0} tick={false} />
        <RadialBar background={{ fill: 'var(--border-soft)' }} dataKey="value" cornerRadius={6} />
        <text
          x={70}
          y={65}
          textAnchor="middle"
          className="font-mono"
          style={{ fill: color, fontSize: 26, fontWeight: 600 }}
        >
          {score.toFixed(1)}
        </text>
        <text
          x={70}
          y={84}
          textAnchor="middle"
          style={{ fill: 'var(--text-faint)', fontSize: 11 }}
        >
          / 10
        </text>
      </RadialBarChart>
      <span className="text-xs text-[var(--text-muted)] font-mono -mt-2">{label}</span>
    </div>
  );
}
