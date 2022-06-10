import ChartContainer from './ChartContainer';

export default function FrequencyChart() {
  return (
    <ChartContainer
      summary={{
        name: '24 小时内 API 调用总次数：',
        value: 24,
        unit: '次',
      }}
    >
      FrequencyChart
    </ChartContainer>
  );
}
