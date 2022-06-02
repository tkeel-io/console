import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';
import { InformationFilledIcon } from '@tkeel/console-icons';

import Tooltip from '../Tooltip';

interface Props {
  label: ReactNode;
  iconSize?: string | number;
  iconColor?: string;
}

export default function Tips({
  label,
  iconSize = 16,
  iconColor = 'grayAlternatives.300',
}: Props) {
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
        label={label}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.100"
      >
        <InformationFilledIcon size={iconSize} color={iconColor} />
      </Tooltip>
    </Box>
  );
}
