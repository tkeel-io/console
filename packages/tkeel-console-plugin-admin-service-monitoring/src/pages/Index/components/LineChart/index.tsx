import { LineProps, ResponsiveLine } from '@nivo/line';

export default function LineChart(props: LineProps) {
  return (
    <ResponsiveLine
      colors={{ datum: 'color' }}
      enableArea
      enablePoints={false}
      enableGridX={false}
      // enableGridY={false}
      useMesh
      {...props}
    />
  );
}
