import { Flex, Switch, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isRangeSearch: boolean;
  setIsRangeSearch: Dispatch<SetStateAction<boolean>>;
};

export default function RangeSearchButton({
  isRangeSearch,
  setIsRangeSearch,
}: Props) {
  return (
    <Flex alignItems="center">
      <Switch
        size="sm"
        isChecked={isRangeSearch}
        colorScheme="brand"
        __css={{ 'span:focus': { boxShadow: 'none !important' } }}
        onChange={(e) => {
          setIsRangeSearch(e.target.checked);
        }}
      />
      <Text marginLeft="4px" color="gray.700" fontSize="12px" lineHeight="24px">
        分段查询
      </Text>
    </Flex>
  );
}
