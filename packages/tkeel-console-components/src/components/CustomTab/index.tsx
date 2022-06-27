import { Box, TabProps, useMultiStyleConfig, useTab } from '@chakra-ui/react';
import { forwardRef, ReactNode, Ref } from 'react';

interface Props extends TabProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTab = forwardRef((props: Props, ref: Ref<any>) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const styles = useMultiStyleConfig('Tabs', tabProps);

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
});

export default CustomTab;
