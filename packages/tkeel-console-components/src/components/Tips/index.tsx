import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';
import { InformationFilledIcon } from '@tkeel/console-icons';

import Tooltip from '../Tooltip';

interface Props {
  tooltipLabel: ReactNode;
  iconColor?: string;
}

export default function Tips({ tooltipLabel, iconColor = 'gray.300' }: Props) {
  const primaryColor = useColor('primary');

  return (
    <Box
      _hover={{
        svg: {
          fill: `${primaryColor} !important`,
        },
      }}
    >
      <Tooltip
        label={tooltipLabel}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.100"
      >
        <InformationFilledIcon color={iconColor} />
      </Tooltip>
    </Box>
  );
}
