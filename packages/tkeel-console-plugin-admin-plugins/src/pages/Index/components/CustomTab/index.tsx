import { Badge, Box, Text, useStyles, useTab } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  num: number;
};

function CustomTab(props: Props) {
  const styles = useStyles();
  const tabProps = useTab(props);
  const isSelected = !!tabProps['aria-selected'];

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
}

export default CustomTab;
