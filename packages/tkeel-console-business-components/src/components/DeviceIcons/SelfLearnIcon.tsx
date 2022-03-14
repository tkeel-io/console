import { Box, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { VpcTwoToneIcon } from '@tkeel/console-icons';

import IconTooltip from './IconTooltip';
import IconWrapper from './IconWrapper';

type Props = {
  isSelfLearn: boolean;
  showTooltip?: boolean;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function SelfLearnIcon({
  isSelfLearn,
  showTooltip = true,
  styles,
}: Props) {
  let label: ReactNode = '';
  if (showTooltip) {
    label = isSelfLearn ? '自学习' : '未开启自学习';
  }
  return (
    <Box {...styles?.wrapper}>
      <IconTooltip label={label}>
        <IconWrapper bg={isSelfLearn ? 'blue.50' : 'gray.100'}>
          <VpcTwoToneIcon
            size="20px"
            color={isSelfLearn ? 'green.300' : 'gray.500'}
            twoToneColor={isSelfLearn ? 'green.300' : 'gray.500'}
          />
        </IconWrapper>
      </IconTooltip>
    </Box>
  );
}
