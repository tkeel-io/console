import { Box, BoxProps, TabProps, useStyles, useTab } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = BoxProps &
  TabProps & {
    children: ReactNode;
  };

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="96px"
      height="100%"
      color="white"
      fontSize="12px"
      fontWeight="600"
      border="none"
      cursor="pointer"
      _hover={{ backgroundColor: isSelected ? 'primary' : 'gray.600' }}
      _focus={{ boxShadow: 'none', outline: 'none' }}
      _selected={{ backgroundColor: 'primary' }}
      __css={styles.tab}
      {...tabProps}
    >
      {tabProps.children}
    </Box>
  );
}

export default CustomTab;
