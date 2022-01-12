import { Box, Flex, Text } from '@chakra-ui/react';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
};

function InfoCard({ data }: Props) {
  return (
    <Box padding="16px 24px 20px">
      <Text color="gray.800" fontSize="14px" lineHeight="20px" fontWeight="600">
        基本信息
      </Text>
      <Box marginTop="4px">
        {data.map((info) => (
          <Flex key={info.label} marginTop="8px" lineHeight="24px">
            <Text width="72px" color="gray.500" fontSize="12px">
              {info.label}
            </Text>
            <Text
              color="gray.800"
              fontSize="12px"
              maxWidth="240px"
              isTruncated
              title={info.value}
            >
              {info.value}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default InfoCard;
