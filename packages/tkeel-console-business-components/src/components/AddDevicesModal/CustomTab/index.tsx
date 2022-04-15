import { BoxProps, Tab, TabProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';

type Props = BoxProps &
  TabProps & {
    children: ReactNode;
  };

function CustomTab({ children, ...rest }: Props) {
  const primaryColor = useColor('primary');
  return (
    <Tab
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="max-content"
      height="26px"
      padding="0"
      fontSize="12px"
      fontWeight="600"
      cursor="pointer"
      borderBottom="2px"
      borderBottomColor="transparent"
      _focus={{ boxShadow: 'none', outline: 'none' }}
      _selected={{
        borderBottomColor: 'primary',
        '&>p': {
          color: `${primaryColor} !important`,
        },
      }}
      {...rest}
    >
      {children}
    </Tab>
  );
}

export default CustomTab;
