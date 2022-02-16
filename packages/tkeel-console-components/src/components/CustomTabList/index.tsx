import { Box, BoxProps, useStyles, useTabList } from '@chakra-ui/react';

function CustomTabList(props: BoxProps) {
  const styles = useStyles();
  const tabListProps = useTabList(props);

  return (
    <Box
      display="flex"
      height="40px"
      border="none"
      borderTopLeftRadius="4px"
      borderTopRightRadius="4px"
      backgroundColor="gray.700"
      __css={styles.tabList}
      {...tabListProps}
    >
      {tabListProps.children}
    </Box>
  );
}

export default CustomTabList;
