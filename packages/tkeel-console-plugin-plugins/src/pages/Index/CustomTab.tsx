import React from 'react';
import { Badge, Box, Text, useStyles, useTab } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode | string;
};

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Box
      as="button"
      position="relative"
      margin="0"
      padding="0"
      width="50%"
      height="28px"
      border="none"
      borderRadius="22px"
      backgroundColor={isSelected ? 'gray.800' : 'transparent'}
      _focus={{ boxShadow: 'none' }}
      __css={styles.tab}
      {...tabProps}
    >
      <Text
        marginRight="15px"
        color={isSelected ? 'white' : 'gray.800'}
        fontSize="12px"
        fontWeight="600"
      >
        {tabProps.children}
      </Text>
      <Badge
        position="absolute"
        top="4px"
        right="4px"
        padding="0 9px"
        height="20px"
        lineHeight="20px"
        color="white"
        fontSize="12px"
        fontWeight="bold"
        borderRadius="10px"
        backgroundColor={isSelected ? 'tKeel' : 'grayAlternatives.200'}
      >
        12
      </Badge>
    </Box>
  );
}

export default CustomTab;
