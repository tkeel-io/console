import {
  Box,
  TabListProps,
  useMultiStyleConfig,
  useTabList,
} from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTabList = forwardRef((props: TabListProps, ref: Ref<any>) => {
  const tabListProps = useTabList({ ...props, ref });
  const styles = useMultiStyleConfig('tabList', tabListProps);

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
});

export default CustomTabList;
