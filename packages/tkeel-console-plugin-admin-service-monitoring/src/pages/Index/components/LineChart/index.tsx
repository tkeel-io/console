import { Box, Text } from '@chakra-ui/react';
import { LineSvgProps, PointTooltipProps, ResponsiveLine } from '@nivo/line';

function Tooltip({ point }: PointTooltipProps) {
  const { xFormatted, yFormatted } = point.data;
  return (
    <Box
      padding="4px 12px"
      borderRadius="4px"
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
      backgroundColor="gray.700"
      opacity="0.9"
      color="white"
    >
      <Text fontSize="12px" lineHeight="20px">
        {xFormatted}
      </Text>
      <Text fontSize="12px" lineHeight="20px">
        {yFormatted}
      </Text>
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
