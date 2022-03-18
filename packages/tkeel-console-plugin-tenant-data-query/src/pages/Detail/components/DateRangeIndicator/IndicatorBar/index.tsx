import { Box, StyleProps } from '@chakra-ui/react';

import Indicator from '../Indicator';

type Props = {
  styles?: {
    wrapper?: StyleProps;
    indicatorBar?: StyleProps;
  };
};

export default function IndicatorBar({ styles }: Props) {
  return (
    <Box
      className="indicatorBar"
      position="absolute"
      left="0"
      zIndex="1"
      bottom="4px"
      width="20%"
      height="35px"
      backgroundColor="primarySub"
      {...styles?.wrapper}
    >
      <Indicator left="0" />
      <Box
        position="absolute"
        left="0"
        bottom="0"
        width="100%"
        height="4px"
        backgroundColor="primary"
        {...styles?.indicatorBar}
      />
      <Indicator right="0" />
    </Box>
  );
}
