import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = TooltipProps & {
  label: ReactNode;
  children: ReactNode;
};

export default function Tooltip({ label, children, ...rest }: Props) {
  return (
    <ChakraTooltip
      label={label}
      hasArrow
      placement="top"
      bgColor="white"
      color="gray.700"
      lineHeight="24px"
      fontSize="12px"
      p="8px"
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
}
