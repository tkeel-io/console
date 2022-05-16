import { BoxProps, Tab, TabProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = BoxProps &
  TabProps & {
    children: ReactNode;
  };

function CustomTab({ children, ...rest }: Props) {
  return (
    <Tab
      marginRight="24px"
      width="max-content"
      height="100%"
      padding="0"
      fontSize="12px"
      fontWeight="400"
      cursor="pointer"
      borderBottom="2px"
      borderBottomColor="transparent"
      _focus={{ boxShadow: 'none', outline: 'none' }}
      _selected={{ borderBottomColor: 'primary', fontWeight: '600' }}
      {...rest}
    >
      {children}
    </Tab>
  );
}

export default CustomTab;
