import { Box, Text } from '@chakra-ui/react';
import { LineSvgProps, PointTooltipProps, ResponsiveLine } from '@nivo/line';

function Tooltip({ point }: PointTooltipProps) {
  const { xFormatted, yFormatted } = point.data;
  return (
    <Box backgroundColor="gray.700" opacity="0.5" color="white">
      <Text>{xFormatted}</Text>
      <Text>{yFormatted}</Text>
    </Box>
  );
}

export default function LineChart(props: LineSvgProps) {
  return (
    <ResponsiveLine
      yScale={{
        type: 'linear',
        min: 0,
      }}
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
