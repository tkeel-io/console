import ChartContainer from './ChartContainer';

export default function TimeChart() {
  return (
    <ChartContainer
      summary={{
        name: '24 小时内 API 调用最大耗时：',
        value: 29,
        unit: '/ms',
      }}
    >
      TimeChart
    </ChartContainer>
  );
}
