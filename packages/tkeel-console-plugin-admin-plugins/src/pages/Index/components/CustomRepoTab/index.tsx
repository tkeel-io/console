import {
  Badge,
  Box,
  TabProps,
  Text,
  useMultiStyleConfig,
  useTab,
} from '@chakra-ui/react';
import { forwardRef, ReactNode, Ref } from 'react';

interface Props extends TabProps {
  children: ReactNode;
  num: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomRepoTab = forwardRef((props: Props, ref: Ref<any>) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const styles = useMultiStyleConfig('Tabs', tabProps);

  const { children, num } = props;
  const backgroundColor = isSelected ? 'gray.800' : 'transparent';

  return (
    <Box
      as="button"
      position="relative"
      margin="0"
      width="max-content"
      padding="0 32px"
      height="28px"
      border="none"
      borderRadius="22px"
      backgroundColor={backgroundColor}
      _focus={{ boxShadow: 'none' }}
      _active={{ backgroundColor }}
      __css={styles.tab}
      {...tabProps}
    >
      <Text
        marginRight="15px"
        color={isSelected ? 'white' : 'grayAlternatives.300'}
        fontSize="12px"
        fontWeight={isSelected ? '500' : 'normal'}
      >
        {children}
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
        backgroundColor={isSelected ? 'primary' : 'grayAlternatives.200'}
      >
        {num}
      </Badge>
    </Box>
  );
});

export default CustomRepoTab;
