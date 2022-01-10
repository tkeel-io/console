import React from 'react';
import { Box, useStyles, useTab } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode | string;
};

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Box
      marginRight="12px"
      width="96px"
      height="32px"
      textAlign="center"
      color="white"
      fontSize="12px"
      fontWeight="600"
      border="none"
      borderRadius="4px"
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
