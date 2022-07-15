import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  color?: string;
  count?: number;
  dot?: boolean;
  showZero?: boolean;
  overflowCount?: number;
  size?: number;
  offset?: [number, number];
  children?: ReactNode;
}

const defaultRightOffset = -8;
export default function Badge({
  color = 'red.300',
  count = 0,
  dot = false,
  showZero = false,
  overflowCount = 99,
  size = 8,
  offset = [defaultRightOffset, -1],
  children,
}: Props) {
  const [right, top] = offset;
  let rightOffset = '-14px';
  if (dot || (!dot && right !== defaultRightOffset)) {
    rightOffset = `${right}px`;
  }
  const width = dot ? `${size}px` : 'auto';
  const height = dot ? `${size}px` : '14px';
  const newCount = count > overflowCount ? `${overflowCount}+` : count;

  return (
    <Flex position="relative">
      {children}
      {!(count === 0 && !showZero) && (
        <Box
          position={children ? 'absolute' : 'static'}
          minWidth={dot ? 'unset' : '14px'}
          width={width}
          height={height}
          right={rightOffset}
          top={`${top}px`}
          paddingX={dot ? '0' : '4px'}
          color="white"
          fontSize="12px"
          lineHeight="14px"
          textAlign="center"
          borderRadius={dot ? '50%' : '7px'}
          backgroundColor={color}
        >
          {!dot && newCount}
        </Box>
      )}
    </Flex>
  );
}
