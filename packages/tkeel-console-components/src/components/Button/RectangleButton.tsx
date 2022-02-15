import { ReactNode } from 'react';
import { Button, ButtonProps, Colors, useTheme } from '@chakra-ui/react';

interface Props extends ButtonProps {
  children: ReactNode;
}
interface CustomColor extends Colors {
  white: string;
}

function RectangleButton({ children, leftIcon, ...rest }: Props) {
  const { colors }: { colors: CustomColor } = useTheme();

  return (
    <Button
      padding="0 12px 0 8px"
      height="28px"
      boxShadow="none"
      backgroundColor="primarySub"
      borderRadius="4px"
      color="primary"
      _hover={{
        color: 'white',
        backgroundColor: 'primary',
        svg: {
          fill: `${colors.white} !important`,
        },
      }}
      iconSpacing="4px"
      leftIcon={leftIcon}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default RectangleButton;
