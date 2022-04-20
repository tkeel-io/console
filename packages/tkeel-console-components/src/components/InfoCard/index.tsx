import { Box, BoxProps, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = BoxProps & {
  title?: string;
  data: {
    label: string;
    value: ReactNode;
    isTruncated?: boolean;
  }[];
  styles?: {
    wrapper?: StyleProps;
    content?: StyleProps;
    title?: StyleProps;
    label?: StyleProps;
    value?: StyleProps;
  };
};

const defaultProps = {
  title: '基本信息',
};

function InfoCard({ title, data, styles }: Props) {
  return (
    <Box
      padding="16px 24px 20px"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
      {...styles?.wrapper}
    >
      <Text
        color="gray.800"
        fontSize="14px"
        lineHeight="20px"
        fontWeight="500"
        {...styles?.title}
      >
        {title}
      </Text>
      <Box
        marginTop="4px"
        minH="108px"
        maxH="300px"
        overflowY="auto"
        {...styles?.content}
      >
        {data.map((info) => (
          <Flex key={info.label} marginTop="8px" lineHeight="24px">
            <Text
              width="72px"
              color="gray.500"
              fontSize="12px"
              {...styles?.label}
            >
              {info.label}
            </Text>
            <Box color="gray.800" fontSize="12px">
              {['string', 'number'].includes(typeof info.value) ? (
                <Text
                  maxWidth="240px"
                  isTruncated={!!info.isTruncated}
                  title={String(info.value)}
                  {...styles?.value}
                >
                  {info.value}
                </Text>
              ) : (
                info.value
              )}
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

InfoCard.defaultProps = defaultProps;

export default InfoCard;
