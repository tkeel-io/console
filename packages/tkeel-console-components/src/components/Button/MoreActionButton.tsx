import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';

type Props = {
  icon?: ReactNode;
  title: ReactNode;
  onClick: () => unknown;
};

export default function MoreActionButton({ icon, title, onClick }: Props) {
  const whiteColor = `${useColor('white')} !important`;
  const grayAlternativesColor = useColor('grayAlternatives.300');

  return (
    <Flex
      alignItems="center"
      paddingLeft="8px"
      paddingRight="4px"
      height="32px"
      cursor="pointer"
      color="gray.600"
      borderRadius="4px"
      css={`
        svg {
          width: 12px;
          height: 12px;
          fill: ${grayAlternativesColor};
        }
      `}
      _hover={{
        backgroundColor: 'primary',
        '& > svg': {
          fill: whiteColor,
        },
        '& > div': {
          color: whiteColor,
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Box marginLeft={icon ? '6px' : '0'} fontSize="12px">
        {title}
      </Box>
    </Flex>
  );
}
