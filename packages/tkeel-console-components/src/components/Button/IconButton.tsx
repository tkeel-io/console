import { Button as ChakraButton, ButtonProps, Circle } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';

interface Props extends ButtonProps {
  isShowCircle?: boolean;
  icon: ReactElement;
}

const Button = styled(ChakraButton)`
  .chakra-button__icon {
    margin-right: 4px;
  }
`;

function IconButton({ isShowCircle = false, icon, children, ...rest }: Props) {
  return (
    <Button
      leftIcon={
        isShowCircle ? (
          <Circle marginRight="4px" size="20px" backgroundColor="primarySub3">
            {icon}
          </Circle>
        ) : (
          icon
        )
      }
      colorScheme="primary"
      fontWeight={600}
      fontSize="12px"
      lineHeight="24px"
      {...rest}
    >
      {children}
    </Button>
  );
}

export default IconButton;
