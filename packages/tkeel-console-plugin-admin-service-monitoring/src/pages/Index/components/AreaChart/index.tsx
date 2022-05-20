import {
  Area,
  AreaChart as ReAreaChart,
  ResponsiveContainer,
  Tooltip,
  // XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: { x: number; y: string }[];
}

export default function AreaChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReAreaChart data={data}>
        <Area dataKey="y" />
        {/* <XAxis dataKey="x" /> */}
        <YAxis hide />
        <Tooltip />
      </ReAreaChart>
    </ResponsiveContainer>
  );
}
