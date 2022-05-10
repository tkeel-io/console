import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';

interface Props extends ButtonProps {
  children: ReactNode;
  canHover?: boolean;
}

function RectangleButton({
  children,
  leftIcon,
  canHover = false,
  ...rest
}: Props) {
  const whiteColor = useColor('white');
  return (
    <Button
      padding="0 12px 0 8px"
      height="28px"
      boxShadow="none"
      backgroundColor={canHover ? 'brand.50' : 'primary'}
      borderRadius="4px"
      colorScheme="brand"
      color={canHover ? 'primary' : 'white'}
      fontSize="12px"
      _hover={
        canHover
          ? {
              color: 'white',
              backgroundColor: 'primary',
              svg: {
                fill: `${whiteColor} !important`,
              },
            }
          : {}
      }
      iconSpacing="4px"
      leftIcon={leftIcon}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default RectangleButton;
