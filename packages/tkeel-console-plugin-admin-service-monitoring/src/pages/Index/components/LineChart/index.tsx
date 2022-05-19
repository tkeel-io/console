import { Box, Text } from '@chakra-ui/react';
import { LineProps, PointTooltipProps, ResponsiveLine } from '@nivo/line';

function Tooltip({ point }: PointTooltipProps) {
  const { xFormatted, yFormatted } = point.data;
  return (
    <Box>
      <Text>{xFormatted}</Text>
      <Text>{yFormatted}</Text>
    </Box>
  );
}

export default function LineChart(props: LineProps) {
  return (
    <ResponsiveLine
      curve="natural"
      lineWidth={1}
      colors={{ datum: 'color' }}
      enableArea
      enablePoints={false}
      enableGridX={false}
      enableGridY={false}
      useMesh
      enableCrosshair={false}
      tooltip={Tooltip}
      {...props}
    />
  );
}
