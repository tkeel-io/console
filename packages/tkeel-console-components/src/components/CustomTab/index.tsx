import { ReactNode } from 'react';
import { Box, BoxProps, useStyles, useTab } from '@chakra-ui/react';

type Props = BoxProps & {
  children: ReactNode;
};

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isFirstTab = tabProps.id === 'tabs-1--tab-0';
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
      borderTopLeftRadius={isFirstTab ? '4px' : '0'}
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
