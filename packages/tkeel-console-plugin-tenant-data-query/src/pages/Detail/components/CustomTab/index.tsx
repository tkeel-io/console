import { BoxProps, Tab, TabProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = BoxProps &
  TabProps & {
    children: ReactNode;
  };

function CustomTab({ children, ...rest }: Props) {
  return (
    <Tab
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="96px"
      height="100%"
      fontSize="12px"
      fontWeight="600"
      cursor="pointer"
      borderBottom="1px"
      borderBottomColor="transparent"
      _focus={{ boxShadow: 'none', outline: 'none' }}
      _selected={{ borderBottomColor: 'primary' }}
      {...rest}
    >
      {children}
    </Tab>
  );
}

export default CustomTab;
