/* eslint-disable no-console */
import { Button, Flex, HStack, Text } from '@chakra-ui/react';

interface Props {
  groupInfo: {
    name: string;
    description: string;
    ext: { [propsName: string]: string };
  };
}

function renderInfoItem(item: { key: string; value: string }) {
  const { key, value } = item;
  return (
    <HStack fontSize="12px" lineHeight="24px" fontWeight="500" minWidth="160px">
      <Text color="grayAlternatives.300">{key}:</Text>
      <Text color="gray.600">{value}</Text>
    </HStack>
  );
}
function GroupBasicInfo({ groupInfo }: Props): JSX.Element {
  const { name, description, ext } = groupInfo;
  const groupInfoArray = [
    { key: '设备组名称', value: name },
    { key: '描述信息', value: description },
    ...Object.entries(ext).map(([key, value]) => {
      console.log(value, key);
      return { key, value };
    }),
  ];
  console.log(groupInfoArray);
  return (
    <Flex
      bg="gray.100"
      p="12px"
      borderRadius="4px"
      borderColor="gray.200"
      borderWidth="1px"
      mb="12px"
    >
      <Flex flex="1" justify="space-around" flexWrap="wrap">
        {[...groupInfoArray].map((item) => renderInfoItem(item))}
      </Flex>
      <Button variant="link" colorScheme="primary" fontSize="12px">
        展开
      </Button>
    </Flex>
  );
}
export default GroupBasicInfo;
