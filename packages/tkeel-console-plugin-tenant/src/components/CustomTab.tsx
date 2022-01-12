import React from 'react';
import { Box, Center, useStyles, useTab } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode | string;
};

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Box
      padding="6px 24px"
      height="40px"
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
      <Center h="100%">{tabProps.children}</Center>
    </Box>
  );
}

export default CustomTab;
