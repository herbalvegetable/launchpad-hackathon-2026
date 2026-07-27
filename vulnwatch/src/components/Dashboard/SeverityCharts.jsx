import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { SEVERITY_STYLES } from '../SeverityBadge';
import { STATUS_STYLES } from '../RemediationBadge';

const tooltipStyle = {
  background: 'var(--bg-panel-raised)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--text-primary)',
  fontSize: 12,
};

export function SeverityBarChart({ cves }) {
  const counts = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NONE'].map((sev) => ({
    severity: sev,
    count: cves.filter((c) => c.severity === sev).length,
    fill: SEVERITY_STYLES[sev].color,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={counts} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" vertical={false} />
        <XAxis dataKey="severity" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--bg-panel)' }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CvesPerDayChart({ dailyCounts }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={dailyCounts} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          axisLine={{ stroke: 'var(--border)' }}
          tickLine={false}
          interval={4}
        />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RemediationPieChart({ statusCounts }) {
  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: STATUS_STYLES[status]?.label || status,
    value: count,
    fill: STATUS_STYLES[status]?.color || '#8b96ac',
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
