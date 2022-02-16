import { Flex, FlexProps, Text } from '@chakra-ui/react';

type Props = FlexProps & {
  data: {
    name: string;
    num: number;
  }[];
};

function PluginNum({ data, ...rest }: Props) {
  return (
    <Flex alignItems="center" {...rest}>
      {data.map((item) => (
        <Flex key={item.name} alignItems="center" marginRight="5px">
          <Text color="gray.700" fontSize="12px" fontWeight="500">
            {item.name}
          </Text>
          <Text
            marginLeft="2px"
            color="gray.500"
            fontSize="12px"
            fontWeight="500"
          >
            {item.num}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default PluginNum;
