import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';

type Props = BoxProps & {
  title?: string;
  data: {
    label: string;
    value: string;
  }[];
};

const defaultProps = {
  title: '基本信息',
};

function InfoCard({ title, data, ...rest }: Props) {
  return (
    <Box {...rest}>
      <Text color="gray.800" fontSize="14px" lineHeight="20px" fontWeight="600">
        {title}
      </Text>
      <Box marginTop="12px" padding="8px 24px 16px" backgroundColor="gray.50">
        {data.map((info) => (
          <Flex key={info.label} marginTop="8px" lineHeight="24px">
            <Text width="72px" color="grayAlternatives.300" fontSize="12px">
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

InfoCard.defaultProps = defaultProps;

export default InfoCard;
